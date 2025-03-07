// src/components/SettingsModal.jsx
import { useState } from 'react';

function SettingsModal({ settings, onSave, onClose }) {
  // Convert seconds to minutes for the form fields
  const [formValues, setFormValues] = useState({
    workTime: settings.workTime / 60,
    shortBreakTime: settings.shortBreakTime / 60,
    longBreakTime: settings.longBreakTime / 60,
    sessionsBeforeLongBreak: settings.sessionsBeforeLongBreak
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: parseInt(value, 10) || 0
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert minutes back to seconds for time values
    onSave({
      workTime: formValues.workTime * 60,
      shortBreakTime: formValues.shortBreakTime * 60,
      longBreakTime: formValues.longBreakTime * 60,
      sessionsBeforeLongBreak: formValues.sessionsBeforeLongBreak
    });
  };
  
  return (
    <div className="modal-overlay">
      <div className="settings-modal" role="dialog" aria-labelledby="settings-title">
        <h2 id="settings-title">Timer Settings</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="workTime">Work Session (minutes):</label>
            <input
              type="number"
              id="workTime"
              name="workTime"
              min="1"
              max="60"
              value={formValues.workTime}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="shortBreakTime">Short Break (minutes):</label>
            <input
              type="number"
              id="shortBreakTime"
              name="shortBreakTime"
              min="1"
              max="30"
              value={formValues.shortBreakTime}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="longBreakTime">Long Break (minutes):</label>
            <input
              type="number"
              id="longBreakTime"
              name="longBreakTime"
              min="5"
              max="60"
              value={formValues.longBreakTime}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="sessionsBeforeLongBreak">Sessions before Long Break:</label>
            <input
              type="number"
              id="sessionsBeforeLongBreak"
              name="sessionsBeforeLongBreak"
              min="1"
              max="10"
              value={formValues.sessionsBeforeLongBreak}
              onChange={handleChange}
            />
          </div>
          
          <div className="modal-buttons">
            <button type="submit" className="save-button">Save</button>
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SettingsModal;