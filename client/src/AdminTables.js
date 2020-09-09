import React, { Component } from "react";
import axios from "axios";
import RawUsersTable from "./Components/RawUsersTable";
import RawHandsTable from "./Components/RawHandsTable";
import RawHandCardsTable from "./Components/RawHandCardsTable";
import RawRunsTable from "./Components/RawRunsTable";
import RawRunAdminsTable from "./Components/RawRunAdminsTable";
import RawCardsTable from "./Components/RawCardsTable";

class AdminTables extends Component {
  port = process.env.PORT || 5000;
  ADMIN_DASHBOARD = "/api/dashboard";

  constructor(props) {
    super(props);
    this.state = {
      dashBoardUrl: this.ADMIN_DASHBOARD,
      dashBoard: {},
      users: [],
      hands: [],
      handCards: [],
      runs: [],
      admins: [],
      cards: [],
    };
  }

  importSavedState = () => {
    const localState =
      JSON.parse(window.localStorage.getItem("localState")) || [];

    if (localState.length > 0 || localState.constructor === Object) {
      console.log(localState);
      this.setState({
        email: localState.email || "",
        isLoggedIn: localState.isLoggedIn || false,
        password: localState.password || "",
        userId: localState.userId || 0,
      });
    } else {
      this.setState({
        isLoggedIn: false,
      })
    }
  };

  componentDidMount = () => {
    this.loadDashboard();
  };

  handleChange = (event) => {};
  handleSubmit = (event) => {};

  loadDashboard = () => {
    axios
      .get(this.state.dashBoardUrl)
      .then((response) => {
        this.setState({
          dashBoard: response.data,
          users: response.data.users,
          hands: response.data.hands,
          handCards: response.data.handCards,
          runs: response.data.runs,
          admins: response.data.runAdmins,
          cards: response.data.cards,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteUser = (event) => {
    console.log("Remove button clicked");
  };

  deleteHand = (event) => {
    console.log("Remove button clicked");
  };

  deleteHandsCard = (event) => {
    console.log("Remove button clicked");
  };

  deleteRun = (event) => {
    console.log("Remove button clicked");
  };

  deleteRunAdmin = (event) => {
    console.log("Remove button clicked");
  };

  componentDidUpdate = () => {};

  render() {
    return (
      <section className="admin-tables">
        AdminTables
        <RawUsersTable users={this.state.users} deleteUser={this.deleteUser} />
        <RawHandsTable hands={this.state.hands} deleteHand={this.deleteHand} />
        <RawHandCardsTable
          handCards={this.state.handCards}
          deleteHandsCard={this.deleteHandsCard}
        />
        <RawRunsTable runs={this.state.runs} deleteRun={this.deleteRun} />
        <RawRunAdminsTable
          admins={this.state.admins}
          deleteRunAdmin={this.deleteRunAdmin}
        />
        <RawCardsTable cards={this.state.cards} />
      </section>
    );
  }
}

export default AdminTables;
