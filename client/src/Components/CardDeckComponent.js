import React from "react";
import Card from "react-bootstrap/Card";
import Draggable from "react-draggable";
import logo from "../Images/PokerRunKingLOGO_NEW.png";

const CardDeckComponent = (props) => {
  let cardRows = props.cards.map((card, index) => {
    return (
      <Draggable key={index} axis="x" grid={[10, 10]} bounds="parent">
        <Card className="deck-cards" key={index}>
          <Card.Img
            className="cards-img card-glow"
            variant="top"
            src={require(`../Images/${card.card_suit}.png`)}
            alt=""
          />
          <Card.Body>
            <Card.Title className="card-face-small">{card.card_face}</Card.Title>
            <Card.Text className="hands-number">
              {card.card_value}
            </Card.Text>
          </Card.Body>
        </Card>
      </Draggable>
    );
  });

  cardRows =
    cardRows.length === 0 ? (
      <Card className="deck-cards" >
        <Card.Img variant="top" src={logo} />
        <Card.Body>
          <Card.Title className="card-face-small">No Cards</Card.Title>
          <Card.Text className="hands-number">No cards found</Card.Text>
        </Card.Body>
      </Card>
    ) : (
      cardRows
    );

  return (
    <section className="dashboard">
      <section className="hands">{cardRows}</section>
    </section>
  );
};

export default CardDeckComponent;