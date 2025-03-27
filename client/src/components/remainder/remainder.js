// Reminders.js
import React, { useState } from "react";
import { Container, Row, Col, Button, Card, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import ReminderApp from "../sleep/reaminderAlarm";

const Reminders = () => {
  const [show, setShow] = useState(false);
  const now = new Date().toISOString().split("T")[0]; // Correct date format

  const [reminders, setReminders] = useState([
    { id: 1, title: "Reminder 1", time: `${now}T18:35:00` },
    { id: 2, title: "Reminder 2", time: `${now}T18:37:00` },
    { id: 3, title: "Reminder 3", time: `${now}T18:39:00` },
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
      <motion.h2 className="text-center mb-4" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        📅 Your Reminders
      </motion.h2>
      <div className="text-center mb-4">
        <Button variant="primary" onClick={handleShow}>➕ Add Reminder</Button>
      </div>
      <Row className="justify-content-center">
        <ReminderApp reminders={reminders} />
        {reminders.map((reminder) => (
          <Col md={4} key={reminder.id} className="mb-4">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <Card className="shadow-lg border-0 bg-light">
                <Card.Body>
                  <Card.Title className="fw-bold text-primary">{reminder.title}</Card.Title>
                  <Card.Text className="text-muted">⏰ {new Date(reminder.time).toLocaleTimeString()}</Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Reminder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Reminder Title</Form.Label>
              <Form.Control type="text" placeholder="e.g., Morning Yoga" value={newReminder.title} onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Reminder Time</Form.Label>
              <Form.Control type="time" value={newReminder.time} onChange={(e) => setNewReminder({ ...newReminder, time: `${now}T${e.target.value}:00` })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="success" onClick={addReminder}>Save Reminder</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Reminders;