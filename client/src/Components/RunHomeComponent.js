import React from "react";
import Table from "react-bootstrap/Table";

const RunHomeComponent = (props) => {
  let handsRows = props.hands.map((hand, index) => {
    return (
      <tr key={index}>
        <td>{hand.hand_rank}</td>
        <td>{hand.hand_number}</td>
        <td>{hand.hand_id}</td>
        <td>{hand.card_id}</td>
        <td>{hand.card_face}</td>
        <td>{hand.card_suit}</td>
        <td>{hand.card_value}</td>
      </tr>
    );
  });

  handsRows =
    handsRows.length === 0 ? (
      <tr>
        <td coldspan="7">No Hands Found!</td>
      </tr>
    ) : (
      handsRows
    );

  return (
    <section className="body-main-table table-responsive">
      <Table className="table-dark table-striped table-borderless table-hover table-bg-trans text-nowrap">
        <thead className="thead-dark">
          <tr>
            <th>Rank</th>
            <th>Hand #</th>
            <th>Hand ID</th>
            <th>Card ID</th>
            <th>Face</th>
            <th>Suite</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>{handsRows}</tbody>
      </Table>
    </section>
  );
};

export default RunHomeComponent;
