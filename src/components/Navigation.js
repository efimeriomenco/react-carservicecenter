import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "./css/styles.css"

export class Navigation extends Component {
  render() {
    return (
      <Navbar bg="dark" expand="lg" className="rounded-pill mt-5">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="d-flex justify-content-center">
          <Nav>
            <NavLink className="d-inline fw-light p-2 bg-dark text-white h4" id="nav-title" to="/" >
              Home
            </NavLink>
            <NavLink className="d-inline fw-light p-2 bg-dark text-white h4" id="nav-title" to="/Enquiry">
              Enquiry
            </NavLink>
            <NavLink className="d-inline fw-light p-2 bg-dark text-white h4" id="nav-title" to="/Booking">
              Booking
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
