import React, { Component } from "react";
import axios from "axios";
import RawUsersTable from "./Components/TableComponents/RawUsersTable";
import RawHandsTable from "./Components/TableComponents/RawHandsTable";
import RawHandCardsTable from "./Components/TableComponents/RawHandCardsTable";
import RawRunsTable from "./Components/TableComponents/RawRunsTable";
import RawRunAdminsTable from "./Components/TableComponents/RawRunAdminsTable";
import RawCardsTable from "./Components/TableComponents/RawCardsTable";
import { Redirect } from "react-router-dom";
import { ADMIN_DASHBOARD } from "./API_Config";

class AdminTables extends Component {
  // port = API_PORT;
  ADMIN_DASHBOARD = ADMIN_DASHBOARD;

  constructor(props) {
    super(props);
    this.importSavedState();
  }

  importSavedState = () => {
    const localState =
      JSON.parse(window.localStorage.getItem("localState")) || [];

    const dashBoardInitial = {
      users: [],
      hands: [],
      handCards: [],
      runs: [],
      runAdmins: [],
      cards: [],
    };

    if (localState.length > 0 || localState.constructor === Object) {
      this.state = {
        dashBoard: localState.dashBoard || dashBoardInitial,
        email: localState.email || "",
        full_name: localState.full_name || "",
        isLoggedIn: localState.isLoggedIn || false,
        password: localState.password || "",
        userId: localState.userId || 0,
        // users: localState.users || [],
        // handCards: localState.handCards || [],
        // admins: localState.admins || [],
        // runs: localState.runs || [],
        // hands: localState.hands || [],
        // cards: localState.cards || [],
      };
    } else {
      this.state = {
        dashBoard: dashBoardInitial,
        isLoggedIn: false,
        // users: [],
        selectedUser: "",
        selectedRun: 1,
        // runs: [],
        // admins: [],
        // handCards: [],
        // cards: [],
        // hands: [],
      };
    }
  };

  componentDidMount = () => {
    if (this.state.isLoggedIn) {

      // Check if dashBoard is empty
      // if not, don't reload it
      this.loadDashboard();
    }
  };

  handleChange = (event) => {};
  handleSubmit = (event) => {};

  loadDashboard = () => {
    axios
      .get(this.ADMIN_DASHBOARD)
      .then((response) => {
        this.setState({
          dashBoard: response.data,
          // users: response.data.users,
          // hands: response.data.hands,
          // handCards: response.data.handCards,
          // runs: response.data.runs,
          // admins: response.data.runAdmins,
          // cards: response.data.cards,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteUser = (event) => {
    console.log(
      "Delete functionality has been disabled. \nRemove button clicked"
    );
  };

  deleteHand = (event) => {
    console.log(
      "Delete functionality has been disabled. \nRemove button clicked"
    );
  };

  deleteHandsCard = (event) => {
    console.log(
      "Delete functionality has been disabled. \nRemove button clicked"
    );
  };

  deleteRun = (event) => {
    console.log(
      "Delete functionality has been disabled. \nRemove button clicked"
    );
  };

  deleteRunAdmin = (event) => {
    console.log(
      "Delete functionality has been disabled. \nRemove button clicked"
    );
  };
  componentDidUpdate = () => {
    this.saveLocal();
  };

  saveLocal = () => {
    localStorage.setItem("localState", JSON.stringify(this.state));
  };

  render() {
    const isLoggedOut = !this.state.isLoggedIn ? (
      <Redirect to="/login" />
    ) : null;
    return (
      <>
        {isLoggedOut}
        <section>
          <section className="admin-tables">
            AdminTables
            <RawUsersTable
              users={this.state.dashBoard.users}
              deleteUser={this.deleteUser}
            />
            <RawHandsTable
              hands={this.state.dashBoard.hands}
              deleteHand={this.deleteHand}
            />
            <RawHandCardsTable
              handCards={this.state.dashBoard.handCards}
              deleteHandsCard={this.deleteHandsCard}
            />
            <RawRunsTable runs={this.state.dashBoard.runs} deleteRun={this.deleteRun} />
            <RawRunAdminsTable
              admins={this.state.dashBoard.runAdmins}
              deleteRunAdmin={this.deleteRunAdmin}
            />
            <RawCardsTable cards={this.state.dashBoard.cards} />
          </section>
        </section>
      </>
    );
  }
}

export default AdminTables;
