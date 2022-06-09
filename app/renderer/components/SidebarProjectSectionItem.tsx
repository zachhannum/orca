import { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Color from 'color';
import { updateSectionName } from '../utils/projectUtils';

const StyledItem = styled.div`
  cursor: ${(p) => (p.contentEditable ? 'text' : 'pointer')};
  color: ${(p) => p.theme.sidebarFgText};
  font-size: 0.9em;
  width: 95%;
  box-sizing: border-box;
  padding: 3px 6px;
  border-radius: 5px;
  &:hover {
    background-color: ${(p) =>
      p.contentEditable
        ? Color(p.theme.sidebarBg).alpha(1).darken(0.6).hsl().string()
        : Color(p.theme.sidebarBg).alpha(1).lighten(0.8).hsl().string()};
  }
  ${(p) =>
    p.contentEditable &&
    css`
      background-color: ${(p) => Color(p.theme.sidebarBg).alpha(1).darken(0.6).hsl().string()};
      :focus {
        outline: none;
      }
    `}
  transition: background-color 100ms ease-in-out;
`;

type SidebarProjectSectionItemProps = {
  value: string;
  addingNew: boolean;
};

const SidebarProjectSectionItem = ({
  value,
  addingNew,
}: SidebarProjectSectionItemProps) => {
  const [isEditable, setIsEditable] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (addingNew) {
      setIsEditable(true);
      itemRef.current?.scrollTo({ behavior: 'smooth' });
      setTimeout(() => {
        itemRef.current?.focus();
      });
    }
  }, []);
  const handleDoubleClick = () => {
    setIsEditable(true);
    setTimeout(() => {
      itemRef.current?.focus();
    }, 10);
  };
  const handleBlur = () => {
    setIsEditable(false);

    const newValue = itemRef.current?.innerText;
    if (newValue) updateSectionName(value, newValue);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code === 'Enter') {
      event.preventDefault();
      handleBlur();
    } else if (event.code === 'Escape') {
      event.preventDefault();
      if (itemRef.current) itemRef.current.innerText = value;
      setIsEditable(false);
    }
  };
  return (
    <StyledItem
      ref={itemRef}
      contentEditable={isEditable}
      suppressContentEditableWarning
      onDoubleClick={handleDoubleClick}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      {value}
    </StyledItem>
  );
};

export default SidebarProjectSectionItem;
