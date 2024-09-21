import { Attempt } from "@/components/Game/types";
import { TargetSegments, stringifyTargetSegments } from "@/services/segments";
import { getAttemptsValues } from "@/services/utils";

export const checkDidSucceed = (
  attempts: Attempt[],
  targetSegments: TargetSegments
) => {
  const attemptsValues = getAttemptsValues(attempts);
  const target = stringifyTargetSegments(targetSegments);

  const lastAttempt = attemptsValues.length
    ? attemptsValues[attempts.length - 1]
    : undefined;

  return !!lastAttempt && lastAttempt === target;
};

export const checkIsComplete = (
  attemptSegments: TargetSegments,
  targetSegments: TargetSegments
) => {
  const attempt = stringifyTargetSegments(attemptSegments);
  const target = stringifyTargetSegments(targetSegments);
  return attempt.length === target.length;
};
