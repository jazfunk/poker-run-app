import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import logo from "../Images/PokerRunKingLOGO_NEW.png";

const Home = (props) => {
  return (
    <section>
      <Card className="app-home">
        <Card.Img variant="top" src={logo} />
        <Card.Body>
          <Card.Title>Welcome!</Card.Title>
          <Card.Text>
            This component will determine if
            the user is logged in.  If so, direct
            to events user is signed up for.
          </Card.Text>
          <Button variant="primary">Sign In</Button>
        </Card.Body>
      </Card>
    </section>
  );
};

export default Home;
