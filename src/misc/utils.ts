export const randomNumberBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const getUnique = <T>(items: T[]) => [...new Set<T>(items)];
