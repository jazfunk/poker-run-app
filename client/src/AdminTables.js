import React, { Component } from "react";
import axios from "axios";
import RawUsersTable from "./Components/TableComponents/RawUsersTable";
import RawHandsTable from "./Components/TableComponents/RawHandsTable";
import RawHandCardsTable from "./Components/TableComponents/RawHandCardsTable";
import RawRunsTable from "./Components/TableComponents/RawRunsTable";
import RawRunAdminsTable from "./Components/TableComponents/RawRunAdminsTable";
import RawCardsTable from "./Components/TableComponents/RawCardsTable";
import { Redirect } from "react-router-dom";

class AdminTables extends Component {
  port = process.env.PORT || 5000;
  ADMIN_DASHBOARD = "/api/dashboard";

  constructor(props) {
    super(props);
    this.importSavedState();
  }

  importSavedState = () => {
    const localState =
      JSON.parse(window.localStorage.getItem("localState")) || [];

    if (localState.length > 0 || localState.constructor === Object) {
      console.log(localState);
      this.state = {
        email: localState.email || "",
        full_name: localState.full_name || "",
        isLoggedIn: localState.isLoggedIn || false,
        password: localState.password || "",
        userId: localState.userId || 0,
        users: localState.users || [],
        dashBoard: localState.dashBoard || {},
        handCards: localState.handCards || [],
        admins: localState.admins || [] , 
        runs: localState.runs || [],    
        hands: localState.hands || [],
        cards: localState.cards || [],
      };
    } else {
      this.state = {
        dashBoard: {},
        isLoggedIn: false,
        users: [],
        selectedUser: "",
        selectedRun: 1,
        runs: [],
        admins: [],
        handCards: [],
        cards: [],
        hands: [],
      };
    }
  };

  componentDidMount = () => {
    if (this.state.isLoggedIn) {
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
  componentDidUpdate = () => {
    this.saveLocal();
  };

  saveLocal = () => {
    localStorage.setItem("localState", JSON.stringify(this.state));
  };

  render() {
    // debugger;
    const isLoggedOut = !this.state.isLoggedIn ? (
      <Redirect to="/login" />
    ) : null;
    return (
      <>
        {isLoggedOut}
        <section>
          {console.log("AdminTables")}
          <section className="admin-tables">
            AdminTables
            <RawUsersTable
              users={this.state.users}
              deleteUser={this.deleteUser}
            />
            <RawHandsTable
              hands={this.state.hands}
              deleteHand={this.deleteHand}
            />
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
        </section>
      </>
    );
  }
}

export default AdminTables;
