import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import ChangePasswordComponent from "./Components/ChangePasswordComponent";
import { UPDATE_USER_URL } from "./API_Config";

class ChangePassword extends Component {
  UPDATE_USER_URL = UPDATE_USER_URL;

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
        edit_email: localState.edit_email || "",
        full_name: localState.full_name || "",
        edit_first_name: localState.edit_first_name || "",
        edit_last_name: localState.edit_last_name || "",
        isLoggedIn: localState.isLoggedIn || false,
        isAdmin: localState.isAdmin || false,
        password: localState.password || "",
        edit_password: localState.edit_password || "",
        passwordConfirm: localState.passwordConfirm || "",
        edit_passwordConfirm: localState.edit_passwordConfirm || "",
        userId: localState.userId || 0,
        // userId: 2,
        allCards: localState.allCards || [],
        allHands: localState.allHands || [],
        randomDeck: localState.randomDeck || [],
        stopId: localState.stopId || 1,
        hasBeenUpdated: localState.hasBeenUpdated || false,
      };
    } else {
      this.state = {
        isLoggedIn: false,
      };
    }
  };

  componentDidMount = () => {
    if (this.state.isLoggedIn) {
      this.buildUser();
      this.setState({
        edit_password: "",
        edit_passwordConfirm: "",
        hasBeenUpdated: false,
      });
    }
  };

  validatePassword = () => {
    const passwordTrimmed = this.state.edit_password.trim();
    const passwordConfirmTrimmed = this.state.edit_passwordConfirm.trim();
    return passwordTrimmed != passwordConfirmTrimmed;
  };

  buildUser = () => {
    const users = [...this.state.dashBoard.users];
    const existingUser = users.filter((user) => {
      return user.id === this.state.userId;
    });

    this.setState({
      edit_first_name: existingUser[0].first_name,
      edit_last_name: existingUser[0].last_name,
      edit_email: existingUser[0].email,
      edit_password: "",
      edit_passwordConfirm: "",
    });
  };

  updateUser = (user) => {
    const doPasswordsMatch = this.validatePassword();

    if (doPasswordsMatch) {
      return alert("Passwords do not match");
    } else {
      var data = JSON.stringify(user);
      var config = {
        method: "put",
        url: `${this.UPDATE_USER_URL}${this.state.userId}`,
        headers: {
          "Content-Type": "Application/json",
        },
        data: data,
      };

      axios(config)
        .then((response) => {
          alert(`Your account has been updated.`);
          this.setState({
            password: "hidden",
            confirmPassword: "",
            hasBeenUpdated: true,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const updatedUser = {
      first_name: this.state.edit_first_name,
      last_name: this.state.edit_last_name,
      email: this.state.edit_email,
      password: this.state.edit_password,
    };

    this.updateUser(updatedUser);
  };

  componentDidUpdate = () => {
    this.saveLocal();
  };

  saveLocal = () => {
    localStorage.setItem("localState", JSON.stringify(this.state));
  };

  render() {
    const hasBeenUpdated = this.state.hasBeenUpdated ? (
      <Redirect to="/" />
    ) : null;

    const isLoggedOut = !this.state.isLoggedIn ? (
      <Redirect to="/login" />
    ) : null;

    return (
      <>
        {isLoggedOut}
        {hasBeenUpdated}
        <section>
          <ChangePasswordComponent
            edit_first_name={this.state.edit_first_name}
            edit_last_name={this.state.edit_last_name}
            edit_email={this.state.edit_email}
            edit_password={this.state.edit_password}
            edit_passwordConfirm={this.state.edit_passwordConfirm}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </section>
      </>
    );
  }
}
export default ChangePassword;
