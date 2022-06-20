import { useRef, useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import type { ModalProps } from './Modal';
import { Button, Checkbox } from '../controls';
import { buildBookPdf } from 'renderer/utils/buildPdf';
import { useOnBookPdfGenerated, useToggle } from 'renderer/hooks';

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      book: { value: string };
      author: { value: string };
      series: { value: string };
    };
    setIsBuildingPdf(true);
    buildBookPdf();
  };
  return (
    <Modal {...props}>
      <form ref={formRef} onSubmit={handleSubmit}>
        <StyledModalContent>
          <ModalTitle>Output Platforms</ModalTitle>
          <CheckboxDiv>
            <Checkbox
              label={'PDF'}
              checked={pdfPlatformToggleValue}
              onChange={togglePdfPlatformToggleValue}
            />
          </CheckboxDiv>
        </StyledModalContent>
        <StyledButtonDiv>
          <Button
            loading={isBuildingPdf}
            onClick={() => {
              formRef.current?.requestSubmit();
            }}
            disabled={!pdfPlatformToggleValue}
          >
            Generate
          </Button>
        </StyledButtonDiv>
      </form>
    </Modal>
  );
};

export default GenerateBookModal;
