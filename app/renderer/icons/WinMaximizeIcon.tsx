import Icon from './Icon';
import { IconProps, IconPropDefaults } from './type';

const WinMaximizeIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 3V37H37V3H3ZM2 0C0.895431 0 0 0.895431 0 2V38C0 39.1046 0.895431 40 2 40H38C39.1046 40 40 39.1046 40 38V2C40 0.895431 39.1046 0 38 0H2Z"
      />
    </Icon>
  );
};

WinMaximizeIcon.defaultProps = {
  ...IconPropDefaults,
};

export default WinMaximizeIcon;
