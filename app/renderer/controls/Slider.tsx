import styled from 'styled-components';
import { ContextMenu } from 'renderer/components';
import { useEffect, useRef, useState } from 'react';
import { useIsHovering } from 'renderer/hooks';

const StyledSlider = styled.input`
  -webkit-appearance: none;
  height: 5px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.2);
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 12px;
    background: ${(p) => p.theme.buttonPrimaryText};
    cursor: pointer;
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.2);

    &:hover {
      height: 18px;
      width: 18px;
    }

    &:active {
      height: 16px;
      width: 16px;
    }
    transition-property: height, width, border-width;
    transition-timing-function: ease-in-out;
    transition-duration: 100ms;
  }
`;

type SliderProps = {
  defaultValue: number;
  min: number;
  max: number;
  step?: number;
  onChange?: (value: number) => void;
};

const SliderText = styled.span`
  font-size: 11pt;
`;

export const Slider = ({
  defaultValue,
  min,
  max,
  step = 1,
  onChange = undefined,
}: SliderProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const sliderRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(defaultValue);
  const isHovering = useIsHovering(sliderRef);

  useEffect(() => {
    if (isHovering) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }, [isHovering]);

  return (
    <>
      <StyledSlider
        type="range"
        step={step}
        min={min}
        max={max}
        ref={sliderRef}
        defaultValue={defaultValue}
        onChange={(e) => {
          setValue(parseInt(e.target.value, 10));
          if (onChange) {
            onChange(parseInt(e.target.value, 10));
          }
        }}
      />
      <ContextMenu
        center
        showMenu={showMenu}
        onCloseMenu={() => {}}
        // set position to center of the slider
        position={{
          x: sliderRef.current
            ? sliderRef.current?.offsetLeft + sliderRef.current?.clientWidth / 2
            : 0,
          y: sliderRef.current
            ? sliderRef.current?.offsetTop + sliderRef.current?.clientHeight + 3
            : 0,
        }}
      >
        <SliderText>{value}</SliderText>
      </ContextMenu>
    </>
  );
};
