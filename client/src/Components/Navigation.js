import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const Navigation = () => {
  return (
    <Navbar variant="light" expand="md">
      <Navbar.Brand href="/">
        Poker Run
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/standings">Standings</Nav.Link>
          <Nav.Link href="/hands">Hands</Nav.Link>
          <NavDropdown title="My Account" id="basic-nav-dropdown">
            <NavDropdown.Item href="/login">Login</NavDropdown.Item>
            <NavDropdown.Item href="/signup">Sign Up</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/logout">Log Out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
