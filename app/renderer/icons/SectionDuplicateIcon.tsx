import Icon from './Icon';
import { IconProps, IconPropDefaults } from './type';

const SectionDuplicateIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 3C16.6863 3 14 5.68629 14 9V19C14 22.3137 16.6863 25 20 25H30C33.3137 25 36 22.3137 36 19V9C36 5.68629 33.3137 3 30 3H20ZM18 9C18 7.89543 18.8954 7 20 7H30C31.1046 7 32 7.89543 32 9V19C32 20.1046 31.1046 21 30 21H20C18.8954 21 18 20.1046 18 19V9Z"
      />
      <path d="M7 20C7 18.8954 7.89543 18 9 18H9.5C10.6046 18 11.5 17.1046 11.5 16C11.5 14.8954 10.6046 14 9.5 14H9C5.68629 14 3 16.6863 3 20V30C3 33.3137 5.68629 36 9 36H19C22.3137 36 25 33.3137 25 30V29.5C25 28.3954 24.1046 27.5 23 27.5C21.8954 27.5 21 28.3954 21 29.5V30C21 31.1046 20.1046 32 19 32H9C7.89543 32 7 31.1046 7 30V20Z" />
    </Icon>
  );
};

SectionDuplicateIcon.defaultProps = {
  ...IconPropDefaults,
};

export default SectionDuplicateIcon;
