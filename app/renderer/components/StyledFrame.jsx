/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import Frame, { FrameContext } from 'react-frame-component';
import { StyleSheetManager } from 'styled-components';

const InjectFrameStyles = (props) => {
  const { document } = useContext(FrameContext);
  return (
    <StyleSheetManager target={document.head}>
      {props.children}
    </StyleSheetManager>
  );
};

const StyledFrame = (props) => {
  const { style, children, ...otherProps } = props;

  return (
    <Frame
      initialContent={
        '<!DOCTYPE html><html><head></head><body><div class="frame-root"></body></html>'
      }
      style={{ display: 'block', overflow: 'hidden', border: 0, ...style }}
      {...otherProps}
    >
      <InjectFrameStyles>{props.children}</InjectFrameStyles>
    </Frame>
  );
};

export default StyledFrame;
