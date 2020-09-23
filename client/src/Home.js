import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import logo from "./Images/PokerRunKingLOGO_NEW.png";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { ADMIN_DASHBOARD } from "./API_Config";

class Home extends Component {
  ADMIN_DASHBOARD = ADMIN_DASHBOARD;

  constructor(props) {
    super(props);
    this.importSavedState();
  }  

  importSavedState = () => {
    const localState =
      JSON.parse(window.localStorage.getItem("localState")) || [];

    const dashBoardInitial = {
      users: [],
      hands: [],
      handCards: [],
      runs: [],
      runAdmins: [],
      cards: [],
    };

    if (localState.length > 0 || localState.constructor === Object) {
      this.state = {
        dashBoard: localState.dashBoard || dashBoardInitial,
        email: localState.email || "",
        full_name: localState.full_name || "",
        isLoggedIn: localState.isLoggedIn || false,
        isAdmin: localState.isAdmin || false,
        password: localState.password || "",
        userId: localState.userId || 0,
        randomDeck: localState.randomDeck || [],
        stopId: localState.stopId || 1,
      };
    } else {
      this.state = {
        isLoggedIn: false,
      };
    }
  };

  componentDidMount = async () => {
    // Load up dashBoard here, instead of only in AdminTables
    if (this.state.isLoggedIn) {
      this.loadDashboard();
      this.setAdminStatus();
      // Load up runs by user
      // Display each run signed up in a Card
    }

  };

  loadDashboard = () => {
    axios
      .get(this.ADMIN_DASHBOARD)
      .then((response) => {
        this.setState({
          dashBoard: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  setAdminStatus = () => {
    const runAdmins = [...this.state.dashBoard.runAdmins];
    runAdmins.forEach((admin) => {
      if (admin.user_id == this.state.userId) {
        this.setState({
          isAdmin: true,
        })
      }
    })
  }

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
