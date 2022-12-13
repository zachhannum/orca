import styled, { css } from 'styled-components';
import { SettingSectionHeading } from '../Setting';
import ScrollContainer from '../ScrollContainer';
import FirstLineDecorationsSettings from './FirstLineDecorationsSettings';
import ParagraphSettings from './ParagraphSettings';
import HeadersSettings from './HeadersSettings';
import PrintSettings from './PrintSettings';

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
          <SettingSectionHeading>First Line Decorations</SettingSectionHeading>
          <FirstLineDecorationsSettings />
        </Section>
        <Section>
          <SettingSectionHeading>Paragraph</SettingSectionHeading>
          <ParagraphSettings />
        </Section>
        <Section>
          <SettingSectionHeading>Headers</SettingSectionHeading>
          <HeadersSettings />
        </Section>
        <Section>
          <SettingSectionHeading>Print</SettingSectionHeading>
          <PrintSettings />
        </Section>
      </SettingsContainer>
    </ScrollContainer>
  );
};

export default Publish;
