import words from './words-data.json';
import { randomNumberBetween } from '../misc/utils';

const WORDS_LENGTH = words.length;

export const TARGET_LENGTH = 5;

export const getRandomWord = (): Promise<string> => {
  const index = randomNumberBetween(0, WORDS_LENGTH - 1);

  return new Promise((resolve) =>
    setTimeout(() => resolve(words[index].toUpperCase()), 1000)
  );
};
