import React, { Component } from "react"

class Logout extends Component {

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
    // this.importSavedState();
    this.setState({
      isLoggedIn: false,
    })
  }

  componentDidUpdate = () => {
    this.saveLocal();
  }

  saveLocal = () => {
    localStorage.setItem("localState", JSON.stringify(this.state));
  };

  render() {
    return <section className="main-app">You've been successfully logged out.</section>
  }

  
}

export default Logout;