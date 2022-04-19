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
  [ReadOnlySegmentValue.Multiply.toString()]: "X",
};

export const isWriteableSegment = ({ type }: TargetSegment) =>
  type === SegmentType.Writeable;

export const stringifyTargetSegments = (targetSegments: TargetSegments) =>
  targetSegments.map(({ value }) => value).join("");
