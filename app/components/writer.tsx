import {
  PlateProvider,
  Plate,
  createParagraphPlugin,
  createBlockquotePlugin,
  createHeadingPlugin,
  createBoldPlugin,
  createItalicPlugin,
  createUnderlinePlugin,
  createStrikethroughPlugin,
  createCodePlugin,
  createPlateUI,
  createPlugins,
  createAutoformatPlugin,
  createExitBreakPlugin,
  createDeserializeMdPlugin,
  createResetNodePlugin,
  createSoftBreakPlugin,
} from '@udecode/plate';
import {
  autoFormatPluginOptions,
  exitBreakPluginOptions,
  resetNodePluginOptions,
  plateUiOverrides,
  softBreakPluginOptions,
  withStyledPlaceholders,
} from 'writer/options';
import ScrollContainer from './scrollcontainer';

const editorId = '1';

const WriterComp = () => {
  const editableProps = {
    style: {
      minHeight: '70vh',
      width: '100%',
    },
  };

  const plugins = createPlugins(
    [
      createParagraphPlugin(),
      createBlockquotePlugin(),
      createHeadingPlugin(),
      createBoldPlugin(),
      createItalicPlugin(),
      createUnderlinePlugin(),
      createStrikethroughPlugin(),
      createCodePlugin(),
      createAutoformatPlugin(autoFormatPluginOptions),
      createExitBreakPlugin(exitBreakPluginOptions),
      createDeserializeMdPlugin(),
      createResetNodePlugin(resetNodePluginOptions),
      createSoftBreakPlugin(softBreakPluginOptions),
    ],
    {
      components: withStyledPlaceholders(createPlateUI(plateUiOverrides)),
    }
  );

  return (
    <ScrollContainer>
      <Plate id={editorId} editableProps={editableProps} plugins={plugins} />
    </ScrollContainer>
  );
};

const Writer = () => {
  return (
    <PlateProvider id={editorId}>
      <WriterComp />
    </PlateProvider>
  );
};

export default Writer;
