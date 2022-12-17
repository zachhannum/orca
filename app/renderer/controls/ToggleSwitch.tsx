import { useTheme } from 'styled-components';
import SwitchBase from './SwitchBase';

type ToggleSwitchProps = {
  type?: 'alt' | 'default';
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  value?: boolean | undefined;
  size?: 'default' | 'small';
};

const ToggleSwitch = ({
  type = 'default',
  disabled = false,
  onChange,
  value = undefined,
  size = 'default',
}: ToggleSwitchProps) => {
  const theme = useTheme();

  const sizes = () => {
    if (size === 'default') {
      return {
        thumbHeight: 15,
        thumbWidth: 15,
        thumbBorderRadius: 8,
        baseHeight: 20,
        baseWidth: 36,
        baseBorderRadius: 10,
      };
    }
    return {
      thumbHeight: 11,
      thumbWidth: 11,
      thumbBorderRadius: 6,
      baseHeight: 15,
      baseWidth: 28,
      baseBorderRadius: 8,
    };
  };

  return (
    <SwitchBase
      horizontalPadding={2}
      thumbCheckedColor={theme.toggleOnFg}
      thumbUncheckedColor={theme.toggleOffFg[type]}
      baseCheckedColor={theme.toggleOnBg}
      baseUncheckedColor={theme.toggleOffBg[type]}
      onChange={onChange}
      disabled={disabled}
      value={value}
      {...sizes()}
    />
  );
};

export default ToggleSwitch;
