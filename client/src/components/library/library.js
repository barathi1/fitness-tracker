import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Carousel, Spinner } from "react-bootstrap";
import axios from "axios";

const FitnessLibrary = () => {
  const [search, setSearch] = useState("");
  const [exercises, setExercises] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const options = {
          method: "GET",
          url: "https://exercisedb.p.rapidapi.com/exercises",
          headers: {
            "X-RapidAPI-Key": "a2c7debdffmsh26596f8a7f483dep19f5e2jsnc2d3a7d3afd8", // Replace with your API Key
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
          },
        };

        const response = await axios.request(options);

        console.log(response);
        
        setExercises(response.data.slice(0, 20)); // Limit to 20 exercises
        setFeatured(response.data.slice(0, 5)); // First 5 for the carousel
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exercises:", error);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4 text-primary fw-bold">🏋️‍♂️ Fitness Library</h2>

      {/* Search Bar */}
      <Form.Group className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search workouts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="shadow-sm"
        />
      </Form.Group>

      {/* Featured Workouts Carousel */}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Carousel className="mb-5 shadow-lg rounded">
          {featured.map((workout) => (
            <Carousel.Item key={workout.id}>
              <img
                className="d-block w-100 rounded"
                src={workout.gifUrl}
                alt={workout.name}
                style={{ height: "400px", objectFit: "cover" }}
              />
              <Carousel.Caption className="bg-dark bg-opacity-50 p-2 rounded">
                <h5>{workout.name}</h5>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      )}

      {/* Fitness Categories */}
      <Row>
        {filteredExercises.map((exercise) => (
          <Col md={6} lg={3} key={exercise.id} className="mb-4">
            <Card className="h-100 shadow-sm border-0 rounded-lg hover-effect">
              <Card.Img variant="top" src={exercise.gifUrl} style={{ height: "180px", objectFit: "cover" }} />
              <Card.Body>
                <Card.Title className="text-primary fw-bold">{exercise.name}</Card.Title>
                <Card.Text>Target: {exercise.target}</Card.Text>
                <Card.Text>Equipment: {exercise.equipment}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FitnessLibrary;
