import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const RawHandsTable = (props) => {
  let handsRows = props.hands.map((hand, index) => {
    return (
      <tr key={index}>
        <td>{hand.id}</td>
        <td>{hand.user_id}</td>
        <td>{hand.run_id}</td>
        <td>{hand.hand_rank}</td>
        <td>{hand.hand_number}</td>
        <td>{hand.created_at}</td>
        <td>{<Button onClick={props.deleteHand} variant="light">Remove</Button>}</td>
      </tr>
    );
  });

  handsRows =
    handsRows.length === 0 ? (
      <tr>
        <td coolspan="3">No hands found!</td>
      </tr>
    ) : (
      handsRows
    );

  return (
    <section className="body-main-table table-responsive">
      <Table className="table-dark table-striped table-borderless table-hover table-bg-trans text-nowrap">
        <thead className="thead-dark">
          <tr>
            <th>id</th>
            <th>user_id</th>
            <th>run_id</th>
            <th>hand_rank</th>
            <th>hand_number</th>
            <th>created_at</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{handsRows}</tbody>
      </Table>
    </section>
  );
};

export default RawHandsTable;
