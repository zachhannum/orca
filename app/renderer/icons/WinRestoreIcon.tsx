import Icon from './Icon';
import { IconProps, IconPropDefaults } from './type';

const WinRestoreIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 10V37H31V10H3ZM2 7C0.895431 7 0 7.89543 0 9V38C0 39.1046 0.89543 40 2 40H32C33.1046 40 34 39.1046 34 38V9C34 7.89543 33.1046 7 32 7H2Z"
      />
      <path d="M9 7V3H37V30H34V33H38C39.1046 33 40 32.1046 40 31V2C40 0.895431 39.1046 0 38 0H8C6.89543 0 6 0.895431 6 2V7H9Z" />
    </Icon>
  );
};

WinRestoreIcon.defaultProps = {
  ...IconPropDefaults,
};

export default WinRestoreIcon;
