import styled, { useTheme } from 'styled-components';
import Color from 'color';

type StyledButtonProps = {
  hoverBackgroundcolor?: string;
  activeBackgroundColor?: string;
};

const StyledButton = styled.span<StyledButtonProps>`
  height: 30px;
  padding-left: 30px;
  padding-right: 30px;
  cursor: pointer;
  user-select: none;
  background-color: ${(p) => p.theme.buttonPrimaryBg};
  &:hover {
    background-color: ${(p) => p.hoverBackgroundcolor};
  }
  &:active {
    background-color: ${(p) => p.activeBackgroundColor};
  }
  color: ${(p) => p.theme.buttonPrimaryText};
  border-radius: 10px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  transition: background-color 100ms ease-in-out;
`;

type ButtonProps = {
  label: string;
  onClick: () => void;
};

const Button = ({ label, onClick }: ButtonProps) => {
  const theme = useTheme();
  const hoverColor = Color(theme.buttonPrimaryBg).lighten(0.05);
  const activeColor = Color(theme.buttonPrimaryBg).darken(0.05);
  return (
    <StyledButton
      hoverBackgroundcolor={hoverColor}
      activeBackgroundColor={activeColor}
      onClick={onClick}
    >
      {label}
    </StyledButton>
  );
};

export default Button;
