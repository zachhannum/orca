import { useRef } from 'react';
import styled, { useTheme, css } from 'styled-components';
import { debounce } from 'lodash';
import Color from 'color';

type StyledTextFieldProps = {
  fullWidth: boolean;
};
const StyledTextField = styled.div<StyledTextFieldProps>`
  display: flex;
  flex-direction: column;
  ${(p) =>
    p.fullWidth &&
    css`
      width: 100%;
    `}
`;

type StyledInputProps = {
  styleVariant: string;
  hoverBackgroundColor: string;
  type: 'text' | 'number';
};

const StyledInput = styled.input<StyledInputProps>`
  font-family: 'Poppins', sans-serif;
  color: ${(p) => p.theme.mainFgTextSecondary};
  width: 100%;
  border-width: 0px;
  height: 30px;
  border-radius: 10px;
  background-color: ${(p) => p.theme.textInputBg[p.styleVariant]};
  padding: 10px;
  box-sizing: border-box;
  &:hover {
    background-color: ${(p) => p.hoverBackgroundColor};
  }
  &:focus {
    outline: none;
    background-color: ${(p) => p.hoverBackgroundColor};
  }
  ::placeholder {
    color: ${(p) => p.theme.textInputPlaceholderFg[p.styleVariant]};
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  transition: background-color 100ms ease-in-out;

  ${(p) =>
    p.type === 'number' &&
    css`
      border-radius: 0px;
      text-align: center;
      max-width: 50px;
    `}
`;

const StyledLabel = styled.span`
  padding-bottom: 5px;
  color: ${(p) => p.theme.mainFgTextSecondary};
  font-size: 0.9em;
  user-select: none;
`;

const TextFieldDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

const IncrementButtonCss = (backgroundColor: string) => css`
  cursor: pointer;
  &:focus-visible {
    outline: 4px solid
      ${(p) => Color(p.theme.buttonPrimaryBg).alpha(0.5).toString()};
  }
  border: none;
  background-color: ${Color(backgroundColor).darken(0.1).toString()};
  &:hover {
    background-color: ${Color(backgroundColor).lighten(0.1).toString()};
  }
  width: 30px;
  height: 30px;
  transition: background-color 100ms ease-in-out;
`;

type IncrementButtonProps = {
  backgroundColor: string;
};

const MinusButton = styled.button<IncrementButtonProps>`
  ${(p) => IncrementButtonCss(p.backgroundColor)}
  border-radius: 10px 0px 0px 10px;
  ::after {
    color: ${(p) => p.theme.mainFgText};
    content: '-';
  }
`;

const PlusButton = styled.button<IncrementButtonProps>`
  ${(p) => IncrementButtonCss(p.backgroundColor)}
  border-radius: 0px 10px 10px 0px;
  ::after {
    color: ${(p) => p.theme.mainFgText};
    content: '+';
  }
`;

const onChangeDebounce = debounce(
  (change: string, set: (value: string) => void) => {
    set(change);
  },
  500
);

type TextFieldProps = {
  name: string;
  styleVariant?: string;
  placeholder?: string;
  label?: string;
  inputRequired?: boolean;
  fullWidth?: boolean;
  onChangeCallback?: (value: string) => void;
  type?: 'text' | 'number';
};

const TextField = ({
  name,
  styleVariant = 'default',
  placeholder,
  label,
  // @TODO will be used eventually, see #41
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  inputRequired,
  fullWidth = false,
  onChangeCallback = undefined,
  type = 'text',
  ...props
}: TextFieldProps & React.ComponentPropsWithoutRef<'input'>) => {
  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const hoverBackgroundColor = Color(theme.textInputBg[styleVariant])
    .lighten(0.15)
    .hsl()
    .string();

  const updateValue = () => {
    if (onChangeCallback && inputRef.current) {
      onChangeDebounce(inputRef.current.value, onChangeCallback);
    }
  };

  return (
    <StyledTextField fullWidth={fullWidth}>
      {label !== undefined && <StyledLabel>{label}</StyledLabel>}
      <TextFieldDiv>
        {type === 'number' && (
          <MinusButton
            backgroundColor={theme.textInputBg[styleVariant]}
            onClick={() => {
              inputRef.current?.stepDown();
              updateValue();
            }}
          />
        )}
        <StyledInput
          ref={inputRef}
          type={type}
          styleVariant={styleVariant}
          placeholder={placeholder}
          hoverBackgroundColor={hoverBackgroundColor}
          name={name}
          onChange={() => {
            updateValue();
          }}
          {...props}
        />
        {type === 'number' && (
          <PlusButton
            backgroundColor={theme.textInputBg[styleVariant]}
            onClick={() => {
              inputRef.current?.stepUp();
              if (onChangeCallback && inputRef.current) {
                onChangeDebounce(inputRef.current.value, onChangeCallback);
              }
            }}
          />
        )}
      </TextFieldDiv>
    </StyledTextField>
  );
};

TextField.defaultProps = {
  styleVariant: 'default',
  placeholder: '',
  label: undefined,
  inputRequired: false,
};

export default TextField;
