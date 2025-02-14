import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { FaDumbbell, FaAppleAlt, FaWater, FaBed, FaChartLine } from "react-icons/fa";

const workoutData = [
  { name: "Mon", calories: 500 },
  { name: "Tue", calories: 700 },
  { name: "Wed", calories: 400 },
  { name: "Thu", calories: 600 },
  { name: "Fri", calories: 800 },
  { name: "Sat", calories: 650 },
  { name: "Sun", calories: 750 }
];

const weightData = [
  { day: "Week 1", weight: 80 },
  { day: "Week 2", weight: 78 },
  { day: "Week 3", weight: 77 },
  { day: "Week 4", weight: 75 }
];

const ProgressAnalytics = () => {
  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4" style={{ color: "#007bff", fontWeight: "bold" }}>
        <FaChartLine /> Progress Analytics
      </h2>

      <Row className="g-4">
        {/* Workout Card */}
        <Col md={3}>
          <Card className="shadow-lg text-center border-primary">
            <Card.Body>
              <FaDumbbell size={50} color="#007bff" />
              <h5 className="mt-2">Workouts</h5>
              <p className="text-muted">Calories Burned: 4000+</p>
            </Card.Body>
          </Card>
        </Col>

        {/* Nutrition Card */}
        <Col md={3}>
          <Card className="shadow-lg text-center border-success">
            <Card.Body>
              <FaAppleAlt size={50} color="green" />
              <h5 className="mt-2">Nutrition</h5>
              <p className="text-muted">Healthy Meals: 30+</p>
            </Card.Body>
          </Card>
        </Col>

        {/* Water Intake Card */}
        <Col md={3}>
          <Card className="shadow-lg text-center border-info">
            <Card.Body>
              <FaWater size={50} color="#17a2b8" />
              <h5 className="mt-2">Hydration</h5>
              <p className="text-muted">Water Intake: 25L+</p>
            </Card.Body>
          </Card>
        </Col>

        {/* Sleep Tracker */}
        <Col md={3}>
          <Card className="shadow-lg text-center border-warning">
            <Card.Body>
              <FaBed size={50} color="#ffc107" />
              <h5 className="mt-2">Sleep</h5>
              <p className="text-muted">Avg Sleep: 7.5 hrs</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row className="mt-4">
        <Col md={6}>
          <Card className="shadow-lg">
            <Card.Body>
              <h5 className="text-center">Calories Burned This Week</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={workoutData}>
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
