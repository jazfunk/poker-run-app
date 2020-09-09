import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import moment from "moment";

const RawRunAdminsTable = (props) => {
  let runAdminsRows = props.admins.map((admin, index) => {
    const createdAtMoment = moment(admin.created_at);
    const timeFormat = "MM-DD-YYYY hh:mm a";
    
    return (
      <tr key={index}>
        <td>{admin.id}</td>
        <td>{admin.user_id}</td>
        <td>{admin.full_name}</td>
        <td>{admin.run_id}</td>
        <td>{admin.run_name}</td>
        <td>{admin.admin_role}</td>
        <td>{createdAtMoment.format(timeFormat)}</td>
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
      Raw Run Admins Table
      <Table className="table-dark table-striped table-borderless table-hover table-bg-trans text-nowrap">
        <thead className="thead-dark">
          <tr>
            <th>run_admins.id</th>
            <th>run_admins.user_id</th>
            <th>users.full_name</th>
            <th>run_admins.run_id</th>
            <th>runs.run_name</th>
            <th>run_admins.admin_role</th>
            <th>run_admins.created_at</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{runAdminsRows}</tbody>
      </Table>
    </section>
  );
};

export default RawRunAdminsTable;
