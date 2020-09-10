import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import AppLogo from "../Images/PokerRunKingLOGO_NEW_OPTIMIZED.svg";

const Navigation = () => {
  return (
    <section className="navbar-align">
      <Navbar className="custom-nav nav-margins" variant="dark" expand="md">
        <Navbar.Brand href="/">
          <img
            src={AppLogo}
            width="30"
            height="30"
            className="d-inline-block align-top navbrand-glow-border"
            alt="PokerRun"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="navbar-toggler"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/runhome">My Hand</Nav.Link>
            <Nav.Link href="/standings">Standings</Nav.Link>
            <NavDropdown title="My Account" id="basic-nav-dropdown">
              <NavDropdown.Item href="/login">Log In</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/logout">Log Out</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Admin" id="basic-nav-dropdown">
              <NavDropdown.Item href="/signup">Sign Up</NavDropdown.Item>
              <NavDropdown.Item href="/addrun">Add New Run</NavDropdown.Item>
              <NavDropdown.Item href="/userslist">Users List</NavDropdown.Item>
              <NavDropdown.Item href="/addrunadmin">
                Add Run Admin
              </NavDropdown.Item>
              <NavDropdown.Item href="/adduserhand">Add User Hand</NavDropdown.Item>
              <NavDropdown.Item href="/addhandcard">Add Cards to Hand</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">
                TODO: Standings Endpoint
              </NavDropdown.Item>
              <NavDropdown.Item href="#">
                TODO: UserHome list runs
              </NavDropdown.Item>
              <NavDropdown.Item href="#">
                TODO: RunHome list hands
              </NavDropdown.Item>
              <NavDropdown.Item href="/admin">Root Admin</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </section>
  );
};

export default Navigation;
