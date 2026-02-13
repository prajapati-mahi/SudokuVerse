import { useEffect } from "react";

export default function useTimer(
  isPaused,
  isGameOver,
  isGameWon,
  setTimeElapsed
) {
  useEffect(() => {
    if (isPaused || isGameOver || isGameWon) return;

    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, isGameOver, isGameWon, setTimeElapsed]);
}
