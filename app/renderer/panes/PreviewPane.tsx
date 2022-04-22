import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Previewer } from 'pagedjs';
import useStore from '../store/useStore';
import Test from '../pagedjs/test';

type StyledPaneProps = {
  previewEnabled: boolean;
};

const StyledPane = styled.div<StyledPaneProps>`
  height: 100%;
  width: 600px;
  margin-right: ${(p) => (p.previewEnabled ? '0px' : '-600px')};
  background-color: ${(p) => p.theme.previewBg};
  transition: margin-right 300ms ease-in-out;
  display: flex;
  align-items: center;
  align-content: center;
`;

const Preview = styled.div`
  .pagedjs_page {
    background-color: #f8f4ef;
    flex: none;
    scroll-snap-align: start;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .pagedjs_pages {
    width: calc(var(--pagedjs-width));
    height: calc(var(--pagedjs-height));
    transform: scale(0.5) translate(-2.125in, 0px) !important;
    transform-origin: center center;
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    justify-content: flex-start;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.2), 0 20px 40px 0 rgba(0, 0, 0, 0.19);
  }
`;

const PreviewPane = () => {
  const [previewRendered, setPreviewRendered] = useState(false);
  useEffect(() => {
    if (!previewRendered) {
      console.log('Rendering preview....');
      const flowText = document.querySelector('#flow');
      const renderTo = document.querySelector('#previewPane');
      const paged = new Previewer();
      paged.preview(flowText, [], renderTo);
      setPreviewRendered(true);
    }
  });

  const previewEnabled = useStore((state) => state.previewEnabled);
  return (
    <StyledPane previewEnabled={previewEnabled}>
      <Test />
      <Preview id="previewPane" />
    </StyledPane>
  );
};

export default PreviewPane;
