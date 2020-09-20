import React from "react";
import { MDBDataTable } from "mdbreact";

const HandsMDBTable = (props) => {
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
        label: "Hand #",
        field: "handNumber",
        sort: "asc",
      },
      {
        label: "Run",
        field: "runName",
        sort: "asc",
      },
      {
        label: "Created",
        field: "createdAt",
        sort: "asc",
      },
    ],
    rows: props.hands,
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

export default HandsMDBTable;
