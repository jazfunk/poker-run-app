import React from "react";
import Card from "react-bootstrap/Card";
import logo from "../Images/PokerRunKingLOGO_NEW.png";

const RunUserHands = (props) => {
  let handsRows = props.hands.map((hand, index) => {
    return (
      <Card className="app-home">
        <Card.Img variant="top" src={logo} />
        <Card.Body>
          <Card.Title>{hand.card_face}{hand.card_suit}</Card.Title>
          <Card.Text>(Hand #{hand.hand_number})</Card.Text>
          <Card.Text>(Point Value) - {hand.card_value}</Card.Text>
        </Card.Body>
      </Card>
      // <tr key={index}>
      //   <td>{hand.hand_rank}</td>
      //   <td>{hand.hand_number}</td>
      //   <td>{hand.hand_id}</td>
      //   <td>{hand.card_id}</td>
      //   <td>{hand.card_face}</td>
      //   <td>{hand.card_suit}</td>
      //   <td>{hand.card_value}</td>
      // </tr>
    );
  });

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
    <section className="hands">{handsRows}</section>
  );
};

export default RunUserHands;
