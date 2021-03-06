import React from "react";
import Card from "react-bootstrap/Card";
import logo from "../Images/PokerRunKingLOGO_NEW.png";

const UserAdminComponent = (props) => {
  let handsRows = props.handCards.map((card, index) => {
    return (
      <div
        key={index}
        onClick={(event) => props.handleCardClick(event, card)}
        className={card.isDealt ? "card-shown" : "card-hidden"}
      >
        <Card
          className="hands-cards border-gradient border-gradient-light"
          key={index}
        >
          <Card.Img
            className="hands-img card-glow"
            variant="top"
            src={require(`../Images/${card.card_suit}.png`)}
            alt="Poker Run Card"
          />
          <Card.Body className="hands-body">
            <Card.Title className="card-face">{card.card_face}</Card.Title>
            <Card.Text className="hands-number">{card.hand_number}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  });

  handsRows =
    handsRows.length === 0 ? (
      <Card className="hands-cards">
        <Card.Img variant="top" src={logo} />
        <Card.Body>
          <Card.Title className="card-face"></Card.Title>
          <Card.Text className="hands-number">No cards found</Card.Text>
        </Card.Body>
      </Card>
    ) : (
      handsRows
    );

  return (
    <section className="dashboard">
      <h3>{`${props.fullName} - ${props.handsCount} hands`}</h3>
      <section className="hands-text-header">
        <div>Stop #1</div>
        <div>Stop #2</div>
        <div>Stop #3</div>
        <div>Stop #4</div>
        <div>Stop #5</div>
      </section>
      <section className="hands">{handsRows}</section>
    </section>
  );
};

export default UserAdminComponent;
