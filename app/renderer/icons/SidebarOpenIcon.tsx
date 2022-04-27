import Icon from './Icon';
import { IconProps, IconPropDefaults } from './type';

const SidebarOpenIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path d="M8 10C8 7.23858 10.2386 5 13 5H18V35H13C10.2386 35 8 32.7614 8 30V10Z" />
      <path d="M22.8163 21.5359C21.7279 20.8533 21.7279 19.1467 22.8163 18.4641L29.551 14.2403C30.6395 13.5576 32 14.4109 32 15.7762L32 24.2238C32 25.5891 30.6395 26.4424 29.551 25.7597L22.8163 21.5359Z" />
    </Icon>
  );
};

SidebarOpenIcon.defaultProps = {
  ...IconPropDefaults,
};

export default SidebarOpenIcon;
