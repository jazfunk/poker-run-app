import React from "react";
import Table from "react-bootstrap/Table";

const UsersTable = (props) => {
  let userRows = props.users.map((user, index) => {
    return (
      <tr key={index}>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
      </tr>
    );
  });

  userRows =
    userRows.length === 0 ? (
      <tr>
        <td coolspan="3">No users found!</td>
      </tr>
    ) : (
      userRows
    );

  return (
    <section className="body-main-table table-responsive">
      <Table className="table-dark table-striped table-borderless table-hover table-bg-trans text-nowrap">
        <thead className="thead-dark">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>email</th>
          </tr>
        </thead>
        <tbody>{userRows}</tbody>
      </Table>
    </section>
  );
};

export default UsersTable;