import React from "react";
import Table from "react-bootstrap/Table";

const RawCardsTable = (props) => {
  let cardsRows = props.cards.map((card, index) => {
    return (
      <tr key={index}>
        <td>{card.id}</td>
        <td>{card.card_face}</td>
        <td>{card.card_suit}</td>
        <td>{card.card_value}</td>
        <td>{card.created_at}</td>
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
    <section className="body-main-table table-responsive">
      <Table className="table-dark table-striped table-borderless table-hover table-bg-trans text-nowrap">
        <thead className="thead-dark">
          <tr>
            <th>id</th>
            <th>card_face</th>
            <th>card_suit</th>
            <th>card_value</th>
            <th>created_at</th>
          </tr>
        </thead>
        <tbody>{cardsRows}</tbody>
      </Table>
    </section>
  );
};

export default RawCardsTable;
