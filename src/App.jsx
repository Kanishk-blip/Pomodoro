// src/App.jsx
import { useState, useEffect, useRef } from 'react';
import './App.css';
import TimerDisplay from './components/TimerDisplay';
import TimerControls from './components/TimerControls';
import SessionCounter from './components/SessionCounter';
import SettingsModal from './components/SettingsModal';
import alarmSound from './assets/alarm.mp3';

function App() {
  // Timer settings
  const [settings, setSettings] = useState({
    workTime: 25 * 60, // 25 minutes in seconds
    shortBreakTime: 5 * 60, // 5 minutes in seconds
    longBreakTime: 15 * 60, // 15 minutes in seconds
    sessionsBeforeLongBreak: 4
  });
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState(settings.workTime);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState('work'); // 'work', 'shortBreak', 'longBreak'
  const [completedSessions, setCompletedSessions] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  
  // Audio reference
  const audioRef = useRef(null);
  
  // Timer interval reference
  const timerRef = useRef(null);
  
  // Effect to handle timer countdown
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            handleSessionComplete();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    
    return () => clearInterval(timerRef.current);
  }, [isRunning]);
  
  // Handle session completion
  const handleSessionComplete = () => {
    // Play sound
    audioRef.current.play();
    
    if (sessionType === 'work') {
      // Increment completed sessions
      const newCompletedSessions = completedSessions + 1;
      setCompletedSessions(newCompletedSessions);
      
      // Determine if it should be a short break or long break
      if (newCompletedSessions % settings.sessionsBeforeLongBreak === 0) {
        setSessionType('longBreak');
        setTimeLeft(settings.longBreakTime);
      } else {
        setSessionType('shortBreak');
        setTimeLeft(settings.shortBreakTime);
      }
    } else {
      // After any break, go back to work session
      setSessionType('work');
      setTimeLeft(settings.workTime);
    }
    
    // Auto-start next session
    setIsRunning(true);
  };
  
  // Timer controls
  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    
    // Reset to current session type's time
    if (sessionType === 'work') {
      setTimeLeft(settings.workTime);
    } else if (sessionType === 'shortBreak') {
      setTimeLeft(settings.shortBreakTime);
    } else {
      setTimeLeft(settings.longBreakTime);
    }
  };
  
  // Skip to next session
  const skipToNext = () => {
    setIsRunning(false);
    
    if (sessionType === 'work') {
      const newCompletedSessions = completedSessions + 1;
      setCompletedSessions(newCompletedSessions);
      
      if (newCompletedSessions % settings.sessionsBeforeLongBreak === 0) {
        setSessionType('longBreak');
        setTimeLeft(settings.longBreakTime);
      } else {
        setSessionType('shortBreak');
        setTimeLeft(settings.shortBreakTime);
      }
    } else {
      setSessionType('work');
      setTimeLeft(settings.workTime);
    }
  };
  
  // Save settings
  const saveSettings = (newSettings) => {
    setSettings(newSettings);
    
    // Update current timer if needed
    if (sessionType === 'work') {
      setTimeLeft(newSettings.workTime);
    } else if (sessionType === 'shortBreak') {
      setTimeLeft(newSettings.shortBreakTime);
    } else {
      setTimeLeft(newSettings.longBreakTime);
    }
    
    setShowSettings(false);
  };
  
  return (
    <div className={`app ${sessionType}`}>
      <header>
        <h1>Pomodoro Timer</h1>
        <button 
          className="settings-button" 
          onClick={() => setShowSettings(true)}
          aria-label="Settings"
        >
          ⚙️
        </button>
      </header>
      
      <main>
        <div className="session-info">
          <h2>
            {sessionType === 'work' 
              ? 'Work Session' 
              : sessionType === 'shortBreak' 
                ? 'Short Break' 
                : 'Long Break'}
          </h2>
        </div>
        
        <TimerDisplay timeLeft={timeLeft} />
        
        <TimerControls 
          isRunning={isRunning} 
          onStart={startTimer} 
          onPause={pauseTimer} 
          onReset={resetTimer}
          onSkip={skipToNext}
        />
        
        <SessionCounter 
          completedSessions={completedSessions} 
          sessionsBeforeLongBreak={settings.sessionsBeforeLongBreak} 
        />
      </main>
      
      {showSettings && (
        <SettingsModal 
          settings={settings} 
          onSave={saveSettings} 
          onClose={() => setShowSettings(false)} 
        />
      )}
      
      <audio ref={audioRef} src={alarmSound}></audio>
    </div>
  );
}

export default App;