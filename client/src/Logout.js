import React, { Component } from "react";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    }
  }

  componentDidMount = () => {
    localStorage.setItem("localState", JSON.stringify(this.state));
  };

  render() {
    return (
      <section className="main-app">
        You've been successfully logged out.
      </section>
    );
  }
}

export default Logout;
