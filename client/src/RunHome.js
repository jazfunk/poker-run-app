import React, { Component } from "react";
import axios from "axios";
import UserHandComponent from "./Components/UserHandComponent";
import { Redirect } from "react-router-dom";
import { USERS_HAND_URL, USER_HANDS_URL } from "./API_Config";

class RunHome extends Component {
  USERS_HAND_URL = USERS_HAND_URL;
  USER_HANDS_URL = USER_HANDS_URL;

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
        allCards: localState.allCards || [],
        allHands: localState.allHands || [],
      };
    } else {
      this.state = {
        isLoggedIn: false,
        allHands: [],
        allCards: [],
      };
    }
  };

  componentDidMount = async () => {
    if (this.state.isLoggedIn) {

      // Cover each card until user "Deals"

      this.loadAllHandsByUser();
      this.loadHandsUser();
    }
  };

  // Joined data
  loadAllHandsByUser = () => {
    axios
      .get(`${this.USERS_HAND_URL}${this.state.userId}`)
      .then((response) => {
        this.setState({
          allCards: response.data,
          handsCount: (response.data.length / 5),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Raw table data for form select element
  loadHandsUser = () => {
    axios
      .get(`${this.USER_HANDS_URL}${this.state.userId}`)
      .then((response) => {
        this.setState({
          allHands: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (event) => {};
  handleSubmit = (event) => {};

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
            <UserHandComponent
              handCards={this.state.allCards}
              handsCount={this.state.handsCount}
              fullName={this.state.full_name}
            />
          </section>
        </section>
      </>
    );
  }
}

export default RunHome;
