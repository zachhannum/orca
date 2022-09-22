import styled, { css } from 'styled-components';
import ScrollContainer from '../ScrollContainer';
import FirstLineDecorations from './FirstLineDecorations';
import useStore from '../../store/useStore';

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

const scrollerCss = css`
  padding-right: 50px;
  padding-left: 50px;
  margin-right: 5px;
`;

const PublishSettings = () => {
  return (
    <ScrollContainer cssMixin={scrollerCss}>
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
