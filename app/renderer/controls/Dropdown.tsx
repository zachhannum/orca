import { useState, useRef, useEffect, useMemo } from 'react';
import Color from 'color';
import styled, { css, useTheme } from 'styled-components';
import { MenuBase, ScrollContainer } from '../components';
import { ArrowDownIcon } from '../icons';

type DropdownProps = {
  options: string[];
  onChange: (value: string) => void;
  value: string | undefined;
};

const MenuStyle = css`
  background-color: ${(p) => p.theme.dropdownBg.default};
  padding: 5px;
  max-height: 150px;
  justify-content: center;
  border-radius: 10px;
  align-items: stretch;
  white-space: nowrap;
`;

const DropdownRoot = styled.div`
  position: relative;
  font-size: 0.9em;
`;

const MenuItem = styled.div`
  cursor: pointer;
  text-align: center;
  user-select: none;
  padding: 5px 30px;
  border-radius: 5px;
  &:hover {
    background-color: ${(p) =>
      Color(p.theme.dropdownBg.default).lighten(0.2).hsl().toString()};
  }
  &:active {
    background-color: ${(p) =>
      Color(p.theme.dropdownBg.default).darken(0.2).hsl().toString()};
  }

  transition: background-color 100ms ease-in-out;
`;

type ArrowIconProps = {
  open?: boolean;
};
const ArrowIcon = styled(ArrowDownIcon)<ArrowIconProps>`
  ${(p) =>
    p.open &&
    css`
      transform: rotate(180deg);
    `}
  transition: transform 200ms ease-in-out;
`;

const DropdownBase = styled.div`
  height: 30px;
  padding: 0px 5px;
  text-align: center;
  border-radius: 10px;
  background-color: ${(p) => p.theme.dropdownBg.default};
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  cursor: pointer;
  position: relative;
  text-align: center;
`;

const DropdownSelectedText = styled.div`
  text-align: center;
  width: 100%;
`;

const Dropdown = ({ options, onChange, value }: DropdownProps) => {
  const baseRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const onMenuResize = (_height: number, width: number) => {
    if (baseRef.current) {
      baseRef.current.style.width = `${width}px`;
    }
  };

  useEffect(() => {
    if (value) {
      setSelected(value);
    }
  }, [value]);

  const theme = useTheme();

  const getMenuPosition = () => {
    const x = 0;
    let y = 0;
    if (baseRef.current) {
      const rect = baseRef.current.getBoundingClientRect();
      y = rect.height / 2;
    }
    return { x, y };
  };

  const getMenuOffset = () => {
    const x = 0;
    let y = 0;
    if (baseRef.current) {
      const rect = baseRef.current.getBoundingClientRect();
      y = rect.height / 2 + 5;
    }
    return { x, y };
  };

  return (
    <DropdownRoot>
      <DropdownBase onClick={toggleOpen} ref={baseRef}>
        <DropdownSelectedText>{selected}</DropdownSelectedText>
        <ArrowIcon open={open} size="15px" color={theme.dropdownArrow} />
      </DropdownBase>
      <MenuBase
        showMenu={open}
        position={getMenuPosition()}
        offset={getMenuOffset()}
        onCloseMenu={() => {
          setOpen(false);
        }}
        styleMixin={MenuStyle}
        clickRef={baseRef}
        onResize={onMenuResize}
        horizontalAnimateScale={1}
      >
        <ScrollContainer>
          {options.map((option) => (
            <MenuItem
              key={option}
              onClick={() => {
                if (onChange) {
                  onChange(option);
                }
                setOpen(false);
              }}
            >
              {option}
            </MenuItem>
          ))}
        </ScrollContainer>
      </MenuBase>
    </DropdownRoot>
  );
};

export default Dropdown;
