import React from "react";
import Table from "react-bootstrap/Table";

const HandEvaluationTable = (props) => {
  let handEvaluationRows = props.evaluations.map((hand, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{hand.full_name}</td>
        <td>{hand.hand_number}</td>
        <td>{hand.hand_evaluation}</td>
        <td>{hand.hand_display}</td>
        <td>{hand.hand_value}</td>
        <td>{hand.high_card}</td>
        <td>{hand.high_pair}</td>
        {/* <td>{hand.hand_rank}</td> */}
        {/* <td>{hand.hand_id}</td> */}
      </tr>
    );
  });

  handEvaluationRows =
    handEvaluationRows.length === 0 ? (
      <tr>
        <td coolspan="4">No Evaluations found!</td>
      </tr>
    ) : (
      handEvaluationRows
    );

  return (
    <section className="body-main-table table-responsive">
      <Table className="table-dark table-striped table-borderless table-hover table-bg-trans text-nowrap">
        <thead className="thead-dark">
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Hand #</th>
            <th>Hand Rank</th>
            <th>Cards</th>
            <th>Value</th>
            <th>High Card</th>
            <th>High Pair</th>
            {/* <th>Hand</th> */}
            {/* <th>ID</th> */}
          </tr>
        </thead>
        <tbody>{handEvaluationRows}</tbody>
      </Table>
    </section>
  );
};

export default HandEvaluationTable;
