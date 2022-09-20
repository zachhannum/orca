import { useTheme } from 'styled-components';
import SwitchBase from './SwitchBase';

type ToggleSwitchProps = {
  defaultValue?: boolean;
  type?: 'alt' | 'default';
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  value?: boolean | undefined;
};

const ToggleSwitch = ({
  defaultValue,
  type = 'default',
  disabled = false,
  onChange,
  value = undefined,
}: ToggleSwitchProps) => {
  const theme = useTheme();

  return (
    <SwitchBase
      horizontalPadding={2}
      thumbHeight={11}
      thumbWidth={11}
      thumbBorderRadius={6}
      thumbCheckedColor={theme.toggleOnFg}
      thumbUncheckedColor={theme.toggleOffFg[type]}
      baseHeight={15}
      baseWidth={28}
      baseBorderRadius={8}
      baseCheckedColor={theme.toggleOnBg}
      baseUncheckedColor={theme.toggleOffBg[type]}
      defaultValue={defaultValue}
      onChange={onChange}
      disabled={disabled}
      value={value}
    />
  );
};

export default ToggleSwitch;
