import { useEffect } from 'react';
import { Plate, PlateProvider, usePlateEditorRef } from '@udecode/plate';
import { Transforms, Editor } from 'slate';
import ScrollContainer from './ScrollContainer';
import useStore from 'renderer/store/useStore';
import { deserializePlainText } from '../writer/serialize';
import { findItemDeep } from './TreeView/utilities';

const editorId = '1';

const BasicWriterComp = () => {
  const editableProps = {
    style: {
      width: '100%',
    },
    spellCheck: false,
  };

  const activeSectionId = useStore((state) => state.activeSectionId);
  const editor = usePlateEditorRef();

  // const plugins = createPlugins(
  //   [
  //     createParagraphPlugin(),
  //     createBlockquotePlugin(),
  //     createHeadingPlugin(),
  //     createBoldPlugin(),
  //     createItalicPlugin(),
  //     createUnderlinePlugin(),
  //     createStrikethroughPlugin(),
  //     createCodePlugin(),
  //     createAutoformatPlugin(autoFormatPluginOptions),
  //     createExitBreakPlugin(exitBreakPluginOptions),
  //     createDeserializeMdPlugin(),
  //     createResetNodePlugin(resetNodePluginOptions),
  //     createSoftBreakPlugin(softBreakPluginOptions),
  //   ],
  //   {
  //     components: withStyledPlaceholders(createPlateUI(plateUiOverrides)),
  //   }
  // );

  useEffect(() => {
    if (activeSectionId != '') {
      console.log(activeSectionId);
      const { content } = useStore.getState();
      const sectionContent = findItemDeep(content, activeSectionId)?.content;
      console.log(sectionContent);
      if (sectionContent) {
        console.log('yes');
        const nodes = deserializePlainText(sectionContent);
        Transforms.select(editor, []);
        editor.children = nodes;
      }
    }
  });

  return (
    <ScrollContainer>
      <Plate
        id={editorId}
        editableProps={editableProps}
        // plugins={plugins}
        initialValue={[
          {
            type: 'p',
            children: [
              {
                text: '',
              },
            ],
          },
        ]}
      />
    </ScrollContainer>
  );
};

const BasicWriter = () => {
  return (
    <PlateProvider id={editorId}>
      <BasicWriterComp />
    </PlateProvider>
  );
};

export default BasicWriter;
