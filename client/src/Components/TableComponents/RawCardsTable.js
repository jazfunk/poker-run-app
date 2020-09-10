import React from "react";
import Table from "react-bootstrap/Table";

const RawCardsTable = (props) => {
  // <img src={require(`../Images/${card.card_suit}.png`)} alt="" />
  let cardsRows = props.cards.map((card, index) => {
    return (
      <tr key={index}>
        <td>{card.id}</td>
        <td>{card.card_face}</td>
        <td>
          <img
            className="img-glow"
            src={require(`../../Images/${card.card_suit}.png`)}
            width="10%"
            alt=""
          />
        </td>
        {/* <td>{card.card_suit}</td> */}
        <td>{card.card_value}</td>
      </tr>
    );
  });

  cardsRows =
    cardsRows.length === 0 ? (
      <tr>
        <td coolspan="3">No cards found!</td>
      </tr>
    ) : (
      cardsRows
    );

  return (
    <section className="form-container">
      <section className="body-main-table table-responsive">
        Raw Cards Table
        <Table className="table-dark table-striped table-borderless table-hover table-bg-trans text-nowrap">
          <thead className="thead-dark">
            <tr>
              <th>id</th>
              <th>card_face</th>
              <th>card_suit</th>
              <th>card_value</th>
            </tr>
          </thead>
          <tbody>{cardsRows}</tbody>
        </Table>
      </section>
    </section>
  );
};

export default RawCardsTable;
