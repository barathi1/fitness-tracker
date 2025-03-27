import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { FaDumbbell, FaAppleAlt, FaWater, FaBed, FaChartLine } from "react-icons/fa";

const API_URL = "http://localhost:3001/api/progress"; // Change this to your deployed backend URL if needed

const ProgressAnalytics = () => {
  const [progressData, setProgressData] = useState([]);
  const [caloriesData, setCaloriesData] = useState([]);
  const [weightData, setWeightData] = useState([]);

  useEffect(() => {
    fetchProgressData();
  }, []);

  const fetchProgressData = async () => {
    try {
      const response = await axios.get(API_URL);
      setProgressData(response.data);

      // Convert response data to match chart format
      const formattedCaloriesData = response.data.map((entry, index) => ({
        name: `Day ${index + 1}`,
        calories: entry.caloriesBurned,
      }));

      const formattedWeightData = response.data.map((entry, index) => ({
        day: `Week ${index + 1}`,
        weight: 80 - index * 2, // Example weight loss trend (modify based on actual data)
      }));

      setCaloriesData(formattedCaloriesData);
      setWeightData(formattedWeightData);
    } catch (error) {
      console.error("Error fetching progress data:", error);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4" style={{ color: "#007bff", fontWeight: "bold" }}>
        <FaChartLine /> Progress Analytics
      </h2>

      <Row className="g-4">
        <Col md={3}>
          <Card className="shadow-lg text-center border-primary">
            <Card.Body>
              <FaDumbbell size={50} color="#007bff" />
              <h5 className="mt-2">Workouts</h5>
              <p className="text-muted">Calories Burned: {progressData.reduce((acc, entry) => acc + entry.caloriesBurned, 0)}+</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-lg text-center border-success">
            <Card.Body>
              <FaAppleAlt size={50} color="green" />
              <h5 className="mt-2">Nutrition</h5>
              <p className="text-muted">Healthy Meals: {progressData.reduce((acc, entry) => acc + entry.healthyMeals, 0)}+</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-lg text-center border-info">
            <Card.Body>
              <FaWater size={50} color="#17a2b8" />
              <h5 className="mt-2">Hydration</h5>
              <p className="text-muted">Water Intake: {progressData.reduce((acc, entry) => acc + entry.waterIntake, 0)}L+</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-lg text-center border-warning">
            <Card.Body>
              <FaBed size={50} color="#ffc107" />
              <h5 className="mt-2">Sleep</h5>
              <p className="text-muted">Avg Sleep: {progressData.length > 0 ? (progressData.reduce((acc, entry) => acc + entry.sleepHours, 0) / progressData.length).toFixed(1) : 0} hrs</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          <Card className="shadow-lg">
            <Card.Body>
              <h5 className="text-center">Calories Burned This Week</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={caloriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="calories" fill="#007bff" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-lg">
            <Card.Body>
              <h5 className="text-center">Weight Progress</h5>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="weight" stroke="green" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProgressAnalytics;
