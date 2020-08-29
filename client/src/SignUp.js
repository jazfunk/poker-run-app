import React, { Component } from "react";
import axios from "axios";
import SignUpComponent from "./Components/SignupComponent";

class SignUp extends Component {
  ADD_USER_URL = "http://localhost:3000/users/";
  isLoggedIn = false;

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      users: [],
    };
  }

  componentDidMount = () => {
    const savedUser = JSON.parse(window.localStorage.getItem("user")) || {};
    this.setState({
      user: savedUser,
    });
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

    debugger;
    const user = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      is_admin: this.state.is_admin,
    };

    this.postNewUser(user);
  };

  postNewUser = (user) => {
    var data = JSON.stringify(user);
    var config = {
      method: "post",
      url: this.ADD_USER_URL,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        alert(`Congratulations, ${user.first_name}! \n You're all signed up`);

        this.setState({
          isLoggedIn: true,
          user: user,
        });
      })

      .catch((error) => {
        console.log(error);
      });
  };

  componentDidUpdate = () => {};

  render() {
    return (
      <SignUpComponent
        user={this.state}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
      />
    );
  }
}

export default SignUp;