import React, { useState } from "react";
import { Container, Row, Col, Button, Card, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion"; // For smooth animations

const Reminders = () => {
  const [show, setShow] = useState(false);
  const [reminders, setReminders] = useState([
    { id: 1, title: "Morning Workout", time: "6:30 AM" },
    { id: 2, title: "Drink Water", time: "Every 2 Hours" },
    { id: 3, title: "Evening Walk", time: "7:00 PM" },
  ]);
  const [newReminder, setNewReminder] = useState({ title: "", time: "" });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addReminder = () => {
    if (newReminder.title && newReminder.time) {
      setReminders([...reminders, { id: reminders.length + 1, ...newReminder }]);
      setNewReminder({ title: "", time: "" });
      setShow(false);
    }
  };

  return (
    <Container className="mt-5">
      {/* Page Title */}
      <motion.h2
        className="text-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        📅 Your Reminders
      </motion.h2>

      {/* Add Reminder Button */}
      <div className="text-center mb-4">
        <Button variant="primary" onClick={handleShow} className="px-4 py-2 shadow-lg">
          ➕ Add Reminder
        </Button>
      </div>

      {/* Reminder Cards */}
      <Row className="justify-content-center">
        {reminders.map((reminder) => (
          <Col md={4} key={reminder.id} className="mb-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-lg rounded-lg border-0 bg-light">
                <Card.Body>
                  <Card.Title className="fw-bold text-primary">{reminder.title}</Card.Title>
                  <Card.Text className="text-muted">⏰ {reminder.time}</Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Add Reminder Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Reminder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Reminder Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Morning Yoga"
                value={newReminder.title}
                onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Reminder Time</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., 6:00 AM"
                value={newReminder.time}
                onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={addReminder}>
            Save Reminder
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Reminders;
