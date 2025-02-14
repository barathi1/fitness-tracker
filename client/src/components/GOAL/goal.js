import React, { useState } from "react";
import { Container, Card, ProgressBar, Button, Row, Col, Modal, Form } from "react-bootstrap";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const Goals = () => {
  const [show, setShow] = useState(false);
  const [goals, setGoals] = useState([
    { id: 1, title: "Lose 5kg", progress: 60 },
    { id: 2, title: "Run 5km daily", progress: 40 },
    { id: 3, title: "Drink 3L Water", progress: 75 },
  ]);

  const [newGoal, setNewGoal] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, { id: goals.length + 1, title: newGoal, progress: 0 }]);
      setNewGoal("");
      handleClose();
    }
  };

  return (
    <Container className="mt-5 text-center">
      <motion.h1 
        className="mb-4 text-primary fw-bold"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        🎯 Achieve Your Goals
      </motion.h1>
      <p className="text-muted">"Set your goals high, and don’t stop till you get there." – Bo Jackson</p>
      
      <Row className="justify-content-center">
        {goals.map((goal) => (
          <Col md={4} key={goal.id} className="mb-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="shadow-lg border-0 rounded-4">
                <Card.Body>
                  <h5 className="fw-bold">{goal.title}</h5>
                  <ProgressBar now={goal.progress} label={`${goal.progress}%`} animated className="my-3" />
                  <Button variant="outline-primary" size="sm">Update</Button>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      <motion.div whileHover={{ scale: 1.1 }}>
        <Button variant="success" onClick={handleShow} className="mt-3 px-4 py-2">
          ➕ Add Goal
        </Button>
      </motion.div>

      {/* Add Goal Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Goal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Enter your goal..."
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={addGoal}>Save Goal</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Goals;
