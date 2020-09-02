import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import AppLogo from "../Images/PokerRunKingLOGO_NEW_OPTIMIZED.svg"

const Navigation = () => {
  return (
    <Navbar className="custom-nav" variant="dark" expand="md">
      <Navbar.Brand href="/">
          <img
            src={AppLogo}
            width="30"
            height="30"
            className="d-inline-block align-top navbrand-glow-border"
            alt="PokerRun"
          />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/userslist">Users</Nav.Link>
          <Nav.Link href="/addrun">Events</Nav.Link>
          <Nav.Link href="/standings">Standings</Nav.Link>
          <Nav.Link href="/hands">Hands</Nav.Link>
          <NavDropdown title="My Account" id="basic-nav-dropdown">
            <NavDropdown.Item href="/login">Log In</NavDropdown.Item>
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
