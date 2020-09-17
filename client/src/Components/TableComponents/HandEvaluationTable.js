import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const HandEvaluationTable = (props) => {
  let handEvaluationRows = props.evaluations.map((hand, index) => {
    return (
      <tr key={index}>
        <td>{hand.hand_id}</td>
        <td>{hand.hand_evaluation}</td>
      </tr>
    );
  });

  handEvaluationRows =
    handEvaluationRows.length === 0 ? (
      <tr>
        <td coolspan="2">No Evaluations found!</td>
      </tr>
    ) : (
      handEvaluationRows
    );

  return (
    <section className="body-main-table table-responsive">
      <Table className="table-dark table-striped table-borderless table-hover table-bg-trans text-nowrap">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Evaluation</th>
          </tr>
        </thead>
        <tbody>{handEvaluationRows}</tbody>
      </Table>
    </section>
  );
};

export default HandEvaluationTable;
