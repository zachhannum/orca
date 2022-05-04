import Icon from './Icon';
import { IconProps, IconPropDefaults } from './type';

const PlusIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 0.869507C21.4407 0.869507 22.6087 2.03746 22.6087 3.4782V16.5217H36.5217C37.9625 16.5217 39.1304 17.6896 39.1304 19.1304C39.1304 20.5711 37.9625 21.7391 36.5217 21.7391H22.6087V36.5217C22.6087 37.9624 21.4407 39.1304 20 39.1304C18.5593 39.1304 17.3913 37.9624 17.3913 36.5217V21.7391H3.47826C2.03752 21.7391 0.869568 20.5711 0.869568 19.1304C0.869568 17.6896 2.03752 16.5217 3.47826 16.5217L17.3913 16.5217V3.4782C17.3913 2.03746 18.5593 0.869507 20 0.869507Z"
      />
    </Icon>
  );
};

PlusIcon.defaultProps = {
  ...IconPropDefaults,
};

export default PlusIcon;
