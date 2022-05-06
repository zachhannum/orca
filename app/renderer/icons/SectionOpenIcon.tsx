import Icon from './Icon';
import { IconProps, IconPropDefaults } from './type';

const SectionOpenIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path
        d="M39.8479 7.23359C39.7521 7.00239 39.6111 6.78551 39.4248 6.59648Z"
      />
      <path
        d="M39.4248 6.59648C39.4191 6.59071 39.4134 6.58497 39.4077 6.57927C39.0463 6.22117 38.549 6 38 6H30C28.8954 6 28 6.89543 28 8C28 9.10457 28.8954 10 30 10H33.1716L21.5858 21.5858C20.8047 22.3668 20.8047 23.6332 21.5858 24.4142C22.3668 25.1953 23.6332 25.1953 24.4142 24.4142L36 12.8284V16C36 17.1046 36.8954 18 38 18C39.1046 18 40 17.1046 40 16V8C40 7.72882 39.9457 7.4694 39.8479 7.23359"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 14C5.34315 14 4 15.3431 4 17V29C4 30.6569 5.34315 32 7 32H29C30.6569 32 32 30.6569 32 29V21C32 19.8954 32.8954 19 34 19C35.1046 19 36 19.8954 36 21V29C36 32.866 32.866 36 29 36H7C3.13401 36 0 32.866 0 29V17C0 13.134 3.13401 10 7 10H25C26.1046 10 27 10.8954 27 12C27 13.1046 26.1046 14 25 14H7Z"
      />
    </Icon>
  );
};

SectionOpenIcon.defaultProps = {
  ...IconPropDefaults,
};

export default SectionOpenIcon;
