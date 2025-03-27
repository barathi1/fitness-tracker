import React, { useEffect, useState } from "react";
import { Container, Grid, Card, Typography, Button, CircularProgress, LinearProgress } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import axios from "axios";
import "./SleepTracker.css";

// Register Chart.js elements
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Title);

const SleepTracker = () => {
  const [sleepData, setSleepData] = useState(Array(7).fill(0)); // Default to 0 hours for each day
  const [goalProgress, setGoalProgress] = useState(50);
  const [loading, setLoading] = useState(true);

  const userId = JSON.parse(localStorage.getItem("user"))?._id;

  // Fetch Sleep Data
  const fetchSleepData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/api/sleep/${userId}`);
      const updatedSleepData = Array(7).fill(0);
      data.forEach(entry => {
        const dayIndex = new Date(entry.date).getDay();
        updatedSleepData[dayIndex] = entry.sleepHours;
      });
      setSleepData(updatedSleepData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sleep data:", error);
      setLoading(false);
    }
  };

  // Add Sleep Hours
  const addSleep = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/sleep/", {
        userId,
        sleepHours: 1, // Increase by 1 hour
      });
      fetchSleepData(); // Refresh sleep data after updating
    } catch (error) {
      console.error("Error updating sleep data:", error);
    }
  };

  useEffect(() => {
    if (userId) fetchSleepData();
  }, [userId]);

  const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Sleep Hours",
        data: sleepData,
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "#3498db",
        tension: 0.4,
        pointBackgroundColor: "#3498db",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#ff5733",
        pointHoverRadius: 7,
      },
    ],
  };

  return (
    <div className="sleep-tracker">
      <Container>
        <Typography variant="h3" className="text-center">Sleep Tracker</Typography>
        <Typography variant="subtitle1" className="text-center">Monitor your sleep & improve rest quality</Typography>

        <Grid container spacing={3} className="mt-4">
          <Grid item xs={12} md={6}>
            <Card className="sleep-card shadow-lg p-4">
              <Typography variant="h5" className="text-primary">Weekly Sleep Goal</Typography>
              <LinearProgress variant="determinate" value={goalProgress} className="mb-3" />
              <Typography>Your goal: <strong>8 hours per night</strong></Typography>
              <Button variant="contained" color="primary" onClick={() => setGoalProgress((prev) => Math.min(prev + 10, 100))}>
                Adjust Goal
              </Button>
              <Button variant="contained" color="warning" onClick={() => setGoalProgress(50)}>
                Reset Goal
              </Button>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card className="sleep-card shadow-lg p-4">
              <Typography variant="h5" className="text-success">Sleep Analytics</Typography>
              <div style={{ height: "300px" }}>
                <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3} className="mt-4">
          <Grid item xs={12}>
            <Typography variant="h4" className="text-center mb-3 text-dark">Recent Sleep Data</Typography>
          </Grid>

          {loading ? (
            <CircularProgress color="primary" />
          ) : (
            labels.map((day, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card className="sleep-card shadow text-center p-3">
                  <Typography variant="h6" className="text-secondary">{day}</Typography>
                  <Typography variant="h5"><strong>{sleepData[index]} hours</strong></Typography>
                </Card>
              </Grid>
            ))
          )}
        </Grid>

        <Grid container justifyContent="center" className="mt-4">
          <Button variant="contained" color="success" onClick={addSleep}>
            Add 1 Hour Sleep
          </Button>
        </Grid>
      </Container>
    </div>
  );
};

export default SleepTracker;
