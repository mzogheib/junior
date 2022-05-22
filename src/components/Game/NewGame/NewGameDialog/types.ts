export type ChangeHandler<ValueType> = (
  event: React.MouseEvent<HTMLElement>,
  value: ValueType | null
) => void;
