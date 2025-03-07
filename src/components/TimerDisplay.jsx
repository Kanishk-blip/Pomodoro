// src/components/TimerDisplay.jsx
import { memo } from 'react';

function TimerDisplay({ timeLeft }) {
  // Convert seconds to minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  // Format with leading zeros
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  return (
    <div className="timer-display" aria-live="polite">
      <span className="time">{formattedTime}</span>
    </div>
  );
}

export default memo(TimerDisplay);