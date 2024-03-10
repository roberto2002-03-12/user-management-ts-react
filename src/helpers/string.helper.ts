
export const truncateString = (word: string, maxLenght?: number) => {
  const truncated = word.length > (maxLenght === undefined ? 32 : maxLenght) ? word.substring(0, (maxLenght === undefined ? 30 : maxLenght)) + '...' : word;
  return truncated;
};