import { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import Color from 'color';
import { GridLoader } from 'react-spinners';
import { IconButton } from 'renderer/controls';
import { SpellCheckIcon } from 'renderer/icons';
import useStore from 'renderer/store/useStore';
import { checkText, LanguageToolApi } from './language-tool/api';

const StyledToolbarDiv = styled.div`
  background-color: ${(p) =>
    Color(p.theme.mainBg).lighten(0.2).alpha(1.0).toString()};
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
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  transition: all 200ms ease-in-out;
`;

const TextDiv = styled.div`
  font-size: 0.8em;
  color: ${(p) => p.theme.mainFgTextSecondary};
  line-height: 20px;
  height: 20px;
  user-select: none;
  transition: all 200ms ease-in-out;
`;

const ProofReadDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
  background-color: ${(p) => Color(p.theme.mainBg).lighten(0.6).toString()};
  border-radius: 5px;
  padding: 3px;
`;

type EditorToolbarProps = {
  wordCount: number;
  onProofRead?: (value: LanguageToolApi) => void;
};

const EditorToolbar = ({ wordCount, onProofRead }: EditorToolbarProps) => {
  const theme = useTheme();
  const settings = useStore((state) => state.settings);
  const [proofReadLoading, setProofReadLoading] = useState(false);
  const [numProofreadingMatches, setNumProofreadingMatches] = useState(0);
  return (
    <StyledToolbarDiv>
      <TextDiv>{wordCount} Words</TextDiv>
      {settings.enableLanguageToolIntegration && (
        <ProofReadDiv>
          {!proofReadLoading && (
            <>
              <IconButton
                iconSize="20px"
                foregroundColor={theme.mainFgTextSecondary}
                backgroundColor="transparent"
                onClick={() => {
                  setProofReadLoading(true);
                  const { previewContent } = useStore.getState();
                  checkText(previewContent)
                    .then((value) => {
                      console.log(value);
                      if (value.matches) {
                        setNumProofreadingMatches(value.matches?.length);
                      }
                      if (onProofRead) {
                        onProofRead(value);
                      }
                      setProofReadLoading(false);
                      return null;
                    })
                    .catch((e) => console.log(e));
                }}
              >
                <SpellCheckIcon />
              </IconButton>
              {numProofreadingMatches > 0 && (
                <TextDiv>{numProofreadingMatches}</TextDiv>
              )}
            </>
          )}

          <GridLoader
            size={3.5}
            margin={1.6}
            loading={proofReadLoading}
            color={theme.mainFgTextSecondary}
          />
        </ProofReadDiv>
      )}
    </StyledToolbarDiv>
  );
};

export default EditorToolbar;
