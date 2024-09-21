import { getUnique } from "@/misc/utils";

export enum SegmentType {
  Writeable = "writeable",
  ReadOnly = "readOnly",
}

export enum ReadOnlySegmentValue {
  Add = "+",
  Subtract = "-",
  Multiply = "*",
  Equals = "=",
}

type WriteableSegment = {
  type: SegmentType.Writeable;
  value: string;
};

type ReadOnlySegment = {
  type: SegmentType.ReadOnly;
  value: ReadOnlySegmentValue;
};

type TargetSegment = WriteableSegment | ReadOnlySegment;

export type TargetSegments = TargetSegment[];

export const READ_ONLY_CHARACTERS =
  Object.values(ReadOnlySegmentValue).map(String);

export const CHARACTER_DISPLAY_MAP = {
  [ReadOnlySegmentValue.Multiply.toString()]: "×",
};

export const isWriteableSegment = ({ type }: TargetSegment) =>
  type === SegmentType.Writeable;

export const getWriteableSegments = (segments: TargetSegments) =>
  segments.filter(({ value }) => !READ_ONLY_CHARACTERS.includes(value));

export const isReadOnlySegment = ({ type }: TargetSegment) =>
  type === SegmentType.ReadOnly;

const getSegmentValues = (targetSegments: TargetSegments) =>
  targetSegments.map(({ value }) => value);

export const stringifyTargetSegments = (targetSegments: TargetSegments) =>
  getSegmentValues(targetSegments).join("");

export const getUniqueSegmentValueChars = (targetSegments: TargetSegments) =>
  getUnique(stringifyTargetSegments(targetSegments).split(""));

export const parseTarget = (target: string): TargetSegments =>
  target.split("").map((value) => {
    if (READ_ONLY_CHARACTERS.includes(value)) {
      return {
        type: SegmentType.ReadOnly,
        value: value as ReadOnlySegmentValue,
      };
    }

    return {
      type: SegmentType.Writeable,
      value,
    };
  });

export const getStartEndOfSegment = (
  targetSegments: TargetSegments,
  segmentIndex: number
) => {
  const prevSegments = targetSegments
    .slice(0, segmentIndex)
    .filter(isWriteableSegment);
  const prevSegmentsString = stringifyTargetSegments(prevSegments);
  const prevSegmentsStringLength = prevSegmentsString.length;
  const segmentValueLength = targetSegments[segmentIndex].value.length;

  const start = prevSegmentsStringLength;
  const end = prevSegmentsStringLength + segmentValueLength;

  return [start, end];
};

export const getSegmentValueFromInput = (
  inputValue: string,
  targetSegments: TargetSegments,
  segmentIndex: number
) => {
  const [start, end] = getStartEndOfSegment(targetSegments, segmentIndex);
  return inputValue.slice(start, end);
};

export const makeAttemptSegments = (
  inputValue: string,
  targetSegments: TargetSegment[]
): TargetSegments =>
  targetSegments.map((segment, index) => {
    if (segment.type === SegmentType.ReadOnly) {
      return segment;
    }

    return {
      ...segment,
      value: getSegmentValueFromInput(inputValue, targetSegments, index),
    };
  });

export const replaceSegmentValues = (
  targetSegments: TargetSegment[],
  newValue: string
): TargetSegment[] =>
  targetSegments.map((segment) => {
    if (segment.type === SegmentType.ReadOnly) return segment;

    const value = segment.value
      .split("")
      .map((_) => newValue)
      .join("");

    return { ...segment, value };
  });
