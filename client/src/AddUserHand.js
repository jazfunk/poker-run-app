import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

class AddUserHand extends Component {
  USERS_FULL_NAME_URL = "/api/fullnames/";
  RUNS_URL = "/api/runs/";
  ADD_USERS_HAND = "/api/hands/";
  USERS_HANDS_COUNT_URL = "/api/handsuser/";

  constructor(props) {
    super(props);
    this.state = {
      usersFullNamesUrl: this.USERS_FULL_NAME_URL,
      addUserHandUrl: this.ADD_USERS_HAND,
      runsUrl: this.RUNS_URL,
      userHandsCounturl: this.USERS_HANDS_COUNT_URL,
      users: [],
      selectedUser: "",
      runs: [],
      selectedRun: "",
    };
  }

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
      });
    }
  };

  componentDidMount = () => {
    this.loadUsers();
    this.loadRuns();

    // if(props.user.isLoggedIn) {
    //   // Load Run Events (if any) User is signed up for
    //   //
    // }
  };

  loadUsers = () => {
    axios
      .get(`${this.state.usersFullNamesUrl}`)
      .then((response) => {
        this.setState({
          users: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Remove this for initial production deployment
  // Only one run for now, and saves on connections
  loadRuns = () => {
    axios
      .get(`${this.state.runsUrl}`)
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
      return alert("You must select a user - " + selectedUser.value);
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
      .get(`${this.state.userHandsCounturl}${user_id}`)
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
      url: this.state.addUserHandUrl,
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

  componentDidUpdate = () => {};

  render() {
    return (
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
    );
  }
}

export default AddUserHand;
