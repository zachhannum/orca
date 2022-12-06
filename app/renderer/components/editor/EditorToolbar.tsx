import styled, { useTheme } from 'styled-components';
import Color from 'color';
import { IconButton } from 'renderer/controls';
import { SpellCheckIcon } from 'renderer/icons';
import useStore from 'renderer/store/useStore';

const StyledToolbarDiv = styled.div`
  background-color: ${(p) => Color(p.theme.sidebarBg).alpha(1.0).toString()};
  border-radius: 7px;
  padding: 7px;
  position: absolute;
  bottom: 10px;
  right: 20px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  align-content: center;
  justify-content: center;
`;

const WordCountDiv = styled.div`
  font-size: 0.8em;
  color: ${(p) => p.theme.sidebarFgTextSecondary};
  line-height: 20px;
  height: 20px;
`;

type EditorToolbarProps = {
  wordCount: number;
};

const EditorToolbar = ({ wordCount }: EditorToolbarProps) => {
  const theme = useTheme();
  const settings = useStore((state) => state.settings);
  return (
    <StyledToolbarDiv>
      <WordCountDiv>{wordCount} Words</WordCountDiv>
      {settings.enableLanguageToolIntegration && (
        <IconButton
          iconSize="20px"
          foregroundColor={theme.sidebarIconFg}
          backgroundColor="transparent"
        >
          <SpellCheckIcon />
        </IconButton>
      )}
    </StyledToolbarDiv>
  );
};

export default EditorToolbar;
