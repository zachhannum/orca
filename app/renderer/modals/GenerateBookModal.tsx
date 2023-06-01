import { useRef, useState } from 'react';
import styled from 'styled-components';
import { buildBookPdf } from 'renderer/utils/buildPdf';
import { useOnBookPdfGenerated, useToggle } from 'renderer/hooks';
import type { ModalProps } from 'renderer/modals/Modal';
import { Button, Checkbox } from 'renderer/controls';
import { usePagedCss } from 'renderer/pagedjs/usePagedCss';
import useStore from 'renderer/store/useStore';
import Modal from './Modal';

const StyledModalContent = styled.div`
  display: flex;
  color: ${(p) => p.theme.contextMenuFg};
  box-sizing: border-box;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 10px;
  margin: 30px;
  align-content: center;
  justify-content: center;
  align-items: flex-start;
`;

const StyledButtonDiv = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

const CheckboxDiv = styled.div`
  display: flex;
  margin: 20px 40px;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

const ModalTitle = styled.span`
  font-size: 1.1em;
`;

const GenerateBookModal = (props: ModalProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isBuildingPdf, setIsBuildingPdf] = useState(false);
  const [pdfPlatformToggleValue, togglePdfPlatformToggleValue] =
    useToggle(false);

  useOnBookPdfGenerated(() => {
    setIsBuildingPdf(false);
  });

  const pagedCss = usePagedCss();
  const { customCss } = useStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsBuildingPdf(true);
    buildBookPdf(pagedCss + customCss);
  };
  return (
    <Modal {...props}>
      <form ref={formRef} onSubmit={handleSubmit}>
        <StyledModalContent>
          <ModalTitle>Output Platforms</ModalTitle>
          <CheckboxDiv>
            <Checkbox
              label="PDF"
              checked={pdfPlatformToggleValue}
              onChange={togglePdfPlatformToggleValue}
            />
          </CheckboxDiv>
        </StyledModalContent>
        <StyledButtonDiv>
          <Button loading={isBuildingPdf} isDisabled={!pdfPlatformToggleValue}>
            Generate
          </Button>
        </StyledButtonDiv>
      </form>
    </Modal>
  );
};

export default GenerateBookModal;
