import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
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
        users: localState.users || [],
        selectedUser: localState.selectedUser || "",
        selectedRun: localState.selectedRun || 1,
        runs: localState.runs || [],
        runAdmins: localState.runAdmins || [],
        handsCount: localState.handsCount || 0,
      };
    } else {
      this.state = {
        isLoggedIn: false,
        users: [],
        selectedUser: "",
        selectedRun: 1,
        runs: [],
        runAdmins: [],
      };
    }
  };

  componentDidMount = () => {
    if (this.state.isLoggedIn) {
      this.loadUsers();
      this.loadRuns();
    }
  };

  loadUsers = () => {
    axios
      .get(`${this.FULL_NAMES_URL}`)
      .then((response) => {
        this.setState({
          users: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  loadRuns = () => {
    axios
      .get(`${this.RUNS_URL}`)
      .then((response) => {
        this.setState({
          runs: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleUserSelect = async (event) => {
    event.preventDefault();
    const selectedUser = event.target.selectedOptions[0];
    if (selectedUser.textContent === "Select User") {
      return alert("Select a valid user");
    }

    console.log(
      `Selected user: ${selectedUser.textContent}-${selectedUser.value}`
    );

    this.getUserHandsCount(selectedUser.value);

    this.setState({
      selectedUser: selectedUser.value,
      selectedUserName: selectedUser.textContent,
    });
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
    event.preventDefault();
    event.target.reset();

    const nextHand = this.state.handsCount + 1;

    const hand = {
      user_id: this.state.selectedUser,
      run_id: this.state.selectedRun,
      hand_rank: 1,
      hand_number: nextHand,
    };

    this.postNewUserHand(hand);
  };

  getUserHandsCount = (user_id) => {
    axios
      .get(`${this.USER_HANDS_URL}${user_id}`)
      .then((response) => {
        console.log(response.data.length);
        this.setState({
          handsCount: response.data.length,
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
                  {this.state.runs.map((run) => (
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
                  {this.state.users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.full_name}
                    </option>
                  ))}
                </select>
              </Form.Group>
              &nbsp;&nbsp;&nbsp;
              <Form.Group controlId="frmAddUserHandButton">
                <Button variant="light" type="submit">
                  Submit Hand #{this.state.handsCount + 1 || "?"}
                </Button>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group>
                <Form.Label>{`${this.state.selectedUserName} currently has ${this.state.handsCount} hand(s)`}</Form.Label>
              </Form.Group>
            </Form.Row>
          </Form>
          <section>--Add Table Component--</section>
        </section>
      </>
    );
  }
}

export default AddUserHand;
