import { useEffect } from 'react';
import styled from 'styled-components';
import useToggle from '../utils/toggle';

type ToggleSwitchProps = {
  defaultValue?: boolean;
  altColor?: boolean;
  onChange?: (value: boolean) => void;
};

type StyledToggleBaseProps = {
  type: string;
  enabled: boolean;
};

const StyledToggleBase = styled.div<StyledToggleBaseProps>`
  cursor: pointer;
  height: 15px;
  width: 28px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${(p) =>
    p.enabled ? p.theme.toggleOnBg : p.theme.toggleOffBg[p.type]};
  border-radius: 8px;
  overflow: hidden;
  user-select: none;
  transition: all 100ms ease-in-out;
`;

type StyledToggleThumbProps = {
  type: string;
  enabled: boolean;
};

const StyledToggleThumb = styled.div<StyledToggleThumbProps>`
  height: 11px;
  width: 11px;
  border-radius: 8px;
  margin: 4px 2px;
  margin-left: ${(p) => (p.enabled ? '15px' : '2px')};
  background-color: ${(p) =>
    p.enabled ? p.theme.toggleOnFg : p.theme.toggleOffFg[p.type]};
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
      type={altColor ? 'alt' : 'default'}
      onClick={toggleValue}
    >
      <StyledToggleThumb
        enabled={enabled}
        type={altColor ? 'alt' : 'default'}
      />
    </StyledToggleBase>
  );
};

ToggleSwitch.defaultProps = {
  defaultValue: true,
  altColor: true,
  onChange: () => {},
};

export default ToggleSwitch;
