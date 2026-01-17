const PREFIX = "junior_";

export const storage = {
  set: (key: string, value: string) =>
    localStorage.setItem(`${PREFIX}${key}`, value),
  get: (key: string) => localStorage.getItem(`${PREFIX}${key}`),
  remove: (key: string) => localStorage.removeItem(`${PREFIX}${key}`),
};
