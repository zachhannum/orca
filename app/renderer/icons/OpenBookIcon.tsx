import Icon from './Icon';
import { IconProps, IconPropDefaults } from './type';

const OpenBookIcon = ({ size, color }: IconProps) => {
  return (
    <Icon size={size} color={color}>
      <path d="M39.7704 22.5064L34.741 31.1283C34.3496 31.7993 33.7892 32.3559 33.1156 32.7428C32.442 33.1297 31.6788 33.3333 30.902 33.3333H3.12674C1.84042 33.3333 1.03896 31.9379 1.68708 30.8268L6.71653 22.205C7.10793 21.534 7.66836 20.9773 8.34195 20.5904C9.01554 20.2035 9.77877 20 10.5556 20H38.3308C39.6172 20 40.4186 21.3953 39.7704 22.5064ZM10.5556 17.7777H33.3333V14.4444C33.3333 12.6034 31.841 11.1111 30 11.1111H18.8889L14.4444 6.66663H3.33333C1.49236 6.66663 0 8.15899 0 9.99996V29.3087L4.79701 21.0852C5.98708 19.0451 8.19368 17.7777 10.5556 17.7777Z" />
    </Icon>
  );
};

OpenBookIcon.defaultProps = {
  ...IconPropDefaults,
};

export default OpenBookIcon;
