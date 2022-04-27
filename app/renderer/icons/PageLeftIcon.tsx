import Icon from './Icon';
import { IconProps, IconPropDefaults } from './type';

const PageLeftIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <g clipPath="url(#clip0_400_1715)">
        <path d="M5.52144 25.454C1.71231 23.2055 1.68361 17.5169 5.46979 15.2146L28.8968 0.969038C32.683 -1.33328 37.4444 1.47735 37.4674 6.02817L37.6094 34.1864C37.6323 38.7372 32.8996 41.6151 29.0905 39.3666L5.52144 25.454Z" />
      </g>
      <defs>
        <clipPath id="clip0_400_1715">
          <rect
            width="40"
            height="40"
            fill="white"
            transform="translate(39.9989) rotate(89.5751)"
          />
        </clipPath>
      </defs>
    </Icon>
  );
};

PageLeftIcon.defaultProps = {
  ...IconPropDefaults,
};

export default PageLeftIcon;
