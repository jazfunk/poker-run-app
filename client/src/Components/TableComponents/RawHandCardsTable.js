import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import moment from "moment";

const RawHandsCardsTable = (props) => {
  let handCardsRows = props.handCards.map((card, index) => {
    
    const dateMoment = moment(card.created_at);
    return (
      <tr key={index}>
        <td>{card.id}</td>
        <td>{card.user_id}</td>
        <td>{card.full_name}</td>
        <td>{card.hand_number}</td>
        <td>{card.card_id}</td>
        <td>{card.card_face}</td>
        <td>
          <img
            className="img-glow"
            src={require(`../../Images/${card.card_suit}.png`)}
            width="20%"
            alt=""
          />
        </td>
        {/* <td>{card.card_suit}</td>         */}
        <td>{dateMoment.format("MM-DD-YYYY hh:mm a")}</td>
        <td>
          {
            <Button onClick={props.deleteHandsCard} variant="light">
              Remove
            </Button>
          }
        </td>
      </tr>
    );
  });

  handCardsRows =
    handCardsRows.length === 0 ? (
      <tr>
        <td coolspan="3">No cards found!</td>
      </tr>
    ) : (
      handCardsRows
    );

  return (
    <section className="form-container">
      <section className="body-main-table table-responsive">
        Raw Hands Cards Table
        <Table className="table-dark table-striped table-borderless table-hover table-bg-trans text-nowrap">
          <thead className="thead-dark">
            <tr>
              <th>id</th>
              <th>user_id</th>
              <th>full_name</th>
              <th>hand_number</th>
              <th>card_id</th>
              <th>card_face</th>
              <th>card_suit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{handCardsRows}</tbody>
        </Table>
      </section>
    </section>
  );
};

export default RawHandsCardsTable;
