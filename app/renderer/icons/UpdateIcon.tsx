import Icon from './Icon';
import { IconProps, IconPropDefaults } from './type';

const UpdateIcon = ({ size, color }: IconProps) => {
  return (
    <Icon size={size} color={color}>
      <path d="M20 36C11.18 36 4 28.82 4 20C4 11.18 11.18 4 20 4C28.82 4 36 11.18 36 20C36 28.82 28.82 36 20 36ZM20 40C31.04 40 40 31.04 40 20C40 8.96 31.04 0 20 0C8.96 0 0 8.96 0 20C0 31.04 8.96 40 20 40ZM18 20V28H22V20H28L20 12L12 20H18Z" />
    </Icon>
  );
};

UpdateIcon.defaultProps = {
  ...IconPropDefaults,
};

export default UpdateIcon;
