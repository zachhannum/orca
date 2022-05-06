import Icon from './Icon';
import { IconProps, IconPropDefaults } from './type';

const FolderOpenIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path d="M17.6961 26.6939C18.7201 28.4354 21.2799 28.4354 22.3039 26.6939L28.6396 15.9184C29.6636 14.1769 28.3836 12 26.3357 12L13.6643 12C11.6164 12 10.3364 14.1769 11.3604 15.9184L17.6961 26.6939Z" />
    </Icon>
  );
};

FolderOpenIcon.defaultProps = {
  ...IconPropDefaults,
};

export default FolderOpenIcon;
