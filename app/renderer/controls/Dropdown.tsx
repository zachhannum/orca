import { useState, useRef } from 'react';
import styled from 'styled-components';
import { ContextMenu } from '../components';

type DropdownProps = {
  options: string[];
  onChange: (value: string) => void;
  value: string | undefined;
};

const DropdownBase = styled.div`
  height: 30px;
  padding: 0px 50px;
  text-align: center;
  border-radius: 10px;
  background-color: ${(p) => p.theme.dropdownBg['default']};
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
`;

const Dropdown = ({ options, onChange, value }: DropdownProps) => {
  const baseRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <DropdownBase onClick={toggleOpen} ref={baseRef}>
      Italics
      <ContextMenu
        showMenu={open}
        position={{
          x: baseRef.current?.getBoundingClientRect().left,
          y: baseRef.current?.getBoundingClientRect().bottom,
        }}
        onCloseMenu={() => {
          setOpen(false);
        }}
      >
        Context
      </ContextMenu>
    </DropdownBase>
  );
};

export default Dropdown;
