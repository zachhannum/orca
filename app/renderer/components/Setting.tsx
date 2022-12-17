import styled, { css } from 'styled-components';

type SettingProps = {
  wrapSetting?: boolean;
  children: React.ReactNode;
};

const StyledSetting = styled.div<SettingProps>`
  display: flex;
  flex-direction: row;
  color: ${(p) => p.theme.mainFgText};
  justify-content: space-between;
  align-content: center;
  align-items: center;
  flex-wrap: ${(p) => (p.wrapSetting ? 'wrap' : 'nowrap')};
  border-radius: 7px;
  padding: 7px 15px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  transition: background-color 0.2s ease;
`;

export const Setting = ({ wrapSetting = false, ...props }: SettingProps) => {
  return <StyledSetting wrapSetting={wrapSetting} {...props} />;
};

type SettingLabelProps = {
  disabled?: boolean;
  children: React.ReactNode;
};
const StyledSettingLabel = styled.div<SettingLabelProps>`
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  ${(p) =>
    p.disabled &&
    css`
      opacity: 0.5;
    `}
`;

export const SettingLabel = ({
  disabled = false,
  ...props
}: SettingLabelProps) => {
  return <StyledSettingLabel disabled={disabled} {...props} />;
};

export const SettingSubHeading = styled.div`
  user-select: none;
  font-weight: 600;
  padding: 10px 0px;
`;

export const SettingSubSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
`;

export const SettingSectionHeading = styled.div`
  font-size: 1.2em;
  color: ${(p) => p.theme.sidebarFgTextSecondary};
  padding: 10px 0px;
  font-weight: 600;
`;
