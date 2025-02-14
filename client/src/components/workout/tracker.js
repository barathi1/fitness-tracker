import React, { useState } from "react";
import { Container, Card, Button, ProgressBar, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const workouts = [
  { name: "Cardio", icon: "bi-heart-pulse", duration: "30 mins", calories: 250 },
  { name: "Strength", icon: "bi-dumbbell", duration: "45 mins", calories: 400 },
  { name: "Yoga", icon: "bi-flower1", duration: "60 mins", calories: 180 },
];

const WorkoutTracker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [progress, setProgress] = useState(50); // Example progress value

  return (
    <Container className="mt-5">
      <h2 className="text-center fw-bold text-primary">🏋️‍♂️ Workout Tracker</h2>
      <p className="text-center text-muted">Log and track your fitness activities</p>

      {/* Date Picker */}
      <div className="d-flex justify-content-center my-3">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="form-control text-center"
          dateFormat="MMMM d, yyyy"
        />
      </div>

      {/* Progress Bar */}
      <div className="text-center mb-4">
        <h5>Weekly Progress</h5>
        <ProgressBar animated now={progress} label={`${progress}%`} variant="success" />
      </div>

      {/* Workout Cards */}
      <div className="row">
        {workouts.map((workout, index) => (
          <div className="col-md-4" key={index}>
            <Card className="mb-4 shadow-lg border-0 workout-card">
              <Card.Body className="text-center">
                <i className={`bi ${workout.icon} display-4 text-primary`}></i>
                <Card.Title className="mt-2">{workout.name}</Card.Title>
                <Card.Text>{workout.duration} | {workout.calories} kcal</Card.Text>
                <Button variant="primary" className="btn-hover">Log Workout</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default WorkoutTracker;
