import React, { useEffect, useState } from "react";
import { Container, Card, ProgressBar, Button, Row, Col, Modal, Form } from "react-bootstrap";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Goals = () => {
  const [show, setShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  
  // State for Updating Goal
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [updatedProgress, setUpdatedProgress] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleUpdateClose = () => setUpdateShow(false);
  const handleUpdateShow = (goal) => {
    setSelectedGoal(goal);
    setUpdatedProgress(goal.progress);
    setUpdateShow(true);
  };

  const addGoal = async () => {
    if (newGoal.trim()) {
      await axios.post("http://localhost:3001/api/goal", {
        email: user.email,
        title: newGoal,
        progress: 0,
      });
      setNewGoal("");
      handleClose();
      fetchGoals(); // Refresh goals
    }
  };

  const updateGoal = async () => {
    if (selectedGoal) {
      await axios.put(`http://localhost:3001/api/goal/${selectedGoal._id}`, {
        progress: updatedProgress,
      });
      handleUpdateClose();
      fetchGoals(); // Refresh goals
    }
  };

  const fetchGoals = async () => {
    const { data } = await axios.get(`http://localhost:3001/api/goal?email=${user.email}`);
    setGoals(data);
  };

  useEffect(() => {
    fetchGoals();
  }, []);

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
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card className="shadow-lg border-0 rounded-4">
                <Card.Body>
                  <h5 className="fw-bold">{goal.title}</h5>
                  <ProgressBar now={goal.progress} label={`${goal.progress}%`} animated className="my-3" />
                  <Button variant="outline-primary" size="sm" onClick={() => handleUpdateShow(goal)}>Update</Button>
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
          <Form.Control type="text" placeholder="Enter your goal..." value={newGoal} onChange={(e) => setNewGoal(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={addGoal}>Save Goal</Button>
        </Modal.Footer>
      </Modal>

      {/* Update Goal Modal */}
      <Modal show={updateShow} onHide={handleUpdateClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Goal Progress</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>{selectedGoal?.title}</h5>
          <Form.Label>Progress: {updatedProgress}%</Form.Label>
          <Form.Range min={0} max={100} value={updatedProgress} onChange={(e) => setUpdatedProgress(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpdateClose}>Cancel</Button>
          <Button variant="primary" onClick={updateGoal}>Update Goal</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Goals;
