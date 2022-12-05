import styled, { useTheme } from 'styled-components';
import Color from 'color';
import { IconButton } from 'renderer/controls';
import { SpellCheckIcon } from 'renderer/icons';

const StyledToolbarDiv = styled.div`
  background-color: ${(p) => Color(p.theme.sidebarBg).alpha(1.0).toString()};
  border-radius: 7px;
  padding: 7px;
  position: absolute;
  bottom: 20px;
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
  line-height: 100%;
`;

type EditorToolbarProps = {
  wordCount: number;
};

const EditorToolbar = ({ wordCount }: EditorToolbarProps) => {
  const theme = useTheme();
  return (
    <StyledToolbarDiv>
      <WordCountDiv>{wordCount} Words</WordCountDiv>
      <IconButton
        iconSize="20px"
        foregroundColor={theme.sidebarIconFg}
        backgroundColor="transparent"
      >
        <SpellCheckIcon />
      </IconButton>
    </StyledToolbarDiv>
  );
};

export default EditorToolbar;
