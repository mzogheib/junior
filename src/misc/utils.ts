import { useEffect, useRef } from 'react';

export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const randomNumberBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);
