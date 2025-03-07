// src/components/TimerControls.jsx
import { memo } from 'react';

function TimerControls({ isRunning, onStart, onPause, onReset, onSkip }) {
  return (
    <div className="timer-controls">
      {!isRunning ? (
        <button 
          className="control-button start" 
          onClick={onStart}
          aria-label="Start timer"
        >
          Start
        </button>
      ) : (
        <button 
          className="control-button pause" 
          onClick={onPause}
          aria-label="Pause timer"
        >
          Pause
        </button>
      )}
      
      <button 
        className="control-button reset" 
        onClick={onReset}
        aria-label="Reset timer"
      >
        Reset
      </button>
      
      <button 
        className="control-button skip" 
        onClick={onSkip}
        aria-label="Skip to next session"
      >
        Skip
      </button>
    </div>
  );
}

export default memo(TimerControls);