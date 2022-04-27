// TODO: refactor using context?
export type IconProps = {
  size?: string;
  color?: string;
  shapeRendering?: string;
  children?: React.ReactNode;
};

export const IconPropDefaults = {
  size: '40px',
  color: '#ffffff',
  hoverColor: '#ffffff',
  shapeRendering: 'auto',
};
