import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import moment from "moment";
// import Button from "react-bootstrap/Button";
// import logo from "../Images/PokerRunKingLOGO_NEW.png";

const UserRunsComponent = (props) => {
  let runName = "";
  let runDescription = "";
  let runDate = new moment();

  if (props.run) {
    runName = props.run.run_name;
    runDescription = props.run.run_description;
    runDate = moment(props.run.run_date);
  }  

  return (
    <section>
      <Form onSubmit={props.handleSubmit}>
        <div
        // key={index}
        // onClick={(event) => props.handleRunClick(event, card)}
        // onClick={props.handleRunClick}
        >
          <Card
            className="user-runs"
            // key={index}
          >
            {/* <Card.Img
            className="hands-img card-glow"
            variant="top"
            src={require(`../Images/${card.card_suit}.png`)}
            alt="Poker Run"
          /> */}
            <Card.Body className="hands-body">
              <Card.Title>{runName}</Card.Title>
              <Card.Text>{runDescription}</Card.Text>
              <Card.Text>{runDate.format("MM-DD-YYYY h:mm a")}</Card.Text>
              {/* <Button variant="primary">View hands for the {props.run.run_name} run</Button> */}
            </Card.Body>
          </Card>
        </div>
      </Form>
    </section>
  );
};

export default UserRunsComponent;
