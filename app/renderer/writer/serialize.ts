type BasicElement = { type: 'paragraph'; children: BasicText[] };
type BasicText = { text: string; bold?: true };

export const deserializePlainText = (str: string): BasicElement[] => {
  var startTime = performance.now();

  let nodes = str.split('\n').map((s: string) => {
    return {
      type: 'paragraph',
      children: [
        {
          text: s,
        },
      ],
    };
  });

  var endTime = performance.now();

  console.log(`deserialize ${endTime - startTime} milliseconds`);

  return nodes;
};
