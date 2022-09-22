import styled from 'styled-components';

export const Setting = styled.div`
  display: flex;
  flex-direction: row;
  color: ${(p) => p.theme.mainFgText};
  justify-content: space-between;
  align-content: center;
  align-items: center;
  margin: 10px 0px;
`;

export const SettingLabel = styled.div`
  user-select: none;
`;
