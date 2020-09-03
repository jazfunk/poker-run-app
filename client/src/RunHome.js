import React, { Component } from "react";
import axios from "axios";
import UserHandRow from "./Components/UserHandComponent";
// import HandsDashboard from "./Components/HandsDashboard";

class RunHome extends Component {
  port = process.env.PORT || 5000;
  USERS_HAND_URL = "/api/usershand/";
  HANDS_USER_URL = "/api/handsuser/";

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      user: 2,
      users: [],
      hands: [],
      userHands: [],
    };
  }

  componentDidMount = () => {
    this.loadAllHandsByUser();
    this.loadHandsUser();
  };

  // Joined data
  loadAllHandsByUser = () => {
    axios
      .get(`${this.USERS_HAND_URL}${this.state.user}`)
      .then((response) => {
        this.setState({
          hands: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Raw table data for form select element
  loadHandsUser = () => {
    axios
      .get(`${this.HANDS_USER_URL}${this.state.user}`)
      .then((response) => {
        this.setState({
          userHands: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (event) => {};
  handleSubmit = (event) => {};

  handleSelect = (event) => {
    const selectedHand = event.target.selectedOptions[0];
    this.setState({
      hand_id: selectedHand.value,
    });
    console.log(`Hand Selected: ${selectedHand.textContent}`);
  };

  componentDidUpdate = () => {};

  render() {
    return (
      <section>
        {/* <HandsDashboard
          userHands={this.state.userHands}
          hands_id={this.state.hands_id}
          handleSelect={this.handleSelect}
        /> */}
        <UserHandRow hands={this.state.hands} />
      </section>
    );
  }
}

export default RunHome;
