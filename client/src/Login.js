import React, { Component } from "react";
import LoginForm from "./Components/LoginForm";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { LOGIN_URL } from "./API_Config";

class Login extends Component {
  LOGIN_URL = LOGIN_URL;
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
      };
    } else {
      this.state = {
        isLoggedIn: false,
      };
    }
  };

  componentDidMount = () => {};

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    this.validateUser(user);
  };

  validateUser = (user) => {
    var data = JSON.stringify(user);
    var config = {
      method: "post",
      url: this.LOGIN_URL,
      headers: {
        "Content-Type": "Application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        const id = response.data.user_id;
        if (id < 0) {
          return alert("That email doesn't exist in our records.");
        }
        if (id > 0) {
          alert(`${response.data.full_name} has been logged in.`);
          this.setState({
            full_name: response.data.full_name,
            isLoggedIn: true,
            userId: id,
            password: "hidden",
          });
        } else {
          alert("Wrong password!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidUpdate = () => {
    this.saveLocal();
  };

  saveLocal = () => {
    localStorage.setItem("localState", JSON.stringify(this.state));
  };

  render() {

    const isLoggedIn = this.state.isLoggedIn ? <Redirect to="/" /> : null;
    
    return (
      <>
        {isLoggedIn}
        <section>
          <LoginForm
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
        </section>
      </>
    );
  }
}

export default Login;
