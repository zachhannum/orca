import { useState, useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import Color from 'color';
import {
  SectionDeleteIcon,
  SectionDuplicateIcon,
  SectionRenameIcon,
  SectionOpenIcon,
} from 'renderer/icons';
import {
  Section,
  SectionContextMenuEvent,
  SectionContextMenuClosedEvent,
  SectionContextMenuEventData,
  SectionType,
  SectionIdentifier,
} from 'types/types';
import useStore from '../store/useStore';
import {
  findItemDeep,
  removeItem,
  duplicateSection,
} from './TreeView/utilities';
import { ContextMenu, ContextMenuItem } from '.';
import type { Position } from './ContextMenu';

const SectionContextMenu = () => {
  const [id, setId] = useState<SectionIdentifier>({ id: '', name: '' });
  const [isFolder, setIsFolder] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [renameSelected, setRenameSelected] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const theme = useTheme();
  useEffect(() => {
    const handleSectionContextMenu = (e: CustomEventInit) => {
      const { id, name, x, y } = e.detail as SectionContextMenuEventData;
      setPosition({ x, y });
      setShowMenu(true);
      setId({ id, name });
      const { content } = useStore.getState();
      const item = findItemDeep(content, id) as Section;
      setIsFolder(item.type === SectionType.folder);
    };

    document.addEventListener(
      SectionContextMenuEvent,
      handleSectionContextMenu
    );

    return () => {
      document.removeEventListener(
        SectionContextMenuEvent,
        handleSectionContextMenu
      );
    };
  }, [showMenu, setShowMenu]);

  useEffect(() => {
    if (!showMenu && id.id !== '') {
      const contextClosedEvent = new CustomEvent(
        SectionContextMenuClosedEvent,
        {
          detail: { id: id.id, name: id.name, rename: renameSelected },
        }
      );
      document.dispatchEvent(contextClosedEvent);
      setRenameSelected(false);
    }
  }, [showMenu, id, renameSelected]);

  /* Menu Item handlers */
  const handleOpen = () => {
    const { setActiveSectionId } = useStore.getState();
    setActiveSectionId(id);
    setShowMenu(false);
  };

  const handleDuplicate = () => {
    const { content, setContentArray, setAddingSections } = useStore.getState();
    setAddingSections(true);
    setContentArray(duplicateSection(id.id, content));
    setTimeout(() => {
      setAddingSections(false);
    }, 10);
    setShowMenu(false);
  };

  const handleRename = () => {
    setRenameSelected(true);
    setShowMenu(false);
  };

  const handleDelete = () => {
    const { content, setContentArray, activeSectionId, setActiveSectionId } =
      useStore.getState();
    setContentArray(removeItem(content, id.id));
    if (id.id === activeSectionId) {
      setActiveSectionId({ id: '', name: '' });
    }
    setShowMenu(false);
  };

  const itemIconProps = {
    size: '15px',
    color: theme.mainFgTextSecondary,
  };

  return (
    <ContextMenu
      showMenu={showMenu}
      onCloseMenu={() => {
        setShowMenu(false);
      }}
      position={position}
    >
      {!isFolder && (
        <ContextMenuItem onClick={handleOpen}>
          <SectionOpenIcon {...itemIconProps} />
          <span>Open in Editor</span>
        </ContextMenuItem>
      )}
      <ContextMenuItem onClick={handleRename}>
        <SectionRenameIcon {...itemIconProps} />
        Rename
      </ContextMenuItem>
      <ContextMenuItem onClick={handleDuplicate}>
        <SectionDuplicateIcon {...itemIconProps} />
        Duplicate
      </ContextMenuItem>
      <ContextMenuItem onClick={handleDelete}>
        <SectionDeleteIcon {...itemIconProps} />
        Delete
      </ContextMenuItem>
    </ContextMenu>
  );
};

export default SectionContextMenu;
