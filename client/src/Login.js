import React, { Component } from "react";
import LoginForm from "./Components/LoginForm";
import axios from "axios";

class Login extends Component {
  port = process.env.PORT || 5000;
  LOGIN_URL = "/api/user/login";

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

  componentDidMount = () => {
    this.importSavedState();
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
        const id = response.data;
        if (id < 0) {
          return alert("That email address doesn't exist in our records");
        }
        if (id > 0) {
          alert("Logged in successfully");
          this.setState({
            userName: response.data.full_name,
            isLoggedIn: true,
            userId: id,
            password: "hidden",
          });
        } else {
          alert("Wrong password");
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidUpdate = () => {
    this.saveLocal();
    if (this.state.isLoggedIn) {
      window.location.reload(true);
    }
  };

  saveLocal = () => {
    localStorage.setItem("localState", JSON.stringify(this.state));
  };

  render() {
    return (
      <section>
        <LoginForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </section>
    );
  }
}

export default Login;
