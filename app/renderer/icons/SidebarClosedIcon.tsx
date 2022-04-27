import Icon from './Icon';
import { IconProps, IconPropDefaults } from './type';

const SidebarClosedIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path d="M8 10C8 7.23858 10.2386 5 13 5H18V35H13C10.2386 35 8 32.7614 8 30V10Z" />
      <path d="M31.1837 21.5359C32.2721 20.8533 32.2721 19.1467 31.1837 18.4641L24.449 14.2403C23.3605 13.5576 22 14.4109 22 15.7762L22 24.2238C22 25.5891 23.3605 26.4424 24.449 25.7597L31.1837 21.5359Z" />
    </Icon>
  );
};

SidebarClosedIcon.defaultProps = {
  ...IconPropDefaults,
};

export default SidebarClosedIcon;
