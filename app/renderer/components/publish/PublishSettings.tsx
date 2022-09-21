import styled from 'styled-components';
import ScrollContainer from '../ScrollContainer';
import FirstLineDecorations from './FirstLineDecorations';

const PublishSectionTitle = styled.div`
  color: ${(p) => p.theme.mainFgText};
  font-weight: 600;
  font-size: 1.2em;
  user-select: none;
`;

const SettingsContainer = styled.div`
  max-width: 500px;
  margin: auto;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 0px;
`;

const PublishSettings = () => {
  return (
    <ScrollContainer>
      <SettingsContainer>
        <Section>
          <PublishSectionTitle>Chapter Titles</PublishSectionTitle>
        </Section>
        <Section>
          <PublishSectionTitle>First Line Decorations</PublishSectionTitle>
          <FirstLineDecorations />
        </Section>
        <Section>
          <PublishSectionTitle>Paragraph</PublishSectionTitle>
        </Section>
        <Section>
          <PublishSectionTitle>Headers</PublishSectionTitle>
        </Section>
        <Section>
          <PublishSectionTitle>Print</PublishSectionTitle>
        </Section>
      </SettingsContainer>
    </ScrollContainer>
  );
};

export default PublishSettings;
