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
    this.importSavedState();
  }

  componentDidUpdate = () => {}

  saveLocal = (stateItem, stateValue) => {
    localStorage.setItem(stateItem, JSON.stringify(stateValue))
  }

  render() {
    return <section className="main-app">Logout</section>
  }

  
}

export default Logout;