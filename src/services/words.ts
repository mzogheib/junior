import words from './words-data.json';

const WORDS_LENGTH = words.length;

const randomNumberBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const getRandomWord = (): Promise<string> => {
  const index = randomNumberBetween(0, WORDS_LENGTH - 1);

  return new Promise((resolve) =>
    setTimeout(() => resolve(words[index].toUpperCase()), 1000)
  );
};
