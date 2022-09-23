import { useState, useRef, useEffect, Fragment } from 'react';
import Color from 'color';
import styled, { css, useTheme } from 'styled-components';
import { MenuBase, ScrollContainer } from '../components';
import { ArrowDownIcon } from '../icons';

type OptionSection = { name: string; options: string[] };

type DropdownProps = {
  options: string[] | OptionSection[];
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
  box-shadow: 0 0 8px 4px rgba(0, 0, 0, 0.2);
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

const MenuSubHeader = styled.div`
  color: ${(p) => p.theme.dropdownText};
  font-size: 0.8em;
  padding: 10px 10px 0px 10px;
  user-select: none;
`;

const StyledMenuDivider = styled.div`
  height: 2px;
  width: calc(100% - 10px);
  background-color: ${(p) =>
    Color(p.theme.dropdownBg.default).lighten(0.3).hsl().toString()};
  margin: 5px 5px;
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
          {options.map((option) => {
            if (option instanceof Object && 'name' in option) {
              const optionSection = option as OptionSection;
              return (
                <Fragment key={optionSection.name}>
                  <MenuSubHeader>{optionSection.name}</MenuSubHeader>
                  <StyledMenuDivider />
                  {optionSection.options.map((option) => {
                    return (
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
                    );
                  })}
                </Fragment>
              );
            }
            return (
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
            );
          })}
        </ScrollContainer>
      </MenuBase>
    </DropdownRoot>
  );
};

export default Dropdown;
