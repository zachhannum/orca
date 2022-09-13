import styled from 'styled-components';
import useStore from '../store/useStore';

type StyledDirtyIndicatorProps = {
  show: boolean;
};

const StyledDirtyIndicator = styled.span<StyledDirtyIndicatorProps>`
  flex: none;
  background-color: ${(p) => p.theme.buttonPrimaryBg};
  height: 8px;
  width: 8px;
  border-radius: 4px;
  opacity: ${(p) => (p.show ? '1' : '0')};
  transition: opacity ease-in-out 100ms;
`;

const SaveIndicator = () => {
  const isProjectDirty = useStore((state) => state.isProjectDirty);

  return <StyledDirtyIndicator show={isProjectDirty} />;
};

export default SaveIndicator;
