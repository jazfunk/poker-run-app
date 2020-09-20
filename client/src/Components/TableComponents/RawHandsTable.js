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
        {/* <td>{hand.hand_rank}</td> */}
        <td>{hand.hand_number}</td>
        <td>{dateMoment.format("MM-DD-YYYY hh:mm a")}</td>
        {/* <td>
          {
            <Button onClick={props.deleteHand} variant="light">
              Remove
            </Button>
          }
        </td> */}
      </tr>
    );
  });

  handsRows =
    handsRows.length === 0 ? (
      <tr>
        <td coolspan="6">No hands found!</td>
      </tr>
    ) : (
      handsRows
    );

  return (
    <section className="form-container">
      <section className="body-main-table table-responsive">
        Hands Table
        <Table className="table-dark table-striped table-borderless table-hover table-bg-trans text-nowrap">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Run</th>
              {/* <th>hands.hand_rank</th> */}
              <th>Hand #</th>
              <th>Created</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>{handsRows}</tbody>
        </Table>
      </section>
    </section>
  );
};

export default RawHandsTable;
