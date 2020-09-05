import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import moment from "moment";

const RawUsersTable = (props) => {
  
  let usersRows = props.users.map((user, index) => {    
    const dateMoment = moment(user.created_at);
    return (
      <tr key={index}>
        <td>{user.id}</td>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
        <td>{dateMoment.format("MM-DD-YYYY hh:mm a")}</td>
        <td>{<Button onClick={props.deleteUser} variant="light">Remove</Button>}</td>
      </tr>
    );
  });

  usersRows =
    usersRows.length === 0 ? (
      <tr>
        <td coolspan="3">No Users found!</td>
      </tr>
    ) : (
      usersRows
    );

  return (
    <section className="body-main-table table-responsive">
      <Table className="table-dark table-striped table-borderless table-hover table-bg-trans text-nowrap">
        <thead className="thead-dark">
          <tr>
            <th>id</th>
            <th>first_name</th>
            <th>last_name</th>
            <th>email</th>
            <th>created_at</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{usersRows}</tbody>
      </Table>
    </section>
  );
};

export default RawUsersTable;
