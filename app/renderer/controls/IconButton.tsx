import React from 'react';
import Color from 'color';
import styled, { css } from 'styled-components';

type IconAnchorProps = {
  height?: string;
  width?: string;
  iconSize?: string;
  backgroundColor?: string;
  foregroundColor?: string;
  hoverBackgroundColor?: string;
  onlyShowBackgroundOnHover?: boolean;
  scaleOnHover?: boolean;
  hoverForegroundColor?: string;
  activeBackgroundColor?: string;
  activeForegroundColor?: string;
  roundCorners?: boolean;
};
const IconAnchor = styled.a<IconAnchorProps>`
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: ${(p) => (p.height ? p.height : p.iconSize)};
  width: ${(p) => (p.width ? p.width : p.iconSize)};
  ${(p) =>
    p.roundCorners &&
    css`
      border-radius: calc(${p.iconSize} * 0.3);
    `}
  ${(p) =>
    !p.onlyShowBackgroundOnHover &&
    css`
      background: ${p.backgroundColor};
    `}
  path {
    /* TODO fix important */
    fill: ${(p) => p.foregroundColor} !important;
  }
  &:hover {
    background: ${(p) => p.hoverBackgroundColor};
  }

  ${(p) =>
    p.scaleOnHover &&
    css`
      &:hover {
        transform: scale(1.1);
      }
      &:active {
        transform: scale(1);
      }
    `}

  &:hover path {
    fill: ${(p) => p.hoverForegroundColor} !important;
  }
  &:active {
    background: ${(p) => p.activeBackgroundColor};
  }
  &:active path {
    fill: ${(p) => p.activeForegroundColor} !important;
  }
`;

type IconButtonProps = {
  height?: string;
  width?: string;
  iconSize?: string;
  foregroundColor?: string;
  backgroundColor?: string;
  colorAdjustment?: number;
  scaleOnHover?: boolean;
  onlyShowBackgroundOnHover?: boolean;
  roundCorners?: boolean;
  onClick?: () => void;
  children: React.ReactElement;
};

const IconButton = React.forwardRef<
  HTMLAnchorElement,
  IconButtonProps
>(
  (
    {
      height,
      width,
      iconSize,
      foregroundColor,
      backgroundColor,
      colorAdjustment,
      scaleOnHover,
      onlyShowBackgroundOnHover,
      roundCorners,
      onClick = () => {},
      children,
    },
    ref
  ) => {
    const hoverForegroundColor =
      Color(foregroundColor).lighten(colorAdjustment);
    const hoverBackgroundColor =
      Color(backgroundColor).lighten(colorAdjustment);
    const activeForegroundColor =
      Color(foregroundColor).darken(colorAdjustment);
    const activeBackgroundColor =
      Color(backgroundColor).darken(colorAdjustment);

    return (
      <IconAnchor
        height={height}
        width={width}
        iconSize={iconSize}
        onClick={onClick}
        foregroundColor={foregroundColor}
        hoverForegroundColor={hoverForegroundColor}
        backgroundColor={backgroundColor}
        hoverBackgroundColor={hoverBackgroundColor}
        activeForegroundColor={activeForegroundColor}
        activeBackgroundColor={activeBackgroundColor}
        scaleOnHover={scaleOnHover}
        roundCorners={roundCorners}
        onlyShowBackgroundOnHover={onlyShowBackgroundOnHover}
        ref={ref}
      >
        {React.cloneElement(children, {
          size: iconSize,
        })}
      </IconAnchor>
    );
  }
);

IconButton.defaultProps = {
  ref: undefined,
  height: undefined,
  width: undefined,
  iconSize: '40px',
  foregroundColor: '#a7a7a7',
  backgroundColor: 'transparent',
  colorAdjustment: 0.2,
  scaleOnHover: false,
  onlyShowBackgroundOnHover: false,
  roundCorners: true,
  onClick: () => {
    console.log('Icon Button clicked!');
  },
};

export default IconButton;
