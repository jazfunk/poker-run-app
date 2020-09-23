import React, { Component } from "react";

class ValidateStop extends Component {
  STOP_ID = 1;

  constructor(props) {
    super(props);
    this.importSavedState();
    // this.STOP_ID = props.stopId > 0 ? props.stopId : 1;
  }

  componentDidMount = () => {
    if (this.state.isLoggedIn) {
    }
  };

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
        isAdmin: localState.isAdmin || false,
        password: localState.password || "",
        userId: localState.userId || 0,
        allCards: localState.allCards || [],
        allHands: localState.allHands || [],
        randomDeck: localState.randomDeck || [],
        stopId: localState.stopId || 1,
      };
    } else {
      this.state = {
        isLoggedIn: false,
        allHands: [],
        allCards: [],
      };
    }
  };

  handleClick = (event) => {
    const stopId = parseInt(event.target.id);
    console.log(stopId);
    this.setState({
      stopId: stopId,
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
    return (
      <section className="form-container">
        <div onClick={this.handleClick} id="1">
          Stop #1
        </div>
        <div onClick={this.handleClick} id="2">
          Stop #2
        </div>
        <div onClick={this.handleClick} id="3">
          Stop #3
        </div>
        <div onClick={this.handleClick} id="4">
          Stop #4
        </div>
        <div onClick={this.handleClick} id="5">
          Stop #5
        </div>
        <h1>{this.state.stopId}</h1>
      </section>
    );
  }
}

export default ValidateStop;
