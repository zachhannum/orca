import styled from 'styled-components';
import useStore from '../store/useStore';

type StyledPaneProps = {
  previewEnabled: boolean;
};

const StyledPane = styled.div<StyledPaneProps>`
  height: 100%;
  width: 600px;
  margin-right: ${(p) => (p.previewEnabled ? '0px' : '-600px')};
  background-color: ${(p) => p.theme.previewBg};
  transition: margin-right 300ms ease-in-out;
`;

const PreviewPane = () => {
  const previewEnabled = useStore((state) => state.previewEnabled);
  return <StyledPane previewEnabled={previewEnabled} />;
};

export default PreviewPane;
