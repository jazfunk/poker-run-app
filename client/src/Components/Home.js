import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import logo from "../Images/PokerRunKingLOGO_NEW.png";
// import LogIn from "../Login";

class Home extends Component {
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

  componentDidMount = async () => {
    this.importSavedState();
  };

  handleSubmit = (event) => {
    console.log("clicked");
  };

  handleChange = (event) => {};

  componentDidUpdate = () => {
    // Update local storage with
    // data held in state    
    if (this.state.isLoggedIn) {
      console.log("Logged In")
    } else {
      console.log("Not Logged In")
    }
  };

  saveLocal = (stateItem, stateValue) => {
    localStorage.setItem(stateItem, JSON.stringify(stateValue));
  };

  render() {
    return (
      <section>
        <Card className="app-home">
          <Card.Img variant="top" src={logo} />
          <Card.Body>
            <Card.Title>Welcome!</Card.Title>
            <Card.Text>
              This component will determine if the user is logged in. If so,
              direct to events user is signed up for.
            </Card.Text>
            <Button onClick={this.handleSubmit} variant="primary">Sign In</Button>
          </Card.Body>
        </Card>
      </section>
    );
  }
}

export default Home;
