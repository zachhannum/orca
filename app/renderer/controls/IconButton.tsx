import React from 'react';
import Color from 'color';
import styled, { css } from 'styled-components';

type IconButtonProps = {
  size?: string;
  foregroundColor?: string;
  backgroundColor?: string;
  colorAdjustment?: number;
  scaleOnHover?: boolean;
  onClick?: () => void;
  children: React.ReactElement;
};

type IconAnchorProps = {
  size?: string;
  backgroundColor?: string;
  foregroundColor?: string;
  hoverBackgroundColor?: string;
  scaleOnHover?: boolean;
  hoverForegroundColor?: string;
  activeBackgroundColor?: string;
  activeForegroundColor?: string;
};
const IconAnchor = styled.a<IconAnchorProps>`
  display: block;
  cursor: pointer;
  height: ${(props) => props.size};
  width: ${(props) => props.size};
  border-radius: calc(${(props) => props.size} * 0.3);
  background: ${(props) => props.backgroundColor};
  path {
    /* TODO fix important */
    fill: ${(props) => props.foregroundColor} !important;
  }
  &:hover {
    background: ${(props) => props.hoverBackgroundColor};
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
    fill: ${(props) => props.hoverForegroundColor} !important;
  }
  &:active {
    background: ${(props) => props.activeBackgroundColor};
  }
  &:active path {
    fill: ${(props) => props.activeForegroundColor} !important;
  }
`;

const IconButton = ({
  size = '40px',
  foregroundColor,
  backgroundColor,
  colorAdjustment,
  scaleOnHover,
  onClick = () => {},
  children,
}: IconButtonProps) => {
  const hoverForegroundColor = Color(foregroundColor).lighten(colorAdjustment);
  const hoverBackgroundColor = Color(backgroundColor).lighten(colorAdjustment);
  const activeForegroundColor = Color(foregroundColor).darken(colorAdjustment);
  const activeBackgroundColor = Color(backgroundColor).darken(colorAdjustment);

  return (
    <IconAnchor
      onClick={onClick}
      foregroundColor={foregroundColor}
      hoverForegroundColor={hoverForegroundColor}
      backgroundColor={backgroundColor}
      hoverBackgroundColor={hoverBackgroundColor}
      activeForegroundColor={activeForegroundColor}
      activeBackgroundColor={activeBackgroundColor}
      scaleOnHover={scaleOnHover}
      size={size}
    >
      {React.cloneElement(children, {
        size,
      })}
    </IconAnchor>
  );
};

IconButton.defaultProps = {
  size: '40px',
  foregroundColor: '#a7a7a7',
  backgroundColor: 'transparent',
  colorAdjustment: 0.2,
  scaleOnHover: false,
  onClick: () => {
    console.log('Icon Button clicked!');
  },
};

export default IconButton;
