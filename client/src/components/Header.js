import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Auth from "../utils/auth";
import heart from "../assets/images/heart.png";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./Header.css"; // Custom styles for better UI

export default function Header() {
  const loggedIn = Auth.loggedIn();
  const location = useLocation();
  
  return (
    <Navbar collapseOnSelect expand="lg" className="custom-navbar" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand d-flex align-items-center">
          <img alt="heart" src={heart} className="heart-icon me-2" />
          FitTrack
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="border-0" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {loggedIn ? (
            <Nav className="ms-auto align-items-center">
              <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
              <Nav.Link as={Link} to="/workout">Workout</Nav.Link>
              <Nav.Link as={Link} to="/nutrition">Nutrition</Nav.Link>
              <Nav.Link as={Link} to="/water">Water</Nav.Link>
              <Nav.Link as={Link} to="/sleep">Sleep</Nav.Link>
              <Nav.Link as={Link} to="/goals">Goals</Nav.Link>
              <Nav.Link as={Link} to="/analytics">Analytics</Nav.Link>
              <Nav.Link as={Link} to="/reminders">Reminders</Nav.Link>
              <Nav.Link as={Link} to="/library">Library</Nav.Link>
              <Nav.Link as={Link} to="/plans">Plans</Nav.Link>
              <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
              <Nav.Link as={Link} to="/exercise">Exercise</Nav.Link>
              <Nav.Link as={Link} to="/history">History</Nav.Link>
              <Button variant="outline-danger" className="ms-3" onClick={Auth.logout}>Logout</Button>
            </Nav>
          ) : null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
