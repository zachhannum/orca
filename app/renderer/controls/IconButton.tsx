import React from 'react';
import Color from 'color';
import styled, { css } from 'styled-components';
import type { CssMixinType } from 'types/types';

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
  styleMixin?: CssMixinType;
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

  ${(p) => p.styleMixin}
  transition: background 0.1s ease-in-out, fill 0.1s ease-in-out;
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
  onClick?: (e: React.MouseEvent) => void;
  cssMixin?: CssMixinType;
  children: React.ReactElement;
};

export const IconButton = React.forwardRef<HTMLAnchorElement, IconButtonProps>(
  (
    {
      height,
      width,
      iconSize,
      foregroundColor,
      backgroundColor,
      colorAdjustment = 0.2,
      scaleOnHover,
      onlyShowBackgroundOnHover,
      roundCorners,
      onClick = () => {},
      cssMixin,
      children,
    },
    ref
  ) => {
    const hoverForegroundColor = Color(foregroundColor)
      .lighten(colorAdjustment)
      .hsl()
      .string();
    const hoverBackgroundColor = Color(backgroundColor)
      .lighten(colorAdjustment)
      .hsl()
      .string();
    const activeForegroundColor = Color(foregroundColor)
      .darken(colorAdjustment)
      .hsl()
      .string();
    const activeBackgroundColor = Color(backgroundColor)
      .darken(colorAdjustment)
      .hsl()
      .string();

    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onClick(e);
    };

    return (
      <IconAnchor
        height={height}
        width={width}
        iconSize={iconSize}
        onClick={handleClick}
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
        styleMixin={cssMixin}
      >
        {React.cloneElement(children, {
          size: iconSize,
        })}
      </IconAnchor>
    );
  }
);

IconButton.defaultProps = {
  height: undefined,
  width: undefined,
  iconSize: '40px',
  foregroundColor: '#a7a7a7',
  backgroundColor: 'transparent',
  colorAdjustment: 0.2,
  scaleOnHover: false,
  onlyShowBackgroundOnHover: false,
  roundCorners: true,
  onClick: () => {},
};
