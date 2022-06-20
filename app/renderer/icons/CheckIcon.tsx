import Icon from './Icon';
import { IconProps, IconPropDefaults } from './type';

const CheckIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M37.9421 8.08672C39.3726 9.51562 39.3494 11.8096 37.8903 13.2105L19.6678 30.705C17.8693 32.4317 14.9906 32.4317 13.1922 30.705L3.10974 21.0253C1.65056 19.6245 1.62737 17.3305 3.05793 15.9016C4.48849 14.4726 6.83109 14.4499 8.29026 15.8508L16.43 23.6654L32.7097 8.03598C34.1689 6.6351 36.5115 6.65781 37.9421 8.08672Z"
      />
    </Icon>
  );
};

CheckIcon.defaultProps = {
  ...IconPropDefaults,
};

export default CheckIcon;
