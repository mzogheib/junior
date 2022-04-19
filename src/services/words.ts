import wordsData05 from "./words-data/05-letters/001.json";
import wordsData06 from "./words-data/06-letters/001.json";
import { randomNumberBetween } from "../misc/utils";
import {
  parseTarget,
  stringifyTargetSegments,
  TargetSegments,
} from "./segments";

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

export const getRandomWord = (length: number) => {
  const words = getWords(length);
  const WORDS_LENGTH = words.length;
  const index = randomNumberBetween(0, WORDS_LENGTH - 1);
  const word = words[index].toUpperCase();

  return parseTarget(word);
};

export const validateWord = (wordSegments: TargetSegments) => {
  const word = stringifyTargetSegments(wordSegments);
  const words = getWords(word.length);

  const isInWordsList = words.map((w) => w.toUpperCase()).includes(word);

  if (!isInWordsList) {
    return `Not in word list: ${word}`;
  }
};
