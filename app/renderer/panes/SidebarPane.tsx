import { useEffect, useState, useRef } from 'react';
import styled, { useTheme, css } from 'styled-components';
import Color from 'color';
import { IconButton, TwoOptionSlider } from 'renderer/controls';
import {
  MoreOptionsSidebarMenu,
  Pane,
  SidebarProjectContent,
} from '../components';
import {
  SidebarOpenIcon,
  SidebarClosedIcon,
  HelpIcon,
  SettingsIcon,
} from '../icons';
import { useToggle } from '../hooks';
import useStore from '../store/useStore';

const SidebarTopContainer = styled.div`
  display: flex;
  padding-left: 15px;
  padding-right: 5px;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  z-index: 2;
  padding-top: var(--fallback-title-bar-height);
`;

const SidebarBottomContainer = styled.div`
  display: flex;
  padding: 10px 20px 20px 20px;
  box-sizing: border-box;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const SidebarBottomItem = styled.span`
  display: flex;
  align-items: center;
  align-content: center;
  font-size: 0.8em;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  color: ${(p) => p.theme.sidebarFgTextSecondary};
  path {
    fill: ${(p) => p.theme.sidebarFgTextSecondary};
  }
  &:hover {
    color: ${(p) =>
      Color(p.theme.sidebarFgTextSecondary).lighten(0.2).hsl().string()};
    path {
      fill: ${(p) =>
        Color(p.theme.sidebarFgTextSecondary).lighten(0.2).hsl().string()};
    }
  }
  gap: 12px;
`;

const paneStyleMixin = css`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  flex-basis: 1;
`;

const SidebarToggleButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  gap: 10px;
  /* margin-right: '0px' : '-100px')}; */
  /* transition: margin-right 300ms ease-in-out; */
`;

const SidebarPane = () => {
  const theme = useTheme();
  const [open, toggleOpen] = useToggle(true);
  const [autoOpen, setAutoOpen] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [setSidebarOpen, setSettingsModalOpen, sidebarMenuOpen] = useStore(
    (state) => {
      return [
        state.setSidebarOpen,
        state.setSettingsModalOpen,
        state.sidebarMenuOpen,
      ];
    }
  );
  const paneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSidebarOpen(open);
    if (open) {
      setAutoOpen(false);
    }
  }, [open]);

  /* Calculate autoOpen state */
  useEffect(() => {
    if (!open && paneRef.current) {
      if (!autoOpen) {
        if (mouseX < 20) {
          setAutoOpen(true);
        }
      } else if (
        mouseX > paneRef.current.clientWidth + 20 &&
        !sidebarMenuOpen
      ) {
        setAutoOpen(false);
      }
    }
  }, [open, autoOpen, mouseX, sidebarMenuOpen]);

  const handleShowSidebarOnMouse = (mouseEvent: MouseEvent) => {
    setMouseX(mouseEvent.pageX);
  };

  useEffect(() => {
    document.body.addEventListener('mousemove', handleShowSidebarOnMouse);

    return () => {
      document.body.removeEventListener('mousemove', handleShowSidebarOnMouse);
    };
  }, []);

  return (
    <Pane
      enabled={open || autoOpen}
      defaultWidth="250px"
      minWidth={225}
      backgroundColor="transparent"
      styleMixin={paneStyleMixin}
      ref={paneRef}
    >
      <SidebarTopContainer>
        <SidebarToggleButtonDiv>
          <IconButton
            iconSize="22px"
            foregroundColor={theme.sidebarIconFg}
            onClick={toggleOpen}
          >
            {open ? <SidebarOpenIcon /> : <SidebarClosedIcon />}
          </IconButton>
          <MoreOptionsSidebarMenu />
        </SidebarToggleButtonDiv>
      </SidebarTopContainer>
      <SidebarProjectContent />
      <SidebarBottomContainer>
        <SidebarBottomItem>
          <HelpIcon size="15px" />
          <span>Feedback</span>
        </SidebarBottomItem>
        <SidebarBottomItem
          onClick={() => {
            setSettingsModalOpen(true);
          }}
        >
          <SettingsIcon size="15px" />
          <span>Settings</span>
        </SidebarBottomItem>
      </SidebarBottomContainer>
    </Pane>
  );
};

export default SidebarPane;
