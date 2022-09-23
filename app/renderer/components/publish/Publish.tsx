import styled, { css } from 'styled-components';
import ScrollContainer from '../ScrollContainer';
import FirstLineDecorationsSettings from './FirstLineDecorationsSettings';
import ParagraphSettings from './ParagraphSettings';
import HeadersSettings from './HeadersSettings';
import PrintSettings from './PrintSettings';

const PublishSectionTitle = styled.div`
  color: ${(p) => p.theme.mainFgTextSecondary};
  font-weight: 600;
  font-size: 1.2em;
  user-select: none;
  padding-bottom: 10px;
`;

const SettingsContainer = styled.div`
  max-width: 500px;
  margin: auto;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin: 25px 0px;
`;

const scrollerCss = css`
  padding-right: 50px;
  padding-left: 50px;
  margin-right: 5px;
`;

const Publish = () => {
  return (
    <ScrollContainer cssMixin={scrollerCss}>
      <SettingsContainer>
        {/* <Section>
          <PublishSectionTitle>Chapter Titles</PublishSectionTitle>
        </Section> */}
        <Section>
          <PublishSectionTitle>First Line Decorations</PublishSectionTitle>
          <FirstLineDecorationsSettings />
        </Section>
        <Section>
          <PublishSectionTitle>Paragraph</PublishSectionTitle>
          <ParagraphSettings />
        </Section>
        <Section>
          <PublishSectionTitle>Headers</PublishSectionTitle>
          <HeadersSettings />
        </Section>
        <Section>
          <PublishSectionTitle>Print</PublishSectionTitle>
          <PrintSettings />
        </Section>
      </SettingsContainer>
    </ScrollContainer>
  );
};

export default Publish;
