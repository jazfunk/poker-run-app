import React from "react";
import { MDBDataTable } from "mdbreact";

const HandsCardsMDBTable = (props) => {
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
        label: "Hand ID",
        field: "handId",
        sort: "asc",
      },
      {
        label: "Hand #",
        field: "handNumber",
        sort: "asc",
      },
      {
        label: "Hand",
        field: "handDisplay",
        sort: "asc",
      },
      {
        label: "Created",
        field: "createdAt",
        sort: "asc",
      },
    ],
    rows: props.handCards,
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

export default HandsCardsMDBTable;
