import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import logo from "./Images/PokerRunKingLOGO_NEW.png";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { ADMIN_DASHBOARD } from "./API_Config";
import UserRunsComponent from "./Components/UserRunsComponent";

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
        stopId: localState.stopId || 0,
        showHands: false,
      };
    } else {
      this.state = {
        isLoggedIn: false,
        dashBoard: dashBoardInitial,
      };
    }
  };

  componentDidMount = async () => {
    if (this.state.isLoggedIn) {
      this.loadDashboard();
      this.setAdminStatus();
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
        });
      }
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
   
  };

  handleChange = (event) => {};

  handleCardClick = (event) => {
    this.setState({
      showHands: true,
    })

  }

  componentDidUpdate = () => {
    this.saveLocal();
  };

  saveLocal = () => {
    localStorage.setItem("localState", JSON.stringify(this.state));
  };

  render() {
    const loadHandsPage = this.state.showHands ? (
      <Redirect to="/runhome" />      
    ) : null;

    const isLoggedOut = !this.state.isLoggedIn ? (
      <Redirect to="/login" />
    ) : null;

    return (
      <>
        {isLoggedOut}
        {loadHandsPage}
        <section>
          <Card className="app-home" onClick={this.handleCardClick}>
            <Card.Img variant="top" src={logo} />
            <Card.Body>
              <Card.Title>Welcome {this.state.full_name}!</Card.Title>
              <Card.Text>
                You are signed up for the events listed below.  Click an event to view your hands:
              </Card.Text>
              <UserRunsComponent
                run={this.state.dashBoard.runs[0]}
              />
            </Card.Body>
          </Card>
        </section>
      </>
    );
  }
}

export default Home;
