import Icon from './Icon';
import { IconProps, IconPropDefaults } from './type';

const MoreVerticalIcon = ({ size, color }: IconProps) => {
  return (
    <Icon size={size} color={color}>
      <path d="M20 12.5C22.0625 12.5 23.75 10.8125 23.75 8.75C23.75 6.6875 22.0625 5 20 5C17.9375 5 16.25 6.6875 16.25 8.75C16.25 10.8125 17.9375 12.5 20 12.5ZM20 16.25C17.9375 16.25 16.25 17.9375 16.25 20C16.25 22.0625 17.9375 23.75 20 23.75C22.0625 23.75 23.75 22.0625 23.75 20C23.75 17.9375 22.0625 16.25 20 16.25ZM20 27.5C17.9375 27.5 16.25 29.1875 16.25 31.25C16.25 33.3125 17.9375 35 20 35C22.0625 35 23.75 33.3125 23.75 31.25C23.75 29.1875 22.0625 27.5 20 27.5Z" />
    </Icon>
  );
};

MoreVerticalIcon.defaultProps = {
  ...IconPropDefaults,
};

export default MoreVerticalIcon;
