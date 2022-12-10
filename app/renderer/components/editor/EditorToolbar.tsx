import { useState, useRef, useCallback } from 'react';
import styled, { useTheme } from 'styled-components';
import Color from 'color';
import { GridLoader } from 'react-spinners';
import { IconButton } from 'renderer/controls';
import { SpellCheckIcon } from 'renderer/icons';
import useStore from 'renderer/store/useStore';
import { ContextMenu, ContextMenuItem } from '..';
import { Position } from '../MenuBase';

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
  z-index: 3;
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
  proofreading: boolean;
  numProofreadingMatches: number;
  onProofread?: () => void;
};

const EditorToolbar = ({
  wordCount,
  proofreading,
  numProofreadingMatches,
  onProofread,
}: EditorToolbarProps) => {
  const theme = useTheme();
  const settings = useStore((state) => state.settings);
  const [showSpellCheckContextMenu, setShowSpellCheckContextMenu] =
    useState(false);
  const spellCheckButtonRef = useRef<HTMLAnchorElement>(null);

  const getSpellCheckMenuPosition = useCallback(() => {
    if (spellCheckButtonRef.current) {
      const rect = spellCheckButtonRef.current.getBoundingClientRect();
      const position: Position = {
        x: rect.left + rect.width / 2,
        y: rect.top - 15,
      };
      return position;
    }
    return { x: 0, y: 0 };
  }, [spellCheckButtonRef]);

  return (
    <StyledToolbarDiv>
      <TextDiv>{wordCount} Words</TextDiv>
      {settings.enableLanguageToolIntegration && (
        <ProofReadDiv>
          {!proofreading && (
            <>
              <IconButton
                iconSize="20px"
                foregroundColor={theme.mainFgTextSecondary}
                backgroundColor="transparent"
                ref={spellCheckButtonRef}
                onClick={() => {
                  setShowSpellCheckContextMenu(!showSpellCheckContextMenu);
                  // if (onProofread) onProofread();
                }}
              >
                <SpellCheckIcon />
              </IconButton>
              {numProofreadingMatches > 0 && (
                <TextDiv>{numProofreadingMatches}</TextDiv>
              )}
              <ContextMenu
                showMenu={showSpellCheckContextMenu}
                clickRef={spellCheckButtonRef}
                onCloseMenu={() => {
                  setShowSpellCheckContextMenu(false);
                }}
                position={getSpellCheckMenuPosition()}
                center
              >
                <ContextMenuItem>Clear suggestions</ContextMenuItem>
                <ContextMenuItem
                  onClick={() => {
                    if (onProofread) {
                      onProofread();
                    }
                    setShowSpellCheckContextMenu(false);
                  }}
                >
                  Check spelling and grammar
                </ContextMenuItem>
              </ContextMenu>
            </>
          )}

          <GridLoader
            size={3.5}
            margin={1.6}
            loading={proofreading}
            color={theme.mainFgTextSecondary}
          />
        </ProofReadDiv>
      )}
    </StyledToolbarDiv>
  );
};

export default EditorToolbar;
