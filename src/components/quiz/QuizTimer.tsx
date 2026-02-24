import { useState, useEffect, useRef } from 'react';
import { Timer } from 'lucide-react';
import { Progress } from '../ui/Progress';
import { cn } from '../../lib/utils';

interface QuizTimerProps {
  duration: number; // in seconds
  onTimeout: () => void;
  isPaused: boolean;
}

export function QuizTimer({ duration, onTimeout, isPaused }: QuizTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (isPaused || timeLeft <= 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current!);
          onTimeout();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft, onTimeout, isPaused, duration]);

  const progress = (timeLeft / duration) * 100;

  return (
    <div className="flex items-center gap-2 w-48">
      <Timer className="h-5 w-5 text-primary" />
      <div className="flex-1">
        <Progress
          value={progress}
          className={cn(timeLeft <= 5 && timeLeft > 0 && 'bg-destructive/20')}
          indicatorClassName={cn(timeLeft <= 5 && timeLeft > 0 && 'bg-destructive')}
        />
      </div>
      <span
        className={cn(
          'font-mono text-lg font-bold w-12 text-right transition-colors',
          timeLeft <= 5 && timeLeft > 0 && 'text-destructive animate-pulse',
        )}
      >
        {timeLeft}s
      </span>
    </div>
  );
}
