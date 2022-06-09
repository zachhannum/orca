import styled, { useTheme, css } from 'styled-components';
import Color from 'color';
import { BounceLoader } from 'react-spinners';

type StyledButtonProps = {
  hoverBackgroundcolor?: string;
  activeBackgroundColor?: string;
  loading?: boolean;
};

const StyledButton = styled.span<StyledButtonProps>`
  height: 30px;
  position: relative;
  line-height: 30px;
  padding-left: 10px;
  padding-right: 10px;
  user-select: none;
  background-color: ${(p) => p.theme.buttonPrimaryBg};
  color: ${(p) => p.theme.buttonPrimaryText};
  border-radius: 10px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.9em;

  ${(p) =>
    !p.loading &&
    css`
      cursor: pointer;
      &:hover {
        background-color: ${p.hoverBackgroundcolor};
      }
      &:active {
        background-color: ${p.activeBackgroundColor};
      }
      transition: background-color 100ms ease-in-out;
    `}
`;

const StyledLoader = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 2;
  top: 0;
  left: 0;
  background-color: #00000065;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
`;

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
};

const Button = ({ children, onClick, loading = false }: ButtonProps) => {
  const theme = useTheme();
  const hoverColor = Color(theme.buttonPrimaryBg).lighten(0.05).hsl().string();
  const activeColor = Color(theme.buttonPrimaryBg).darken(0.05).hsl().string();
  return (
    <StyledButton
      hoverBackgroundcolor={hoverColor}
      activeBackgroundColor={activeColor}
      onClick={() => {
        if (!loading && onClick) {
          onClick();
        }
      }}
      loading={loading}
    >
      {children}
      {loading && (
        <StyledLoader>
          <BounceLoader
            loading={loading}
            size={20}
            color={theme.buttonPrimaryText}
            speedMultiplier={1.5}
          />
        </StyledLoader>
      )}
    </StyledButton>
  );
};

export default Button;
