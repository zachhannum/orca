import styled, { useTheme, css } from 'styled-components';
import Color from 'color';

type StyledTextFieldProps = {
  fullWidth: boolean;
};
const StyledTextField = styled.div<StyledTextFieldProps>`
  ${(p) =>
    p.fullWidth &&
    css`
      width: 100%;
    `}
`;

type StyledInputProps = {
  styleVariant: string;
  hoverBackgroundColor: string;
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
  transition: background-color 100ms ease-in-out;
`;

const StyledLabel = styled.span`
  margin-left: 10px;
  color: ${(p) => p.theme.mainFgTextSecondary};
  font-size: 0.9em;
  user-select: none;
`;

type TextFieldProps = {
  name: string;
  styleVariant?: string;
  placeholder?: string;
  label?: string;
  inputRequired?: boolean;
  fullWidth?: boolean;
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
}: TextFieldProps) => {
  const theme = useTheme();
  const hoverBackgroundColor = Color(theme.textInputBg[styleVariant])
    .lighten(0.15)
    .hsl()
    .string();
  return (
    <StyledTextField fullWidth={fullWidth}>
      {label !== undefined && <StyledLabel>{label}</StyledLabel>}
      <StyledInput
        type="text"
        styleVariant={styleVariant}
        placeholder={placeholder}
        hoverBackgroundColor={hoverBackgroundColor}
        name={name}
      />
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
