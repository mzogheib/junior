import wordsData05 from "./words-data/05-letters/001.json";
import wordsData06 from "./words-data/06-letters/001.json";
import { randomNumberBetween } from "../misc/utils";

type WordsData = {
  source: string;
  words: string[];
};

const wordsDataMap: Record<number, WordsData> = {
  5: wordsData05,
  6: wordsData06,
};

const getWords = (length: number) => {
  const { words } = wordsDataMap[length] ?? wordsDataMap[5];

  return words;
};

export const getRandomWord = (length: number): Promise<string> => {
  const words = getWords(length);
  const WORDS_LENGTH = words.length;
  const index = randomNumberBetween(0, WORDS_LENGTH - 1);

  return new Promise((resolve) =>
    setTimeout(() => resolve(words[index].toUpperCase()), 125)
  );
};

// Perhaps the JSON import should have a type definition
export const isValidWord = (word: string) => {
  const words = getWords(word.length);

  return words.map((w) => w.toUpperCase()).includes(word);
};
