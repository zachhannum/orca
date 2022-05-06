import Icon from './Icon';
import { IconProps, IconPropDefaults } from './type';

const FolderClosedIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path d="M26.6939 22.3039C28.4354 21.2799 28.4354 18.7201 26.6939 17.6961L15.9184 11.3604C14.1769 10.3364 12 11.6164 12 13.6643L12 26.3357C12 28.3836 14.1769 29.6636 15.9184 28.6396L26.6939 22.3039Z" />
    </Icon>
  );
};

FolderClosedIcon.defaultProps = {
  ...IconPropDefaults,
};

export default FolderClosedIcon;
