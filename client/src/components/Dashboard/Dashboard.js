import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Dashboard.css";


const Dashboard = () => {
  
  const userdetails =JSON.parse( localStorage.getItem("user"))
  const userName = userdetails.username; // Dynamic name from authentication (Replace with user context)
  
  return (
    <Container fluid className="dashboard-container">
      <h2 className="mt-4 text-center">Welcome, {userName}!</h2>
      
      {/* Statistics Row */}
      <Row className="mt-4">
        {[
          { title: "Workouts", value: "12", color: "primary", icon: "🏋️" },
          { title: "Calories Burned", value: "2,450", color: "danger", icon: "🔥" },
          { title: "Water Intake", value: "3.2L", color: "info", icon: "💧" },
          { title: "Sleep Hours", value: "7.5", color: "success", icon: "🌙" },
        ].map((stat, index) => (
          <Col key={index} md={3}>
            <Card className={`stat-card bg-${stat.color} text-white`}>
              <Card.Body>
                <h3>{stat.icon} {stat.value}</h3>
                <p>{stat.title}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Quick Actions */}
      <Row className="mt-5">
        <Col md={4}>
          <Link to="/workout">
            <Button variant="outline-primary" className="action-btn">🏋️ Log Workout</Button>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/nutrition">
            <Button variant="outline-danger" className="action-btn">🥗 Log Meals</Button>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/goals">
            <Button variant="outline-success" className="action-btn">🎯 Set Goals</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
