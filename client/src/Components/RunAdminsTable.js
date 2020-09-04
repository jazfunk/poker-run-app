import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const RunAdminsTable = (props) => {
  let runAdminRows = props.runAdmins.map((admin, index) => {
    return (
      <tr key={index}>
        <td>{admin.full_name}</td>
        <td>{admin.run_description}</td>
        <td>{admin.admin_role}</td>
        <td>{<Button onClick={props.deleteAdmin} variant="light">Remove</Button>}</td>
      </tr>
    );
  });

  runAdminRows =
    runAdminRows.length === 0 ? (
      <tr>
        <td coolspan="3">No Run Administrators found!</td>
      </tr>
    ) : (
      runAdminRows
    );

  return (
    <section className="body-main-table table-responsive">
      <Table className="table-dark table-striped table-borderless table-hover table-bg-trans text-nowrap">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Run Event</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{runAdminRows}</tbody>
      </Table>
    </section>
  );
};

export default RunAdminsTable;
