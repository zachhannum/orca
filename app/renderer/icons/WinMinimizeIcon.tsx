import Icon from './Icon';
import { IconProps, IconPropDefaults } from './type';

const WinMinimizeIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.5 21C0.5 20.1716 1.17157 19.5 2 19.5L38 19.5C38.8284 19.5 39.5 20.1716 39.5 21C39.5 21.8284 38.8284 22.5 38 22.5L2 22.5C1.17157 22.5 0.5 21.8284 0.5 21Z"
      />
    </Icon>
  );
};

WinMinimizeIcon.defaultProps = {
  ...IconPropDefaults,
};

export default WinMinimizeIcon;
