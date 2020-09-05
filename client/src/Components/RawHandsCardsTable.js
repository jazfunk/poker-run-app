import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const RawHandsCardsTable = (props) => {
  let handsCardsRows = props.handscards.map((card, index) => {
    return (
      <tr key={index}>
        <td>{card.id}</td>
        <td>{card.hand_id}</td>
        <td>{card.card_id}</td>
        <td>{card.created_at}</td>
        <td>{<Button onClick={props.deleteHandsCard} variant="light">Remove</Button>}</td>
      </tr>
    );
  });

  handsCardsRows =
    handsCardsRows.length === 0 ? (
      <tr>
        <td coolspan="3">No cards found!</td>
      </tr>
    ) : (
      handsCardsRows
    );

  return (
    <section className="body-main-table table-responsive">
      <Table className="table-dark table-striped table-borderless table-hover table-bg-trans text-nowrap">
        <thead className="thead-dark">
          <tr>
            <th>id</th>
            <th>hand_id</th>
            <th>card_id</th>
            <th>created_at</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{handsCardsRows}</tbody>
      </Table>
    </section>
  );
};

export default RawHandsCardsTable;
