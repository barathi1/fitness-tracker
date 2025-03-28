// ReminderApp.js
import React, { useState, useRef, useEffect } from "react";

import "./SleepTracker.css"

import { motion } from "framer-motion";
import { BsBellFill, BsX } from "react-icons/bs"; 


const ReminderApp = ({ reminders }) => {
  const [activeReminders, setActiveReminders] = useState({});
  const timeoutRefs = useRef({});

  function checkConnection() {
    if (navigator.onLine) {
      console.log('Internet connection is stable');
      return true
    } else {
      console.log('No active network connection');
      return false
    }
  }
  


  const alarmSound = useRef(new Audio(  checkConnection()?"https://dl.prokerala.com/downloads/ringtones/files/mp3/twirling-intime-lenovo-k8-note-alarm-tone-41440.mp3":"twirling-intime-lenovo-k8-note-alarm-tone-41440.mp3"));

 

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
   <motion.div
      className="reminder-widget"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="widget-title">🔔 Reminders</h3>
      <div className="reminder-list">
        {reminders?.length > 0 ? (
          reminders?.map((reminder) => (
            <motion.div key={reminder.id} className="reminder-item">
              <BsBellFill className="reminder-icon" />
              <div className="reminder-info">
                <h5>{reminder.title}</h5>
                <p>{new Date(reminder.time).toLocaleTimeString()}</p>
              </div>
              {activeReminders[reminder.id] && (
                <button className="stop-btn" onClick={() => stopReminder(reminder.id)}>
                  <BsX />
                </button>
              )}
            </motion.div>
          ))
        ) : (
          <p className="no-reminders">No active reminders.</p>
        )}
      </div>
    </motion.div>
  );
};

export default ReminderApp;
