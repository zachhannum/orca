import Icon from './Icon';
import { IconProps, IconPropDefaults } from './type';

const WinCloseIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <g clipPath="url(#clip0_425_1941)">
        <path d="M39.5607 2.56066C40.1464 1.97487 40.1464 1.02513 39.5607 0.43934C38.9749 -0.146447 38.0251 -0.146447 37.4393 0.43934L20 17.8787L2.56066 0.43934C1.97488 -0.146447 1.02513 -0.146447 0.439342 0.43934C-0.146445 1.02513 -0.146445 1.97487 0.439342 2.56066L17.8787 20L0.439339 37.4393C-0.146446 38.0251 -0.146446 38.9749 0.439339 39.5607C1.02513 40.1464 1.97487 40.1464 2.56066 39.5607L20 22.1213L37.4393 39.5607C38.0251 40.1464 38.9749 40.1464 39.5607 39.5607C40.1464 38.9749 40.1464 38.0251 39.5607 37.4393L22.1213 20L39.5607 2.56066Z" />
      </g>
      <defs>
        <clipPath id="clip0_425_1941">
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </Icon>
  );
};

WinCloseIcon.defaultProps = {
  ...IconPropDefaults,
};

export default WinCloseIcon;
