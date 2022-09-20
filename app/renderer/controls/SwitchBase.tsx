import { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useToggle, useIsMount } from '../hooks';

type SwitchBaseProps = {
  horizontalPadding: number;
  thumbHeight: number;
  thumbWidth: number;
  thumbBorderRadius: number;
  thumbCheckedColor: string;
  thumbUncheckedColor: string;
  baseHeight: number;
  baseWidth: number;
  baseBorderRadius: number;
  baseCheckedColor: string;
  baseUncheckedColor: string;
  defaultValue: boolean | undefined;
  onChange?: (value: boolean) => void;
  disabled: boolean;
  value: boolean | undefined;
};

type StyledBaseProps = {
  value: boolean;
  disabled: boolean;
  checkedColor: string;
  uncheckedColor: string;
  height: number;
  width: number;
  borderRadius: number;
};

const StyledBase = styled.div<StyledBaseProps>`
  cursor: ${(p) => (p.disabled ? 'auto' : 'pointer')};
  height: ${(p) => `${p.height}px`};
  width: ${(p) => `${p.width}px`};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${(p) => (p.value ? p.checkedColor : p.uncheckedColor)};
  border-radius: ${(p) => `${p.borderRadius}px`};
  overflow: hidden;
  user-select: none;
  transition: all 100ms ease-in-out;
  opacity: ${(p) => (p.disabled ? '0.5' : '1')};
`;

type StyledThumbProps = {
  value: boolean;
  animate: boolean;
  checkedColor: string;
  uncheckedColor: string;
  height: number;
  width: number;
  borderRadius: number;
  baseWidth: number;
  baseHeight: number;
  horizontalPadding: number;
};

const animateThumb = (width: number) => keyframes`
  0% {
    width: ${`${width}px`};
  }
  50% {
    width: ${`${width * 2}px`};
  }
  100% {
    width: ${`${width}px`};
  }
`;

const StyledThumb = styled.div<StyledThumbProps>`
  height: ${(p) => `${p.height}px`};
  width: ${(p) => `${p.width}px`};
  border-radius: ${(p) => `${p.borderRadius}px`};
  ${(p) =>
    p.animate &&
    css`
      animation: ${animateThumb(p.width)} 200ms ease-in-out;
    `}

  margin-left: ${(p) =>
    p.value
      ? `${p.baseWidth - p.width - p.horizontalPadding}px`
      : `${p.horizontalPadding}px`};
  background-color: ${(p) => (p.value ? p.checkedColor : p.uncheckedColor)};
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
  user-select: none;
  transition: all 200ms ease-in-out;
`;

const SwitchBase = ({
  horizontalPadding,
  thumbHeight,
  thumbWidth,
  thumbBorderRadius,
  thumbCheckedColor,
  thumbUncheckedColor,
  baseHeight,
  baseWidth,
  baseBorderRadius,
  baseCheckedColor,
  baseUncheckedColor,
  defaultValue,
  onChange,
  disabled,
  value,
}: SwitchBaseProps) => {
  const [enabled, toggleValue] = useToggle(defaultValue);
  const [animate, setAnimate] = useState(true);
  const isMount = useIsMount();
  useEffect(() => {
    if (!isMount && !disabled) {
      setAnimate(true);
      if (onChange) onChange(enabled);
      setTimeout(() => {
        setAnimate(false);
      }, 300);
    }
  }, [enabled, onChange, isMount, disabled]);

  useEffect(() => {
    if (value !== undefined) {
      if (value !== enabled) {
        toggleValue();
      }
    }
  }, [value]);

  const handleToggleClicked = () => {
    if (!disabled) toggleValue();
  };

  return (
    <StyledBase
      height={baseHeight}
      width={baseWidth}
      checkedColor={baseCheckedColor}
      uncheckedColor={baseUncheckedColor}
      borderRadius={baseBorderRadius}
      value={enabled}
      disabled={disabled}
      onClick={handleToggleClicked}
    >
      <StyledThumb
        height={thumbHeight}
        width={thumbWidth}
        checkedColor={thumbCheckedColor}
        uncheckedColor={thumbUncheckedColor}
        borderRadius={thumbBorderRadius}
        animate={animate}
        value={enabled}
        baseHeight={baseHeight}
        baseWidth={baseWidth}
        horizontalPadding={horizontalPadding}
      />
    </StyledBase>
  );
};

export default SwitchBase;
