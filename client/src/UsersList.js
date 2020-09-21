import React, { Component } from "react";
// import Button from "react-bootstrap/Button";
// import UsersTable from "./Components/TableComponents/UsersTable";
import UsersListMDBTable from "./Components/TableComponents/UsersListMDBTable";
import moment from "moment";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { ADD_USER_URL, ADMIN_DASHBOARD } from "./API_Config";

class UsersList extends Component {
  USERS_URL = ADD_USER_URL;
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
        users: localState.users || [],
        hands: localState.hands || [],
        userSearch: localState.userSearch || "",
        randomDeck: localState.randomDeck || [],
        stopId: localState.stopId || 1,
      };
    } else {
      this.state = {
        isLoggedIn: false,
        users: [],
        hands: [],
        userSearch: "",
      };
    }
  };

  componentDidMount = () => {
    if (this.state.isLoggedIn) {
      this.loadDashboard();
      this.getUsersDisplay();
    }
  };

  getUsersDisplay = () => {
    const users = [...this.state.dashBoard.users]
    const usersDisplay = [];
    users.forEach((user) => {
      let dateMoment = moment(user.created_at);
      let name = `${user.first_name} ${user.last_name}`
      const builtUser = {
        id: user.id,
        name: name,
        email: user.email,
        createdAt: dateMoment.format("MM-DD-YYYY hh:mm a"),
      }
      usersDisplay.push(builtUser)
    })
    this.setState({
      usersDisplay: usersDisplay,
    })
  }

  loadDashboard = () => {
    axios
      .get(this.ADMIN_DASHBOARD)
      .then((response) => {
        this.setState({
          dashBoard: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (event) => {
    this.setState({
      userSearch: event.target.value,
    });
  };

  handleSearch = () => {};

  handleClear = () => {
    if (this.state.userSearch) {
      this.setState({
        userSearch: "",
      });
    }
  };

  handlePrevious = (event) => {};
  handleNext = (event) => {};

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
          <section>
            <UsersListMDBTable users={this.state.usersDisplay} />
          </section>
        </section>
      </>
    );
  }
}

export default UsersList;
