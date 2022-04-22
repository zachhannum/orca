import styled from 'styled-components';
import { IconProps, IconPropDefaults } from './type';

const IconDiv = styled.div<IconProps>`
  height: ${(props) => props.size};
  width: ${(props) => props.size};
  overflow: hidden;
`;

const StyledSvg = styled.svg<IconProps>`
  display: block;
  path {
    fill: ${(props) => props.color};
  }
`;

const Icon = ({ size, color, children }: IconProps) => {
  return (
    <IconDiv size={size}>
      <StyledSvg
        color={color}
        height="100%"
        width="100%"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {children}
      </StyledSvg>
    </IconDiv>
  );
};

Icon.defaultProps = {
  ...IconPropDefaults,
};

export default Icon;
