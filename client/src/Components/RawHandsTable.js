import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import moment from "moment";

const RawHandsTable = (props) => {
  let handsRows = props.hands.map((hand, index) => {  
    const dateMoment = moment(hand.created_at);
    return (
      <tr key={index}>
        <td>{hand.id}</td>
        <td>{hand.full_name}</td>
        <td>{hand.run_name}</td>
        <td>{hand.hand_rank}</td>
        <td>{hand.hand_number}</td>
        <td>{dateMoment.format("MM-DD-YYYY hh:mm a")}</td>
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
      Raw Hands Table
      <Table className="table-dark table-striped table-borderless table-hover table-bg-trans text-nowrap">
        <thead className="thead-dark">
          <tr>
            <th>hands.id</th>
            <th>users.full_name</th>
            <th>runs.run_name</th>
            <th>hands.hand_rank</th>
            <th>hands.hand_number</th>
            <th>hands.created_at</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{handsRows}</tbody>
      </Table>
    </section>
  );
};

export default RawHandsTable;
