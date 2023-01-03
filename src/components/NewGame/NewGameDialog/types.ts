import { MouseEvent } from "react";

export type ChangeHandler<ValueType> = (
  event: MouseEvent<HTMLElement>,
  value: ValueType | null
) => void;
