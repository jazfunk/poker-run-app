import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import moment from "moment";

const RawRunsTable = (props) => {
  let runsRows = props.runs.map((run, index) => {
    const runDateMoment = moment(run.run_date);
    const createdAtMoment = moment(run.created_at);
    const timeFormat = "MM-DD-YYYY hh:mm a";
  
    return (
      <tr key={index}>
        <td>{run.id}</td>
        <td>{run.run_name}</td>
        <td>{run.run_description}</td>
        <td>{runDateMoment.format(timeFormat)}</td>
        <td>{run.owner_id}</td>
        <td>{createdAtMoment.format(timeFormat)}</td>
        <td>{<Button onClick={props.deleteRun} variant="light">Remove</Button>}</td>
      </tr>
    );
  });

  runsRows =
    runsRows.length === 0 ? (
      <tr>
        <td coolspan="3">No Runs found!</td>
      </tr>
    ) : (
      runsRows
    );

  return (
    <section className="body-main-table table-responsive">
      Raw Runs Table
      <Table className="table-dark table-striped table-borderless table-hover table-bg-trans text-nowrap">
        <thead className="thead-dark">
          <tr>
            <th>id</th>
            <th>run_name</th>
            <th>run_description</th>
            <th>run_date</th>
            <th>owner_id</th>
            <th>created_at</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{runsRows}</tbody>
      </Table>
    </section>
  );
};

export default RawRunsTable;
