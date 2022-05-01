import Icon from './Icon';
import { IconProps, IconPropDefaults } from './type';

const ModalExitIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <g clipPath="url(#clip0_421_2700)">
        <path d="M39.2678 4.26777C40.2441 3.29146 40.2441 1.70854 39.2678 0.732233C38.2915 -0.244078 36.7085 -0.244078 35.7322 0.732233L20 16.4645L4.26777 0.732233C3.29146 -0.244078 1.70854 -0.244078 0.732234 0.732233C-0.244077 1.70854 -0.244077 3.29146 0.732234 4.26777L16.4645 20L0.73223 35.7322C-0.244077 36.7085 -0.244077 38.2915 0.73223 39.2678C1.70854 40.2441 3.29146 40.2441 4.26777 39.2678L20 23.5355L35.7322 39.2678C36.7085 40.2441 38.2915 40.2441 39.2678 39.2678C40.2441 38.2915 40.2441 36.7085 39.2678 35.7322L23.5355 20L39.2678 4.26777Z" />
      </g>
      <defs>
        <clipPath id="clip0_421_2700">
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </Icon>
  );
};

ModalExitIcon.defaultProps = {
  ...IconPropDefaults,
};

export default ModalExitIcon;
