// useCountdown.ts
import { useState, useEffect, useRef } from 'react';

interface TimeLeft {
  hours: number;
  minutes: number;
  isExpired: boolean;
}

const useCountdown = (targetDate: string): TimeLeft => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const calculateTimeLeft = (): TimeLeft => {
    if (!targetDate) {
      return { hours: 0, minutes: 0, isExpired: true };
    }

    const difference =
      +new Date(targetDate) + 24 * 60 * 60 * 1000 - +new Date();

    if (difference > 0) {
      return {
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        isExpired: false,
      };
    }

    return { hours: 0, minutes: 0, isExpired: true };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    if (!timeLeft.isExpired) {
      intervalRef.current = setInterval(() => {
        const newTimeLeft = calculateTimeLeft();
        setTimeLeft(newTimeLeft);

        if (newTimeLeft.isExpired && intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }, 60000); // Actualiza cada minuto (60000 ms)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [targetDate]);

  return timeLeft;
};

export default useCountdown;
