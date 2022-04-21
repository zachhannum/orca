import { useEffect } from 'react';
import styled from 'styled-components';
import useToggle from 'renderer/utils/toggle';

type ToggleSwitchProps = {
  defaultValue?: boolean;
  altColor?: boolean;
  onChange?: (value: boolean) => void;
};

type StyledToggleBaseProps = {
  bg: string;
  enabled: boolean;
};

const StyledToggleBase = styled.div<StyledToggleBaseProps>`
  cursor: pointer;
  height: 20px;
  width: 36px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${(p) =>
    p.enabled ? p.theme.toggleOnBg : p.theme.toggleOffBg[p.bg]};
  border-radius: 40px;
  overflow: hidden;
  user-select: none;
  transition: all 100ms ease-in-out;
`;

type StyledToggleThumbProps = {
  enabled: boolean;
};

const StyledToggleThumb = styled.div<StyledToggleThumbProps>`
  height: 16px;
  width: 16px;
  border-radius: 8px;
  margin: 4px 2px;
  margin-left: ${(p) => (p.enabled ? '19px' : '2px')};
  background-color: ${(p) =>
    p.enabled ? p.theme.toggleOnFg : p.theme.toggleOffFg};
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
  user-select: none;
  transition: all 100ms ease-in-out;
`;

const ToggleSwitch = ({
  defaultValue,
  altColor,
  onChange,
}: ToggleSwitchProps) => {
  const [enabled, toggleValue] = useToggle(defaultValue);

  useEffect(() => {
    if (onChange) onChange(enabled);
  }, [enabled, onChange]);

  return (
    <StyledToggleBase
      enabled={enabled}
      bg={altColor ? 'alt' : 'default'}
      onClick={toggleValue}
    >
      <StyledToggleThumb enabled={enabled} />
    </StyledToggleBase>
  );
};

ToggleSwitch.defaultProps = {
  defaultValue: true,
  altColor: true,
  onChange: () => {},
};

export default ToggleSwitch;
