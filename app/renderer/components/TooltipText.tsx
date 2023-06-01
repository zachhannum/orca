import styled from 'styled-components';

const TooltipText = styled.span`
  padding: 3px;
  font-size: 0.9em;
  font-weight: 500;
  color: ${(p) => p.theme.mainFgTextSecondary};
  white-space: nowrap;
  user-select: none;
`;

export default TooltipText;
