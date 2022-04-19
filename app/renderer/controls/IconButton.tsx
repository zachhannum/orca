import React from 'react';
import Color from 'color';
import styled from 'styled-components';

type IconButtonProps = {
  size?: string;
  foregroundColor?: string;
  backgroundColor?: string;
  onClick?: () => void;
  children: React.ReactElement;
};

const IconAnchor = styled.a`
  display: block;
  height: ${(props) => props.size};
  width: ${(props) => props.size};
  border-radius: calc(${(props) => props.size} * 0.3);
  background: ${(props) => props.backgroundColor};
  path {
    /* TODO fix important */
    fill: ${(props) => props.foregroundColor} !important;
  }
  &: hover {
    background: ${(props) => props.hoverBackgroundColor};
  }
  &:hover path {
    fill: ${(props) => props.hoverForegroundColor};
  }
  &: active {
    background: ${(props) => props.activeBackgroundColor};
  }
  &:active path {
    fill: ${(props) => props.activeForegroundColor};
  }
`;

const IconButton = ({
  size = '40px',
  foregroundColor,
  backgroundColor,
  onClick = () => {},
  children,
}: IconButtonProps) => {
  const colorAdjust = 0.1;
  const hoverForegroundColor = Color(foregroundColor).lighten(colorAdjust);
  const hoverBackgroundColor = Color(backgroundColor).lighten(colorAdjust);
  const activeForegroundColor = Color(foregroundColor).darken(colorAdjust);
  const activeBackgroundColor = Color(backgroundColor).darken(colorAdjust);

  return (
    <IconAnchor
      onClick={onClick}
      foregroundColor={foregroundColor}
      hoverForegroundColor={hoverForegroundColor}
      backgroundColor={backgroundColor}
      hoverBackgroundColor={hoverBackgroundColor}
      activeForegroundColor={activeForegroundColor}
      activeBackgroundColor={activeBackgroundColor}
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
  backgroundColor: '#3b3b3b',
  onClick: () => {
    console.log('Icon Button clicked!');
  },
};

export default IconButton;
