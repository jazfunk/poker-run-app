import React from "react";
import Card from "react-bootstrap/Card";
import Draggable from "react-draggable";
import logo from "../Images/PokerRunKingLOGO_NEW.png";

let fullName = "";

const UserHandComponentNEW = (props) => { 

  const showCards = (hand) => {
    debugger;
    for (let card in hand) {
      fullName = `${card.first_name} ${card.last_name}`;
      return (
        <Draggable key={index} axis="x" grid={[10, 10]} bounds="parent">
          <Card className="hands-cards" key={index}>
            <Card.Img
              className="hands-img card-glow"
              variant="top"
              src={require(`../Images/${card.card_suit}.png`)}
              alt=""
            />
            <Card.Body>
              <Card.Title className="card-face">{card.card_face}</Card.Title>
              <Card.Text className="hands-number">
                {card.hand_number}-{card.hand_id}-{card.card_value}
              </Card.Text>
            </Card.Body>
          </Card>
        </Draggable>
      );
    }
  };

  

  let handRows = props.allCards.map((card, index) => {
    debugger;
    console.log(card);
    let handToShow = showCards(card) || [];
    return <section key={index}>{handToShow}</section>;
  });

  return (
    <section className="dashboard">
      <h1>New hand component</h1>
      <section className="hands">{handRows}</section>
      {/* <section className="hands">{}</section> */}
    </section>
  );
};

export default UserHandComponentNEW;
