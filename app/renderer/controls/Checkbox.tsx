import styled, { useTheme, css } from 'styled-components';
import Color from 'color';
import { useToggle } from '../hooks';
import { CheckIcon } from '../icons';

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p) => p.theme.checkFg};
  gap: 8px;
  user-select: none;
  cursor: pointer;
`;

const StyledInputCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

type StyledCheckboxProps = {
  checked: boolean;
};

const StyledCheckbox = styled.div<StyledCheckboxProps>`
  height: 20px;
  width: 20px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => p.theme.checkUnselectedBg};
  color: ${(p) => p.theme.checkFg};
  &:hover {
    background-color: ${(p) =>
      Color(p.theme.checkUnselectedBg).lighten(0.1).hsl().toString()};
  }
  &:active {
    background-color: ${(p) =>
      Color(p.theme.checkUnselectedBg).darken(0.1).hsl().toString()};
  }
  ${(p) =>
    p.checked &&
    css`
      background-color: ${p.theme.checkSelectedBg};
      &:hover {
        background-color: ${(p) =>
          Color(p.theme.checkSelectedBg).lighten(0.05).hsl().toString()};
      }
      &:active {
        background-color: ${(p) =>
          Color(p.theme.checkSelectedBg).darken(0.05).hsl().toString()};
      }
    `}

  transition: background-color 100ms ease-in-out;
`;

const StyledCheck = styled.div<StyledCheckboxProps>`
  opacity: 0;
  ${(p) =>
    p.checked &&
    css`
      opacity: 1;
    `}
  transition: opacity 100ms ease-in-out;
`;

type CheckboxProps = {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const Checkbox = ({
  label = '',
  checked,
  onChange,
  ...props
}: CheckboxProps) => {
  const theme = useTheme();
  return (
    <StyledLabel>
      <StyledCheckbox checked={checked}>
        <StyledInputCheckbox
          {...props}
          onChange={(e) => {
            onChange(e.target.checked);
          }}
        />
        <StyledCheck checked={checked}>
          <CheckIcon size={'14px'} color={theme.checkFg} />
        </StyledCheck>
      </StyledCheckbox>
      <span>{label}</span>
    </StyledLabel>
  );
};

export default Checkbox;
