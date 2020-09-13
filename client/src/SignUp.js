import React, { Component } from "react";
import axios from "axios";
import SignUpComponent from "./Components/SignupComponent";
import { Redirect } from "react-router-dom";

class SignUp extends Component {
  port = process.env.PORT || 5000;
  ADD_USER_URL = `/api/users/`;

  constructor(props) {
    super(props);
    this.importSavedState();
  }

  importSavedState = () => {
    const localState =
      JSON.parse(window.localStorage.getItem("localState")) || [];

    if (localState.length > 0 || localState.constructor === Object) {
      this.state = {
        email: localState.email || "",
        full_name: localState.full_name || "",
        isLoggedIn: localState.isLoggedIn || false,
        password: localState.password || "",
        userId: localState.userId || 0,
        users: localState.users || [],
        hands: localState.hands || [],
      };
    } else {
      this.state = {
        isLoggedIn: false,
        users: [],
        hands: [],
      };
    }
  };

  componentDidMount = () => {
    if (this.state.isLoggedIn) {
      // Do stuff
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
    event.target.reset();

    // TODO: 
    // Use validate helper module to 
    // ensure proper data 
    // Check if email already exists
    // add text box for re-typing password

    const user = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
    };

    this.postNewUser(user);
  };

  postNewUser = (user) => {
    debugger;
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
        alert(`${user.first_name}! \n has been signed up`);
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
    const isLoggedOut = !this.state.isLoggedIn ? (
      <Redirect to="/login" />
    ) : null;
    return (
      <>
        {isLoggedOut}
        <section>
          <SignUpComponent
            user={this.state}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
        </section>
      </>
    );
  }
}

export default SignUp;
