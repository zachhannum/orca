import Icon from './Icon';
import { IconProps, IconPropDefaults } from './type';

const PageRightIcon = ({ size, color }: IconProps) => {
  return (
    <Icon size={size} color={color}>
      <g clipPath="url(#clip0_400_1710)">
        <path d="M34.7675 14.8234C38.5794 17.0672 38.6151 22.7557 34.8318 25.0627L11.4224 39.3372C7.63906 41.6442 2.87416 38.8394 2.84559 34.2887L2.66879 6.13064C2.64021 1.57985 7.36938 -1.3039 11.1813 0.9399L34.7675 14.8234Z" />
      </g>
      <defs>
        <clipPath id="clip0_400_1710">
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

PageRightIcon.defaultProps = {
  ...IconPropDefaults,
};

export default PageRightIcon;
