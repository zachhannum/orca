import styled from 'styled-components';

export const Setting = styled.div`
  display: flex;
  flex-direction: row;
  color: ${(p) => p.theme.mainFgText};
  justify-content: space-between;
  align-content: center;
  align-items: center;
  margin: 5px 0px;
`;

export const SettingLabel = styled.div`
  user-select: none;
`;

export const SettingSubHeading = styled.div`
  user-select: none;
  font-weight: 600;
  padding: 10px 0px;
`;
