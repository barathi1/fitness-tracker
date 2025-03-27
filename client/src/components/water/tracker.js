import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Button, CircularProgress, Snackbar } from "@mui/material";
import "./WaterTracker.css";

const WaterTracker = () => {
  const [waterCount, setWaterCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const userId = JSON.parse(localStorage.getItem("user"))?._id || "testUser";

  useEffect(() => {
    fetchWaterIntake();
  }, []);

  const fetchWaterIntake = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/water/${userId}`);
      setWaterCount(response.data.waterCount);
    } catch (error) {
      console.error("Error fetching water intake", error);
    }
    setLoading(false);
  };

  const addWater = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3001/api/water", { userId });
      setWaterCount(response.data.waterCount);
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error adding water", error);
    }
    setLoading(false);
  };

  const resetWater = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`/api/water/reset/${userId}`);
      setWaterCount(response.data.waterCount);
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error resetting water intake", error);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm" className="tracker-container">
      <Typography variant="h4" className="title">Water Intake Tracker</Typography>
      <div className="bottle-container">
        <div className="bottle">
          <div className="water" style={{ height: `${(waterCount / 8) * 100}%` }}></div>
        </div>
      </div>
      <Typography variant="h6" className="intake-text">
        Today's Intake: {loading ? <CircularProgress size={20} /> : `${waterCount} / 8`}
      </Typography>
      <Button variant="contained" color="primary" onClick={addWater} disabled={loading || waterCount >= 8} className="action-button">
        Add Water
      </Button>
      <Button variant="outlined" color="secondary" onClick={resetWater} disabled={loading || waterCount === 0} className="action-button">
        Reset
      </Button>
      <Snackbar open={Boolean(message)} autoHideDuration={3000} onClose={() => setMessage("")} message={message} />
    </Container>
  );
};

export default WaterTracker;
