// Assign a CSS class based on a rule's category ID
export const getCategoryClassName = (categoryId: string) => {
  switch (categoryId) {
    case 'COLLOQUIALISMS':
    case 'REDUNDANCY':
    case 'STYLE':
      return 'lt-style';
    case 'PUNCTUATION':
    case 'TYPOS':
      return 'lt-major';
    default:
      return 'lt-minor';
  }
};
