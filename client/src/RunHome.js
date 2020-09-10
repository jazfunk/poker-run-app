import React, { Component } from "react";
import axios from "axios";
import UserHandComponent from "./Components/UserHandComponent";

class RunHome extends Component {
  port = process.env.PORT || 5000;
  USERS_HAND_URL = "/api/usershand/";
  // HANDS_USER_URL = "/api/handsuser/";

  
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

  constructor(props) {
    super(props);
    this.state = {
      userId: 1,
      users: [],
      hands: [],
      // userHands: [],
    };
  }

  componentDidMount = async () => {
    this.importSavedState();
    this.loadAllHandsByUser();
    // this.loadHandsUser();
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
  //     .get(`${this.HANDS_USER_URL}${this.state.user}`)
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

  componentDidUpdate = () => {};

  render() {
    return (
      <section>
        <UserHandComponent hands={this.state.hands} />
      </section>
    );
  }
}

export default RunHome;
