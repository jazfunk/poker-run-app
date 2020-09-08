import React, { Component } from "react";
import LoginForm from "./Components/LoginForm";
import axios from "axios";

class Login extends Component {
  port = process.env.PORT || 5000;
  LOGIN_URL = "/api/user/login";

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    }
  }

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
        const id = parseInt(response.data);
        if (id < 0) {
          alert("That email address doesn't exist in our records")
        }

        if (id > 0) {
          alert("Logged in successfully")
          this.setState({
            isLoggedIn: true,
            userId: id,
          })
        } else {
          alert("Wrong password")
        }

        
        console.log(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  componentDidUpdate = () => {};

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
