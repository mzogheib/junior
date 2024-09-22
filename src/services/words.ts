import wordsData05 from "services/words-data/05-letters/003.json";
import wordsData06 from "services/words-data/06-letters/001.json";
import { randomNumberBetween } from "misc/utils";
import {
  parseTarget,
  stringifyTargetSegments,
  TargetSegments,
} from "services/segments";
import { WordLength } from "components/Game/types";

type WordsData = {
  source: string;
  words: string[];
};

const wordsDataMap: Record<number, WordsData> = {
  [WordLength.Five]: wordsData05,
  [WordLength.Six]: wordsData06,
};

const getWords = (length: number) => {
  const { words } = wordsDataMap[length] ?? wordsDataMap[WordLength.Five];

  return words;
};

export const getRandomWord = (length: number = WordLength.Five) => {
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
    return "Not in word list";
  }
};
