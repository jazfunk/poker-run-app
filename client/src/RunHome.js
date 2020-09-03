import React, { Component } from "react";
import axios from "axios";
import RunUserHands from "./Components/RunUserHands";

class RunHome extends Component {
  port = process.env.PORT || 5000;
  // TODO:  User is hard coded, need to get from props or state
  USERS_HAND_URL = `/api/usershand/`;

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      user: 2,
      hands: [],
    };
  }

  componentDidMount = () => {
    if(this.state.isLoggedIn) {
      // Load users hands for this event
      // Show top three winning hands
      // Show a row of cards for each hand
      axios
      .get(`${this.USERS_HAND_URL}${this.state.user}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          hands: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  handleChange = (event) => {};
  handleSubmit = (event) => {};

  componentDidUpdate = () => {};

  render() {
    return (
        <RunUserHands hands={this.state.hands} />
    );
  }
}

export default RunHome;
