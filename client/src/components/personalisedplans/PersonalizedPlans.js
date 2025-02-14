import React from "react";
import { Container, Row, Col, Card, Button, Accordion } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



const plans = [
  {
    id: 1,
    title: "Weight Loss Plan",
    description: "A calorie-deficit diet with HIIT workouts.",
    details:
      "Includes a mix of cardio, strength training, and meal plans with high protein and low carbs.",
    img: "https://source.unsplash.com/500x300/?fitness,exercise",
  },
  {
    id: 2,
    title: "Muscle Gain Plan",
    description: "High-protein meals with resistance training.",
    details:
      "Focuses on hypertrophy training, compound movements, and macro-based nutrition plans.",
    img: "https://source.unsplash.com/500x300/?gym,bodybuilding",
  },
  {
    id: 3,
    title: "Balanced Lifestyle Plan",
    description: "A sustainable plan for long-term health.",
    details:
      "A mix of healthy eating, moderate exercise, and stress management techniques.",
    img: "https://source.unsplash.com/500x300/?yoga,meditation",
  },
];

const PersonalizedPlans = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary">Your Personalized Fitness Plans</h1>
        <p className="lead text-muted">
          Achieve your fitness goals with expert-designed workout & nutrition plans.
        </p>
      </div>

      {/* Plans Display */}
      <Row className="g-4">
        {plans.map((plan) => (
          <Col md={4} key={plan.id}>
            <Card className="shadow-lg border-0 rounded">
              <Card.Img variant="top" src={plan.img} className="rounded-top" />
              <Card.Body className="text-center">
                <Card.Title className="fw-bold">{plan.title}</Card.Title>
                <Card.Text>{plan.description}</Card.Text>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>View Details</Accordion.Header>
                    <Accordion.Body>{plan.details}</Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Button
                  variant="primary"
                  className="mt-3 w-100"
                  onClick={() => navigate("/customize-plan")}
                >
                  Customize Plan
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PersonalizedPlans;
