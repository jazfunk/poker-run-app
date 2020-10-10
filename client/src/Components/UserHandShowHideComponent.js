import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import logo from "../Images/PokerRunKingLOGO_NEW.png";

const UserHandShowHideComponent = (props) => {
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

  let displayText = () => {
    let handOrHands = props.handsCount > 1 ? "hands" : "hand";
    let countDisplay = props.handsCount
      ? `${props.handsCount} ${handOrHands}`
      : "Loading...";
    let nameDisplay = props.fullName ? props.fullName : "Loading";
    return `${nameDisplay} - ${countDisplay}`;
  };

  return (
    <section className="dashboard">
      <section className="form-container">
        <h5>{displayText()}</h5>
        <h5>Congratulations, Your Poker Hands have been dealt and submitted!</h5>
        <p>Click on a card to reveal it</p>
        <h3>-OR-</h3>
        <p>Click the "Stop #" button at each stop to view.</p>    
      <Button onClick={props.handleStopReset}>Cover All</Button>
      </section>
      <section className="hands-header">
        <div>
          <Button
            className="stop-button"
            variant="info"
            id="1"
            onClick={props.handleStopClick}
          >
            Stop #1
          </Button>
        </div>
        <div>
          <Button
            className="stop-button"
            variant="info"
            id="2"
            onClick={props.handleStopClick}
          >
            Stop #2
          </Button>
        </div>
        <div>
          <Button
            className="stop-button"
            variant="info"
            id="3"
            onClick={props.handleStopClick}
          >
            Stop #3
          </Button>
        </div>
        <div>
          <Button
            className="stop-button"
            variant="info"
            id="4"
            onClick={props.handleStopClick}
          >
            Stop #4
          </Button>
        </div>
        <div>
          {" "}
          <Button
            className="stop-button"
            variant="info"
            id="5"
            onClick={props.handleStopClick}
          >
            Stop #5
          </Button>
        </div>
      </section>
      <section className="hands">{handsRows}</section>  
    </section>
  );
};

export default UserHandShowHideComponent;
