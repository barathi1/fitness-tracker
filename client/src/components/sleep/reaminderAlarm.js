// ReminderApp.js
import React, { useState, useRef, useEffect } from "react";




const ReminderApp = ({ reminders }) => {
  const [activeReminders, setActiveReminders] = useState({});
  const timeoutRefs = useRef({});
  const alarmSound = useRef(new Audio("https://dl.prokerala.com/downloads/ringtones/files/mp3/twirling-intime-lenovo-k8-note-alarm-tone-41440.mp3"));

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    reminders?.forEach((reminder) => {
      if (!activeReminders[reminder.id]) {
        setReminder(reminder);
      }
    });

    return () => {
      Object.values(timeoutRefs.current).forEach(clearTimeout);
    };
  }, [reminders]);

  const setReminder = (reminder) => {
    const delay = new Date(reminder.time).getTime() - Date.now();
    if (delay < 0) return;

    timeoutRefs.current[reminder.id] = setTimeout(() => {
      alarmSound.current.play().catch(err => console.error("Audio play error:", err));
      if (Notification.permission === "granted") {
        new Notification("Reminder", { body: reminder.title });
      }
      alert(`Reminder: ${reminder.title}`);
    }, delay);

    setActiveReminders((prev) => ({ ...prev, [reminder.id]: true }));
  };

  const stopReminder = (id) => {
    if (timeoutRefs.current[id]) {
      clearTimeout(timeoutRefs.current[id]);
      delete timeoutRefs.current[id];
    }

    if (!alarmSound.current.paused) {
      alarmSound.current.pause();
      alarmSound.current.currentTime = 0;
    }

    setActiveReminders((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  return (
    <div>
      <h3>Active Reminders</h3>
      {reminders?.length > 0 ? (
        reminders?.map((reminder) => (
          <div key={reminder.id}>
            <h4>{reminder.title}</h4>
            {activeReminders[reminder.id] ? (
              <button onClick={() => stopReminder(reminder.id)} style={{ backgroundColor: "red", color: "white" }}>Stop</button>
            ) : (
              <p>Reminder set for {new Date(reminder.time).toLocaleTimeString()}</p>
            )}
          </div>
        ))
      ) : (
        <p>No reminders found.</p>
      )}
    </div>
  );
};

export default ReminderApp;
