export const randomNumberBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const getUnique = <T>(items: T[]) => [...new Set<T>(items)];

/**
 * Calculates the hex code between two values.
 *
 * https://chat.openai.com/share/bb83fcdd-39da-4924-b84a-0ac24d6b608f
 *
 * @param startHex e.g. "#FFFFFF00" with opacity value
 * @param endHex e.g. "#000000FF" with opacity value
 * @param value between 0 and 1
 * @returns the hex code between startHex and endHex
 */
export function getIntermediateHex(
  startHex: string,
  endHex: string,
  value: number
): string {
  const clampedValue = Math.min(1, value);

  const startColor = hexToRGB(startHex);
  const endColor = hexToRGB(endHex);

  const r1 = startColor.r;
  const g1 = startColor.g;
  const b1 = startColor.b;
  const a1 = startColor.a;

  const r2 = endColor.r;
  const g2 = endColor.g;
  const b2 = endColor.b;
  const a2 = endColor.a;

  const r = Math.round(r1 + (r2 - r1) * clampedValue);
  const g = Math.round(g1 + (g2 - g1) * clampedValue);
  const b = Math.round(b1 + (b2 - b1) * clampedValue);
  const a = Math.round(a1 + (a2 - a1) * clampedValue);

  const intermediateHex = rgbToHex(r, g, b, a);

  return intermediateHex;
}

function hexToRGB(hex: string) {
  const parsedHex = hex.replace(
    /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i,
    (m, r, g, b, a) => {
      if (a) {
        return `#${r}${r}${g}${g}${b}${b}${a}${a}`;
      } else {
        return `#${r}${r}${g}${g}${b}${b}`;
      }
    }
  );

  const result =
    parsedHex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i) ??
    [];
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  const a = result[4] ? parseInt(result[4], 16) : 255;

  return { r, g, b, a };
}

function rgbToHex(r: number, g: number, b: number, a: number): string {
  const hexR = r.toString(16).padStart(2, "0");
  const hexG = g.toString(16).padStart(2, "0");
  const hexB = b.toString(16).padStart(2, "0");
  const hexA = a.toString(16).padStart(2, "0");

  return `#${hexR}${hexG}${hexB}${hexA}`;
}
