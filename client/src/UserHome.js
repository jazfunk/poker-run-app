import React, { Component } from "react";

class UserHome extends Component {

  componentDidMount = () => {};

  handleChange = (event) => {};
  handleSubmit = (event) => {};

  componentDidUpdate = () => {};

  saveLocal = (stateItem, stateValue) => {
    localStorage.setItem(stateItem, JSON.stringify(stateValue));
  };

  render() {
    return <section>UserHome</section>;
  }
}

export default UserHome;
