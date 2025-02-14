import React, { useState } from "react";
import { Container, Row, Col, Card, ProgressBar, Button } from "react-bootstrap";
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
import "bootstrap/dist/css/bootstrap.min.css";
import "./SleepTracker.css";

// Register Chart.js elements
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Title);

const SleepTracker = () => {
  const sleepData = [6, 7, 5, 8, 7.5, 6.5, 8]; // Sleep hours for last 7 days
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const [Adjust,setadjust]=useState(5)

  const adjusting= ()=>{
    setadjust(Adjust+5)
  }

  const reset= ()=>{
      setadjust(5)
  }


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

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Weekly Sleep Patterns",
        font: { size: 18 },
      },
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: { min: 4, max: 10, ticks: { stepSize: 1 } },
    },
  };

  return (
    <div className="sleep-tracker">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="text-center text-white">Sleep Tracker</h1>
        <p className="text-center text-light">Monitor your sleep & improve rest quality</p>
      </div>

      <Container>
        <Row className="mt-4">
          {/* Sleep Goal Progress */}
          <Col md={6}>
            <Card className="shadow-lg p-4 sleep-card">
              <h4 className="text-primary">Weekly Sleep Goal</h4>
              <ProgressBar now={Adjust} animated striped label= {Adjust+"%"}className="mb-3" />
              <p>Your goal: <strong>8 hours per night</strong></p>
              <Button variant="primary" onClick={adjusting}>Adjust Goal</Button>
              <br/>
              <Button variant="warning" onClick={reset}>reset Goal</Button>
            </Card>
          </Col>

          {/* Sleep Analytics */}
          <Col md={6}>
            <Card className="shadow-lg p-4 sleep-card">
              <h4 className="text-success">Sleep Analytics</h4>
              <div style={{ height: "300px" }}>
                <Line data={chartData} options={chartOptions} />
              </div>
            </Card>
          </Col>
        </Row>

        {/* Sleep History */}
        <Row className="mt-4">
          <Col md={12}>
            <h3 className="text-center mb-3 text-dark">Recent Sleep Data</h3>
          </Col>

          {sleepData.map((hours, index) => (
            <Col md={4} key={index}>
              <Card className="sleep-card shadow text-center p-3">
                <Card.Body>
                  <h5 className="text-secondary">{labels[index]}</h5>
                  <p><strong>{hours} hours</strong></p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default SleepTracker;
