/* eslint-disable no-useless-return */
/* eslint-disable consistent-return */
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  Announcements,
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverlay,
  DragMoveEvent,
  DragEndEvent,
  DragOverEvent,
  MeasuringStrategy,
  DropAnimation,
  defaultDropAnimation,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import useStore from 'renderer/store/useStore';
import { Sections } from 'types/types';
import {
  buildTree,
  flattenTree,
  getProjection,
  removeItem,
  removeChildrenOf,
  setProperty,
} from './utilities';
import type { FlattenedItem, SensorContext } from './types';
import { SortableTreeItem } from './components';

const measuring = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

const dropAnimation: DropAnimation = {
  ...defaultDropAnimation,
  dragSourceOpacity: 0.5,
};

interface Props {
  items: Sections;
  onItemsSorted: (items: Sections) => void;
  indentationWidth?: number;
  indicator?: boolean;
  removable?: boolean;
}

export function SortableTree({
  items,
  onItemsSorted,
  indicator = true,
  indentationWidth = 20,
  removable,
}: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [currentPosition, setCurrentPosition] = useState<{
    parentId: string | null;
    overId: string;
  } | null>(null);

  const flattenedItems = useMemo(() => {
    const flattenedTree = flattenTree(items);
    const collapsedItems = flattenedTree.reduce<string[]>(
      (acc, { children, collapsed, id }) =>
        collapsed && children.length ? [...acc, id] : acc,
      []
    );

    return removeChildrenOf(
      flattenedTree,
      activeId ? [activeId, ...collapsedItems] : collapsedItems
    );
  }, [activeId, items]);
  const projected =
    activeId && overId
      ? getProjection(
          flattenedItems,
          activeId,
          overId,
          offsetLeft,
          indentationWidth
        )
      : null;
  const sensorContext: SensorContext = useRef({
    items: flattenedItems,
    offset: offsetLeft,
  });
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const sortedIds = useMemo(
    () => flattenedItems.map(({ id }) => id),
    [flattenedItems]
  );
  const activeItem = activeId
    ? flattenedItems.find(({ id }) => id === activeId)
    : null;

  const animateOnCollapseRefCount = useStore(
    (state) => state.animatingCollapseRefCount
  );
  const [animateInFromCollapseStartIdx, setAnimateInFromCollapseStartIdx] =
    useState(-1);
  const [animateInFromCollapseEndIdx, setAnimateInFromCollapseEndIdx] =
    useState(-1);
  useEffect(() => {
    if (animateOnCollapseRefCount === 0) {
      setAnimateInFromCollapseStartIdx(-1);
      setAnimateInFromCollapseEndIdx(-1);
    }
  }, [animateOnCollapseRefCount]);
  const isIndexBetweenStartAndEndAnimationIdx = useCallback(
    (val: number) => {
      return (
        val > animateInFromCollapseStartIdx &&
        val <= animateInFromCollapseEndIdx
      );
    },
    [animateInFromCollapseEndIdx, animateInFromCollapseStartIdx]
  );

  useEffect(() => {
    sensorContext.current = {
      items: flattenedItems,
      offset: offsetLeft,
    };
  }, [flattenedItems, offsetLeft]);

  const announcements: Announcements = {
    onDragStart(id) {
      return `Picked up ${id}.`;
    },
    onDragMove(id, overId) {
      return getMovementAnnouncement('onDragMove', id, overId);
    },
    onDragOver(id, overId) {
      return getMovementAnnouncement('onDragOver', id, overId);
    },
    onDragEnd(id, overId) {
      return getMovementAnnouncement('onDragEnd', id, overId);
    },
    onDragCancel(id) {
      return `Moving was cancelled. ${id} was dropped in its original position.`;
    },
  };

  return (
    <DndContext
      announcements={announcements}
      sensors={sensors}
      collisionDetection={closestCenter}
      measuring={measuring}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
        {flattenedItems.map(
          ({ id, name, canHaveChildren, collapsed, depth }, index) => (
            <SortableTreeItem
              key={id}
              id={id}
              animateIndex={
                isIndexBetweenStartAndEndAnimationIdx(index)
                  ? index - animateInFromCollapseStartIdx
                  : 0
              }
              animateIn={isIndexBetweenStartAndEndAnimationIdx(index)}
              uuid={id}
              value={name}
              depth={id === activeId && projected ? projected.depth : depth}
              indentationWidth={indentationWidth}
              indicator={indicator}
              collapsed={Boolean(collapsed && canHaveChildren)}
              canHaveChildren={canHaveChildren}
              onCollapse={
                canHaveChildren ? () => handleCollapse(id) : undefined
              }
              onRemove={removable ? () => handleRemove(id) : undefined}
            />
          )
        )}
        {createPortal(
          <DragOverlay
            dropAnimation={dropAnimation}
            // modifiers={indicator ? [adjustTranslate] : undefined}
          >
            {activeId && activeItem ? (
              <SortableTreeItem
                id={activeId}
                animateIndex={-1}
                animateIn={false}
                depth={activeItem.depth}
                clone
                uuid={activeId}
                value={activeItem.name}
                indentationWidth={indentationWidth}
                canHaveChildren={activeItem.canHaveChildren}
              />
            ) : null}
          </DragOverlay>,
          document.body
        )}
      </SortableContext>
    </DndContext>
  );

  function handleDragStart({ active: { id: activeId } }: DragStartEvent) {
    setActiveId(activeId);
    setOverId(activeId);

    const activeItem = flattenedItems.find(({ id }) => id === activeId);

    if (activeItem) {
      setCurrentPosition({
        parentId: activeItem.parentId,
        overId: activeId,
      });
    }

    document.body.style.setProperty('cursor', 'grabbing');
  }

  function handleDragMove({ delta }: DragMoveEvent) {
    setOffsetLeft(delta.x);
  }

  function handleDragOver({ over }: DragOverEvent) {
    setOverId(over?.id ?? null);
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    resetState();

    if (projected && over) {
      const { depth, parentId } = projected;
      const clonedItems: FlattenedItem[] = flattenTree(items);
      const overIndex = clonedItems.findIndex(({ id }) => id === over.id);
      const activeIndex = clonedItems.findIndex(({ id }) => id === active.id);
      const activeTreeItem = clonedItems[activeIndex];

      clonedItems[activeIndex] = { ...activeTreeItem, depth, parentId };

      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);
      const newItems = buildTree(sortedItems);

      onItemsSorted(newItems);
    }
  }

  function handleDragCancel() {
    resetState();
  }

  function resetState() {
    setOverId(null);
    setActiveId(null);
    setOffsetLeft(0);
    setCurrentPosition(null);

    document.body.style.setProperty('cursor', '');
  }

  function handleRemove(id: string) {
    onItemsSorted(removeItem(items, id));
  }

  function handleCollapse(id: string) {
    const item = flattenedItems.find((item) => item.id === id);
    if (item?.collapsed) {
      const startIdx = flattenedItems.findIndex((item) => item.id === id);
      const endIdx = startIdx + item.children.length;
      setAnimateInFromCollapseStartIdx(startIdx);
      setAnimateInFromCollapseEndIdx(endIdx);
    } else {
      // fallback in case item is collapsed before animation finishes
      setAnimateInFromCollapseStartIdx(-1);
      setAnimateInFromCollapseEndIdx(-1);
      useStore.getState().resetAnimatingCollapseRefCount();
    }
    onItemsSorted(
      setProperty(items, id, 'collapsed', (value) => {
        return !value;
      })
    );
  }

  function getMovementAnnouncement(
    eventName: string,
    activeId: string,
    overId?: string
  ): any {
    if (overId && projected) {
      if (eventName !== 'onDragEnd') {
        if (
          currentPosition &&
          projected.parentId === currentPosition.parentId &&
          overId === currentPosition.overId
        ) {
          return;
          // eslint-disable-next-line no-else-return
        } else {
          setCurrentPosition({
            parentId: projected.parentId,
            overId,
          });
        }
      }

      const clonedItems: FlattenedItem[] = flattenTree(items);
      const overIndex = clonedItems.findIndex(({ id }) => id === overId);
      const activeIndex = clonedItems.findIndex(({ id }) => id === activeId);
      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);

      const previousItem = sortedItems[overIndex - 1];

      let announcement;
      const movedVerb = eventName === 'onDragEnd' ? 'dropped' : 'moved';
      const nestedVerb = eventName === 'onDragEnd' ? 'dropped' : 'nested';

      if (!previousItem) {
        const nextItem = sortedItems[overIndex + 1];
        announcement = `${activeId} was ${movedVerb} before ${nextItem.id}.`;
      } else {
        // eslint-disable-next-line no-lonely-if
        if (projected.depth > previousItem.depth) {
          announcement = `${activeId} was ${nestedVerb} under ${previousItem.id}.`;
        } else {
          let previousSibling: FlattenedItem | undefined = previousItem;
          while (previousSibling && projected.depth < previousSibling.depth) {
            // eslint-disable-next-line prefer-destructuring
            const parentId: string | null = previousSibling.parentId;
            previousSibling = sortedItems.find(({ id }) => id === parentId);
          }

          if (previousSibling) {
            announcement = `${activeId} was ${movedVerb} after ${previousSibling.id}.`;
          }
        }
      }

      return announcement;
    }

    return;
  }
}
