import React from "react";
import Card from "react-bootstrap/Card";
import logo from "../Images/PokerRunKingLOGO_NEW.png";

let fullName = "";

const RunUserHands = (props) => {
  let handsRows = props.hands.map((hand, index) => {
    fullName = `${hand.first_name} ${hand.last_name}` 
    return (
      <Card className ="hands-cards" key={index}>
        <Card.Img className="hands-img card-glow" variant="top" src={require(`../Images/${hand.card_suit}.png`)} alt="" />
        <Card.Body>
          <Card.Title className="card-face">
            {hand.card_face}
          </Card.Title>
          <Card.Text className="hands-number">
            {hand.hand_number}-{hand.hand_id}
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
      <Card>
        <Card.Img variant="top" src={logo} />
        <Card.Body>
          <Card.Title className="card-face">No Cards</Card.Title>
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
