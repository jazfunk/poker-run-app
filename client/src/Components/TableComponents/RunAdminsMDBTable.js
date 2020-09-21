import React from "react";
import { MDBDataTable } from "mdbreact";

const RunAdminsMDBTable = (props) => {
  const data = {
    columns: [
      {
        label: "ID",
        field: "id",
        sort: "asc",
      },
      {
        label: "Name",
        field: "full_name",
        sort: "asc",
      },
      {
        label: "Run",
        field: "run_description",
        sort: "asc",
      },
      {
        label: "Role",
        field: "admin_role",
        sort: "asc",
      },
      {
        label: "Created",
        field: "createdAt",
        sort: "asc",
      },
    ],
    rows: props.runAdmins,
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

export default RunAdminsMDBTable;
