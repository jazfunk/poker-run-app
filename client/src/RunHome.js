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
      this.state = {
        email: localState.email || "",
        isLoggedIn: localState.isLoggedIn || false,
        password: localState.password || "",
        userId: localState.userId || 0,
        users: [],
        hands: [],
      };
    } else {
      this.setState({
        isLoggedIn: false,
        users: [],
        hands: [],
      })
    }
  };

  constructor(props) {
    super(props);

    // I expect to use props 
    // at some point in this constructor
    this.importSavedState();
  }

  componentDidMount = async () => {
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
