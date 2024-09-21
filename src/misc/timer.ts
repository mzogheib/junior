import { useState, useRef, useEffect } from "react";

/**
 * Based on https://chat.openai.com/share/9d532145-856a-4b2d-9fda-1b9ac5e52dce
 * and others
 * @returns
 */
export const useStopwatch = () => {
  const startTime = useRef<number>();
  const [time, setTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const delay = 100;

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const start = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (startTime.current === undefined) {
      startTime.current = Date.now();
    }

    intervalRef.current = setInterval(() => {
      if (startTime.current === undefined) return;

      const currentTime = Date.now();
      setTime(currentTime - startTime.current);
    }, delay);
  };

  const stop = () => {
    if (!intervalRef.current) return;

    clearInterval(intervalRef.current);
  };

  return { time, start, stop };
};
