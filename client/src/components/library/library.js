import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Carousel } from "react-bootstrap";

import strengthTrainning from "../../assets/images/3304470.jpg"

const fitnessResources = [
  { id: 1, title: "Strength Training", image: strengthTrainning, description: "Build muscle with expert-guided strength training exercises." },
  { id: 2, title: "Cardio Workouts", image: "/images/cardio.jpg", description: "Improve endurance and heart health with top cardio routines." },
  { id: 3, title: "Yoga & Meditation", image: "/images/yoga.jpg", description: "Enhance flexibility and mental well-being through yoga." },
  { id: 4, title: "Healthy Nutrition", image: "/images/nutrition.jpg", description: "Discover balanced diets and healthy eating habits." },
];

const featuredWorkouts = [
  { id: 1, title: "HIIT Blast", image: "/images/hiit.jpg" },
  { id: 2, title: "Full-Body Workout", image: "/images/fullbody.jpg" },
  { id: 3, title: "Core Strength", image: "/images/core.jpg" },
];

const FitnessLibrary = () => {
  const [search, setSearch] = useState("");

  const filteredResources = fitnessResources.filter(resource =>
    resource.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="mt-5">
      {/* Header */}
      <h2 className="text-center mb-4 text-primary fw-bold">🏋️‍♂️ Fitness Library</h2>
      
      {/* Search Bar */}
      <Form.Group className="mb-4">
        <Form.Control 
          type="text" 
          placeholder="Search workouts, nutrition tips..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="shadow-sm"
        />
      </Form.Group>

      {/* Featured Workouts Carousel */}
      <Carousel className="mb-5 shadow-lg rounded">
        {featuredWorkouts.map((workout) => (
          <Carousel.Item key={workout.id}>
            <img className="d-block w-100 rounded" src={workout.image} alt={workout.title} style={{ height: "400px", objectFit: "cover" }} />
            <Carousel.Caption className="bg-dark bg-opacity-50 p-2 rounded">
              <h5>{workout.title}</h5>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Fitness Categories */}
      <Row>
        {filteredResources.map((resource) => (
          <Col md={6} lg={3} key={resource.id} className="mb-4">
            <Card className="h-100 shadow-sm border-0 rounded-lg hover-effect">
              <Card.Img variant="top" src={resource.image} style={{ height: "180px", objectFit: "cover" }} />
              <Card.Body>
                <Card.Title className="text-primary fw-bold">{resource.title}</Card.Title>
                <Card.Text>{resource.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FitnessLibrary;
