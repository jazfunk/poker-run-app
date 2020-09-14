import React, { Component } from "react";
import axios from "axios";
import UserHandComponent from "./Components/UserHandComponent";
import { Redirect } from "react-router-dom";
import { USERS_HAND_URL, USER_HANDS_URL } from "./API_Config";

class RunHome extends Component {
  port = process.env.PORT || 5000;
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

    // change referencing values to dashBoard properties
    if (localState.length > 0 || localState.constructor === Object) {
      this.state = {
        dashBoard: localState.dashBoard || dashBoardInitial,
        email: localState.email || "",
        full_name: localState.full_name || "",
        isLoggedIn: localState.isLoggedIn || false,
        password: localState.password || "",
        userId: localState.userId || 0,
        // users: [],
        // hands: [],
      };
    } else {
      this.state = {
        isLoggedIn: false,
        // users: [],
        // hands: [],
      };
    }
  };

  componentDidMount = async () => {
    if (this.state.isLoggedIn) {
      // Load Standings component
      // Intended to show top five hands ranked in the run
      // Time constraints may require just listing all
      // Load a row for each hand
      // - The loadAllHandsByUser method returns
      // - ALL user hands, needs filtering
      // If no cards in hand, show "deal" button
      // this.loadAllHandsByUser();
      // this.loadHandsUser();
    }
  };

  // Joined data
  loadAllHandsByUser = () => {
    axios
      .get(`${this.USERS_HAND_URL}${this.state.userId}`)
      .then((response) => {
        this.setState({
          hands: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // // Raw table data for form select element
  // loadHandsUser = () => {
  //   axios
  //     .get(`${this.USER_HANDS_URL}${this.state.user}`)
  //     .then((response) => {
  //       this.setState({
  //         userHands: response.data,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  handleChange = (event) => {};
  handleSubmit = (event) => {};

  // handleSelect = (event) => {
  //   const selectedHand = event.target.selectedOptions[0];
  //   this.setState({
  //     hand_id: selectedHand.value,
  //   });
  //   console.log(`Hand Selected: ${selectedHand.textContent}`);
  // };

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
            <UserHandComponent hands={this.state.dashBoard.hands} handCards={this.state.dashBoard.handCards} />
          </section>
        </section>
      </>
    );
  }
}

export default RunHome;
