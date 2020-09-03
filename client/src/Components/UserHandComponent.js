import React from "react";
import Card from "react-bootstrap/Card";
import logo from "../Images/PokerRunKingLOGO_NEW.png";

let fullName = "";

const RunUserHands = (props) => {
  let handsRows = props.hands.map((hand, index) => {
    fullName = `${hand.first_name} ${hand.last_name}` 
    return (
      <Card className="app-home" key={index}>
        <Card.Img variant="top" src={logo} />
        <Card.Body>
          <Card.Title>
            {hand.card_face}
            {hand.card_suit}
          </Card.Title>
          <Card.Text>
            #{hand.hand_id}-{hand.hand_number}-{hand.first_name}
          </Card.Text>
        </Card.Body>
      </Card>
    );    
  });

  // {hand.hand_rank}
  // {hand.hand_number}
  // {hand.hand_id}
  // {hand.card_id}
  // {hand.card_face}
  // {hand.card_suit}
  // {hand.card_value}

  handsRows =
    handsRows.length === 0 ? (
      <Card className="app-home">
        <Card.Img variant="top" src={logo} />
        <Card.Body>
          <Card.Title>No Cards</Card.Title>
          <Card.Text>No cards found</Card.Text>
        </Card.Body>
      </Card>
    ) : (
      handsRows
    );

  return (
    <section className="dashboard">
      <h1>{fullName}</h1>
      <section className="hands">{handsRows}</section>
    </section>
  );
};

export default RunUserHands;
