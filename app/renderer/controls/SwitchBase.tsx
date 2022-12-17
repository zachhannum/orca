import { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { CssMixinType } from 'types/types';
import { useToggle } from '../hooks';

type SwitchBaseProps = {
  horizontalPadding: number;
  thumbHeight: number;
  thumbWidth: number;
  thumbAnimateWidth?: number;
  thumbBorderRadius: number;
  thumbCheckedColor: string;
  thumbUncheckedColor: string;
  baseHeight: number;
  baseWidth: number;
  baseBorderRadius: number;
  baseCheckedColor: string;
  baseUncheckedColor: string;
  onChange?: (value: boolean) => void;
  disabled: boolean;
  value: boolean | undefined;
  baseCssMixin?: CssMixinType;
  thumbCssMixin?: CssMixinType;
};

type StyledBaseProps = {
  value: boolean;
  disabled: boolean;
  checkedColor: string;
  uncheckedColor: string;
  height: number;
  width: number;
  borderRadius: number;
  cssMixin: CssMixinType;
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

  ${(p) => p.cssMixin}
`;

type StyledThumbProps = {
  value: boolean;
  animate: boolean;
  checkedColor: string;
  uncheckedColor: string;
  height: number;
  width: number;
  animateWidth: number;
  borderRadius: number;
  baseWidth: number;
  baseHeight: number;
  horizontalPadding: number;
  cssMixin: CssMixinType;
};

const animateThumb = (width: number, animateWidth: number) => keyframes`
  0% {
    width: ${`${width}px`};
  }
  50% {
    width: ${`${animateWidth}px`};
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
      animation: ${animateThumb(p.width, p.animateWidth)} 200ms ease-in-out;
    `}

  margin-left: ${(p) =>
    p.value
      ? `${p.baseWidth - p.width - p.horizontalPadding}px`
      : `${p.horizontalPadding}px`};
  background-color: ${(p) => (p.value ? p.checkedColor : p.uncheckedColor)};
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
  user-select: none;
  transition: all 200ms ease-in-out;

  ${(p) => p.cssMixin}
`;

const SwitchBase = ({
  horizontalPadding,
  thumbHeight,
  thumbWidth,
  thumbAnimateWidth = thumbWidth * 1.25,
  thumbBorderRadius,
  thumbCheckedColor,
  thumbUncheckedColor,
  baseHeight,
  baseWidth,
  baseBorderRadius,
  baseCheckedColor,
  baseUncheckedColor,
  onChange,
  disabled,
  value,
  baseCssMixin,
  thumbCssMixin,
}: SwitchBaseProps) => {
  const [checked, toggleChecked] = useToggle(value);
  const [animate, setAnimate] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleToggle = (animate: boolean) => {
    if (animate) {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 1000);
    }
    if (onChange) onChange(!checked);
    toggleChecked();
  };

  useEffect(() => {
    if (value !== undefined) {
      if (value !== checked) {
        handleToggle(mounted);
      }
    }
    setMounted(true);
  }, [value]);

  const handleToggleClicked = () => {
    if (!disabled) handleToggle(true);
  };

  return (
    <StyledBase
      height={baseHeight}
      width={baseWidth}
      checkedColor={baseCheckedColor}
      uncheckedColor={baseUncheckedColor}
      borderRadius={baseBorderRadius}
      value={checked}
      disabled={disabled}
      onClick={handleToggleClicked}
      cssMixin={baseCssMixin}
    >
      <StyledThumb
        height={thumbHeight}
        width={thumbWidth}
        animateWidth={thumbAnimateWidth}
        checkedColor={thumbCheckedColor}
        uncheckedColor={thumbUncheckedColor}
        borderRadius={thumbBorderRadius}
        animate={animate}
        value={checked}
        baseHeight={baseHeight}
        baseWidth={baseWidth}
        horizontalPadding={horizontalPadding}
        cssMixin={thumbCssMixin}
      />
    </StyledBase>
  );
};

export default SwitchBase;
