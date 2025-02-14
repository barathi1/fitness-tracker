import React, { useState } from "react";
import { Container, Card, Button, ProgressBar, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const WaterTracker = () => {
  const dailyGoal = 8; // Daily goal: 8 glasses
  const [waterCount, setWaterCount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const addWater = () => {
    if (waterCount < dailyGoal) {
      setWaterCount(waterCount + 1);
    }
    if (waterCount + 1 === dailyGoal) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const resetWater = () => {
    setWaterCount(0);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="text-center p-4 shadow-lg water-card">
        <Card.Body>
          <h2 className="mb-4 text-primary">💧 Water Tracker</h2>
          <h5>Stay Hydrated, Stay Healthy!</h5>

          <ProgressBar
            now={(waterCount / dailyGoal) * 100}
            label={`${waterCount}/${dailyGoal} glasses`}
            className="my-4"
            variant="info"
            animated
          />

          {showAlert && (
            <Alert variant="success" className="mt-3">
              🎉 Great job! You've reached your daily water goal!
            </Alert>
          )}

          <div className="d-flex justify-content-center gap-3">
            <Button variant="primary" onClick={addWater} disabled={waterCount >= dailyGoal}>
              + Add Water
            </Button>
            <Button variant="danger" onClick={resetWater}>
              Reset
            </Button>
          </div>

          <Card.Footer className="mt-3 text-muted">
            💡 Drinking enough water helps improve energy & focus!
          </Card.Footer>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default WaterTracker;
