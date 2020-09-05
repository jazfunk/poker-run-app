import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const RawRunAdminsTable = (props) => {
  let runAdminsRows = props.admins.map((admin, index) => {
    return (
      <tr key={index}>
        <td>{admin.id}</td>
        <td>{admin.user_id}</td>
        <td>{admin.run_id}</td>
        <td>{admin.admin_role}</td>
        <td>{admin.created_at}</td>
        <td>{<Button onClick={props.deleteRunAdmin} variant="light">Remove</Button>}</td>
      </tr>
    );
  });

  runAdminsRows =
    runAdminsRows.length === 0 ? (
      <tr>
        <td coolspan="3">No Run Admins found!</td>
      </tr>
    ) : (
      runAdminsRows
    );

  return (
    <section className="body-main-table table-responsive">
      <Table className="table-dark table-striped table-borderless table-hover table-bg-trans text-nowrap">
        <thead className="thead-dark">
          <tr>
            <th>id</th>
            <th>user_id</th>
            <th>run_id</th>
            <th>admin_role</th>
            <th>created_at</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{runAdminsRows}</tbody>
      </Table>
    </section>
  );
};

export default RawRunAdminsTable;
