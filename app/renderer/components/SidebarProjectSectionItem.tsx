import { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { updateSectionName } from '../utils/project';

const StyledItem = styled.div`
  cursor: pointer;
  color: ${(p) => p.theme.sidebarFgText};
  padding: 3px 6px;
  ${(p) =>
    p.contentEditable &&
    css`
      background-color: ${p.theme.mainBg};
      border-radius: 5px;
      :focus {
        outline: none;
      }
    `}
`;

type SidebarProjectSectionItemProps = {
  value: string;
};

const SidebarProjectSectionItem = ({
  value,
}: SidebarProjectSectionItemProps) => {
  const [isEditable, setIsEditable] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
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
