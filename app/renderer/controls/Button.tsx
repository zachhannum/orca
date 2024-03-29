import styled, { useTheme, css } from 'styled-components';
import Color from 'color';
import { BounceLoader } from 'react-spinners';

type StyledButtonProps = {
  color: string;
  isLoading?: boolean;
  isDisabled?: boolean;
};

const StyledButton = styled.button<StyledButtonProps>`
  font-family: inherit;
  height: 30px;
  position: relative;
  line-height: 30px;
  padding-left: 20px;
  padding-right: 20px;
  user-select: none;
  background-color: ${(p) => p.color};
  color: ${(p) => p.theme.buttonPrimaryText};
  border-radius: 10px;
  border: none;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.9em;
  position: relative;

  &:focus-visible {
    outline: 4px solid ${(p) => Color(p.color).alpha(0.5).toString()};
  }

  ${(p) =>
    !p.isLoading &&
    !p.disabled &&
    css`
      cursor: pointer;
      &:after {
        height: 100%;
        width: 100%;
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        transition: background-color 100ms ease-in-out;
      }

      &:hover:after {
        background-color: rgba(255, 255, 255, 0.2);
      }

      &:active:after {
        background-color: rgba(0, 0, 0, 0.3);
      }

      transition: background-color 100ms ease-in-out;
    `}
`;

type StyledLoaderProps = {
  isLoading: boolean;
  isDisabled: boolean;
};
const StyledLoader = styled.div<StyledLoaderProps>`
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
  opacity: 0;
  ${(p) =>
    (p.isLoading || p.isDisabled) &&
    css`
      opacity: 1;
    `}
  transition: opacity 100ms ease-in-out;
`;

type ButtonProps = {
  color?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  isDisabled?: boolean;
};

const Button = ({
  color = '',
  children,
  onClick,
  loading = false,
  isDisabled = false,
}: ButtonProps) => {
  const theme = useTheme();
  if (color.length === 0) {
    color = theme.buttonPrimaryBg;
  }

  return (
    <StyledButton
      color={color}
      disabled={isDisabled}
      onClick={() => {
        if (!loading && !isDisabled && onClick) {
          onClick();
        }
      }}
      isLoading={loading}
    >
      {children}
      <StyledLoader isLoading={loading} isDisabled={isDisabled}>
        <BounceLoader
          loading={loading}
          size={20}
          color={theme.buttonPrimaryText}
          speedMultiplier={2}
        />
      </StyledLoader>
    </StyledButton>
  );
};

export default Button;
