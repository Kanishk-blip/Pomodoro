// src/components/SessionCounter.jsx
import { memo } from 'react';

function SessionCounter({ completedSessions, sessionsBeforeLongBreak }) {
  // Create an array representing the session markers
  const sessionMarkers = Array.from({ length: sessionsBeforeLongBreak }, (_, index) => {
    const isCompleted = (completedSessions % sessionsBeforeLongBreak) > index || 
                        (completedSessions > 0 && (completedSessions % sessionsBeforeLongBreak) === 0 && index === sessionsBeforeLongBreak - 1);
    return isCompleted;
  });
  
  return (
    <div className="session-counter">
      <p className="session-count">
        Sessions: {Math.floor(completedSessions / sessionsBeforeLongBreak)}{' '}
        <span className="session-cycle">
          ({(completedSessions % sessionsBeforeLongBreak) || sessionsBeforeLongBreak}/{sessionsBeforeLongBreak})
        </span>
      </p>
      
      <div className="session-markers" aria-label={`${(completedSessions % sessionsBeforeLongBreak) || sessionsBeforeLongBreak} of ${sessionsBeforeLongBreak} sessions completed in current cycle`}>
        {sessionMarkers.map((isCompleted, index) => (
          <div 
            key={index} 
            className={`marker ${isCompleted ? 'completed' : ''}`}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}

export default memo(SessionCounter);