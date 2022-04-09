import words from "./words-data/05-letters.json";
import { randomNumberBetween } from "../misc/utils";

const WORDS_LENGTH = words.length;

export const getRandomWord = (): Promise<string> => {
  const index = randomNumberBetween(0, WORDS_LENGTH - 1);

  return new Promise((resolve) =>
    setTimeout(() => resolve(words[index].toUpperCase()), 125)
  );
};

// Perhaps the JSON import should have a type definition
export const isValidWord = (word: string) =>
  (words as string[]).map((w) => w.toUpperCase()).includes(word);
