import { useState, useEffect } from 'react';
import useStore from 'renderer/store/useStore';
import { Sections } from 'types/types';

export const useBookWordCount = () => {
  const content = useStore((state) => state.content);
  const [wordCount, setWordCount] = useState(0);

  const calculateWordCount = (sections: Sections): number => {
    let wordCount = 0;
    sections.forEach((section) => {
      if (section.type === 'folder') {
        wordCount += calculateWordCount(section.children);
      } else {
        wordCount += section.content.split(/\s+/).length;
      }
    });
    return wordCount;
  };

  useEffect(() => {
    setWordCount(calculateWordCount(content));
  }, [content]);

  return wordCount;
};
