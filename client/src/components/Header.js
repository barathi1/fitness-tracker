import React, { useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
// cant use <a> in react, instead, use <link> from react router dom
import { Link, useLocation } from "react-router-dom";
import Auth from "../utils/auth"
import heart from "../assets/images/heart.png"

// import { setDefaultLocale } from "react-datepicker";

export default function Header() {

  const loggedIn = Auth.loggedIn();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';

  return (

    <Navbar collapseOnSelect expand="sm" variant="dark" bg={loggedIn && !isHomePage ? "dark" : null}>
      {loggedIn ? (
        <>
          <Navbar.Brand as={Link} to="/" className="brand brand-logged d-flex align-items-center">
            <img alt="heart" style={{ display: "inline" }} src={heart} className="heart-icon" />
            FitTrack
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav >
              {/* use eventKey to show navbar style from react bootstrap */}
              <Nav.Link as={Link} to="/dashboard" eventKey="1" >Dashboard</Nav.Link>
              <Nav.Link as={Link} to="/workout" eventKey="2">Workout Tracker</Nav.Link>
              <Nav.Link as={Link} to="/nutrition" eventKey="1" >Nutrition Tracker</Nav.Link>
              <Nav.Link as={Link} to="/water" eventKey="2">Water Tracker</Nav.Link>
              <Nav.Link as={Link} to="/sleep" eventKey="1" >Sleep Tracker</Nav.Link>
              <Nav.Link as={Link} to="/goals" eventKey="2">Goals</Nav.Link>

              
              <Nav.Link as={Link} to="/analytics" eventKey="1" >Progress Analytics</Nav.Link>
              <Nav.Link as={Link} to="/reminders" eventKey="2">Reminders</Nav.Link>
              <Nav.Link as={Link} to="/library" eventKey="1" >Fitness Library</Nav.Link>
              <Nav.Link as={Link} to="/plans" eventKey="2">Personalized Plans</Nav.Link>
              
              <Nav.Link as={Link} to="/profile" eventKey="1" >Profile</Nav.Link>

              <Nav.Link as={Link} to="/exercise" eventKey="1" >Exercise</Nav.Link>
              <Nav.Link as={Link} to="/history" eventKey="2">History</Nav.Link>
              <Nav.Link onClick={Auth.logout}  className="logout-nav" >Logout </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </>) :
        (<Navbar.Brand as={Link} to="/" className={`brand brand-new mx-auto d-flex align-items-center
          ${isLoginPage || isSignupPage ? "brand-text" : null}`}>
          <img alt="heart" style={{ display: "inline" }} src={heart} className="heart-icon" />
          FitTrack
        </Navbar.Brand>)}

     


    
    </Navbar >
  );
}
