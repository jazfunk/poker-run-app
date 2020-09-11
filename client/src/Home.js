import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import logo from "./Images/PokerRunKingLOGO_NEW.png";
import { Redirect } from "react-router-dom";

class Home extends Component {
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
      };
    } else {
      this.state = {
        isLoggedIn: false,
      };
    }
  };

  componentDidMount = async () => {};
  handleSubmit = (event) => {};
  handleChange = (event) => {};

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
          <Card className="app-home">
            <Card.Img variant="top" src={logo} />
            <Card.Body>
              <Card.Title>Welcome {this.state.full_name}!</Card.Title>
              <Card.Text>Go to 'My Hand' to see your cards</Card.Text>
            </Card.Body>
          </Card>
        </section>
      </>
    );
  }
}

export default Home;
