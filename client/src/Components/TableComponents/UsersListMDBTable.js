import React from "react";
import { MDBDataTable } from "mdbreact";

const UsersListMDBTable = (props) => {
  const data = {
    columns: [
      {
        label: "ID",
        field: "id",
        sort: "asc",
      },
      {
        label: "Name",
        field: "name",
        sort: "asc",
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
      },
      {
        label: "Created",
        field: "createdAt",
        sort: "asc",
      },
    ],
    rows: props.users,
  };

  return (
    <section>
      <MDBDataTable
        className="md-table"
        responsive
        scrollY
        maxHeight="40vh"
        striped
        bordered
        small
        data={data}
      />
    </section>
  );
};

export default UsersListMDBTable;
