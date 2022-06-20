import Icon from './Icon';
import { IconProps, IconPropDefaults } from './type';

const SidebarOpenIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path
        d="M29.0607 12.9393C29.6464 13.5251 29.6464 14.4749 29.0607 15.0607L24.1213 20L29.0607 24.9393C29.6464 25.5251 29.6464 26.4749 29.0607 27.0607C28.4749 27.6464 27.5251 27.6464 26.9393 27.0607L21.6464 21.7678C20.6701 20.7915 20.6701 19.2085 21.6464 18.2322L26.9393 12.9393C27.5251 12.3536 28.4749 12.3536 29.0607 12.9393Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.5 11C4.5 7.41015 7.41015 4.5 11 4.5H29C32.5899 4.5 35.5 7.41015 35.5 11V29C35.5 32.5899 32.5898 35.5 29 35.5H11C7.41015 35.5 4.5 32.5898 4.5 29V11ZM11 7.5C9.067 7.5 7.5 9.067 7.5 11V29C7.5 30.933 9.067 32.5 11 32.5H14V7.5H11ZM17 7.5V32.5H29C30.933 32.5 32.5 30.933 32.5 29V11C32.5 9.067 30.933 7.5 29 7.5H17Z"
      />
    </Icon>
  );
};

SidebarOpenIcon.defaultProps = {
  ...IconPropDefaults,
};

export default SidebarOpenIcon;
