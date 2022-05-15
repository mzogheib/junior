export const makeDuration = (startedAt: string, finishedAt: string) => {
  if (!startedAt || !finishedAt) {
    return;
  }

  const startedAtTimestamp = Date.parse(startedAt);
  const finishedAtTimestamp = Date.parse(finishedAt);

  if ([startedAtTimestamp, finishedAtTimestamp].includes(NaN)) {
    return;
  }

  if (startedAtTimestamp > finishedAtTimestamp) {
    return;
  }

  const durationInSeconds = Math.round(
    (finishedAtTimestamp - startedAtTimestamp) / 1000
  );
  const durationInMinutes = Math.floor(durationInSeconds / 60);
  const leftOverSeconds = durationInSeconds % 60;

  if (durationInMinutes > 9) {
    return "but you took way too long";
  }

  if (durationInMinutes === 0) {
    return `in ${leftOverSeconds}s`;
  }

  return `in ${durationInMinutes}m and ${leftOverSeconds}s`;
};
