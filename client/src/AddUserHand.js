import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import moment from "moment";
import HandsMDBTable from "./Components/TableComponents/HandsMDBTable";
import axios from "axios";
import { Redirect } from "react-router-dom";
import {
  FULL_NAMES_URL,
  RUNS_URL,
  ADD_USERS_HAND,
  USER_HANDS_URL,
  ADMIN_DASHBOARD,
} from "./API_Config";

class AddUserHand extends Component {
  FULL_NAMES_URL = FULL_NAMES_URL;
  RUNS_URL = RUNS_URL;
  ADD_USERS_HAND = ADD_USERS_HAND;
  USER_HANDS_URL = USER_HANDS_URL;
  ADMIN_DASHBOARD = ADMIN_DASHBOARD;

  DISPLAY_USER_INFO = "";

  DEALING_ENABLED = false;

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
        password: localState.password || "",
        userId: localState.userId || 0,
        // selectedUser: localState.selectedUser || "",
        selectedRun: localState.selectedRun || 1,
        handsCount: localState.handsCount || 0,
        randomDeck: localState.randomDeck || [],
        stopId: localState.stopId || 1,
      };
    } else {
      this.state = {
        isLoggedIn: false,
        selectedUser: "",
        selectedRun: 1,
      };
    }
  };

  loadDashboard = () => {
    axios
      .get(this.ADMIN_DASHBOARD)
      .then((response) => {
        console.log(`Dashboard reloaded`);
        this.setState({
          dashBoard: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount = () => {
    if (this.state.isLoggedIn) {
      this.loadDashboard();
      this.getHandsDisplay();
    }
  };

  getHandsDisplay = () => {    
    const hands = [...this.state.dashBoard.hands];
    const displayHands = [];
    hands.forEach((hand) => {
      let dateMoment = moment(hand.created_at);
      const builtHand = {
        id: hand.id,
        name: hand.full_name,
        handNumber: hand.hand_number,
        runName: hand.run_name,
        createdAt: dateMoment.format("MM-DD-YYYY hh:mm a"),
      };
      displayHands.push(builtHand);
    });
    this.setState({
      displayHands: displayHands,
    })
  };

  handleUserSelect = async (event) => {
    event.preventDefault();
    const selectedUser = event.target.selectedOptions[0];
    if (selectedUser.textContent === "Select User") {
      return alert("Select a valid user");
    }
    console.log(
      `Selected user: ${selectedUser.textContent} - ${selectedUser.value}`
    );

    this.getUserHandsCount(selectedUser.value);

    this.setState({
      selectedUser: selectedUser.value,
      selectedUserName: selectedUser.textContent,
    });

    this.DEALING_ENABLED = true;
  };

  handleRunSelect = (event) => {
    event.preventDefault();
    const selectedRun = event.target.selectedOptions[0];

    if (selectedRun.textContent === "Select Run") {
      return alert("Select a valid run");
    }

    console.log(`Selected Run: ${selectedRun.textContent}`);
    this.setState({
      selectedRun: selectedRun.value,
      selectedRunName: selectedRun.textContent,
    });
  };

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    // event.preventDefault();
    event.target.reset();

    if (!this.DEALING_ENABLED) {
      return;
    }

    if (this.state.selectedUser && this.state.selectedRun) {
      const nextHand = this.state.handsCount + 1;
      const hand = {
        user_id: this.state.selectedUser,
        run_id: this.state.selectedRun,
        hand_rank: 1,
        hand_number: nextHand,
      };
      this.postNewUserHand(hand);

      alert(`SUCCESS:  Hand#${hand.hand_number} has been added.`);
    } else {
      console.log("No user (or run) selected");
    }
  };

  getUserHandsCount = (user_id) => {
    axios
      .get(`${this.USER_HANDS_URL}${user_id}`)
      .then((response) => {
        const handCount = response.data.length;
        // console.log(response.data.length);
        this.DISPLAY_USER_INFO = `Total Hands:  ${handCount} - Click Submit to add #${
          handCount + 1
        }`;
        this.setState({
          handsCount: handCount,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  postNewUserHand = (hand) => {
    var data = JSON.stringify(hand);
    var config = {
      method: "post",
      url: this.ADD_USERS_HAND,
      headers: {
        "Content-Type": "Application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(`New User Hand Added`);
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
          <section className="form-container">
            <Form onSubmit={this.handleSubmit}>
              <Form.Row>
                <Form.Group controlId="frmRunSelect">
                  <select
                    name="selectedRun"
                    className="form-control"
                    defaultValue={this.state.selectedRun}
                    onChange={this.handleRunSelect}
                  >
                    <option>Select Run</option>
                    {this.state.dashBoard.runs.map((run) => (
                      <option key={run.id} value={run.id}>
                        {run.run_name}
                      </option>
                    ))}
                  </select>
                </Form.Group>
                &nbsp;&nbsp;&nbsp;
                <Form.Group controlId="frmUserSelect">
                  <select
                    name="selectedUser"
                    className="form-control"
                    defaultValue={this.state.selectedUser}
                    onChange={this.handleUserSelect}
                  >
                    <option>Select User</option>
                    {this.state.dashBoard.users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.first_name} {user.last_name}
                      </option>
                    ))}
                  </select>
                </Form.Group>
                &nbsp;&nbsp;&nbsp;
                <Form.Group controlId="frmAddUserHandButton">
                  <Button variant="light" type="submit">
                    Submit Hand
                  </Button>
                </Form.Group>
              </Form.Row>
            </Form>
            <p>{this.DISPLAY_USER_INFO}</p>
          </section>
          <section>
            <HandsMDBTable hands={this.state.displayHands} />
          </section>
        </section>
      </>
    );
  }
}

export default AddUserHand;
