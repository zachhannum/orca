import { css } from 'styled-components';
import Color from 'color';
import MenuBase from './MenuBase';

const style = css`
  background-color: ${(p) => Color(p.theme.contextMenuBg).toString()};
  border: ${(p) => p.theme.contextMenuDivider} 1px solid;
  backdrop-filter: blur(40px);
  border-radius: 10px;
  padding: 5px;
`;

export type Position = {
  x: number;
  y: number;
};

type ContextMenuProps = {
  showMenu: boolean;
  onCloseMenu: () => void;
  position: Position;
  center?: boolean;
  clickRef?: React.RefObject<HTMLElement>;
  children?: React.ReactNode;
};

const ContextMenu = ({
  showMenu,
  onCloseMenu,
  position,
  children,
  center = false,
  clickRef,
}: ContextMenuProps) => {
  return (
    <MenuBase
      showMenu={showMenu}
      onCloseMenu={onCloseMenu}
      position={position}
      center={center}
      styleMixin={style}
      clickRef={clickRef}
      fixed
    >
      {children}
    </MenuBase>
  );
};

export default ContextMenu;
