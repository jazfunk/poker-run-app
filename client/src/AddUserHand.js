import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

class AddUserHand extends Component {
  USERS_FULL_NAME_URL = "/api/fullnames/";
  RUNS_URL = "/api/runs/";
  ADD_USERS_HAND = "/api/hands/";

  constructor(props) {
    super(props);
    this.state = {
      usersFullNamesUrl: this.USERS_FULL_NAME_URL,
      addUserHandUrl: this.ADD_USERS_HAND,
      runsUrl: this.RUNS_URL,
      users: [],
      selectedUser: "",
      runs: [],
      selectedRun: "",
      handsNumber: 0,
    };
  }

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

  loadRuns = () => {
    axios
      .get(`${this.state.runsUrl}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          runs: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleUserSelect = (event) => {
    event.preventDefault();
    const selectedUser = event.target.selectedOptions[0];
    console.log(
      `Selected user: ${selectedUser.textContent}-${selectedUser.value}`
    );
    if (selectedUser.textContent === "Select User") {
      return alert("You must select a user - " + selectedUser.value);
    }
    this.setState({
      selectedUser: selectedUser.value,
    });
  };

  handleRunSelect = (event) => {
    event.preventDefault();
    const selectedRun = event.target.selectedOptions[0];
    console.log(`Selected Run: ${selectedRun.textContent}`);
    this.setState({
      selectedRun: selectedRun.value,
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
    // loop through this.state.handsNumber
    for (let i = 0; i < this.state.handsNumber; i++) {
      // TODO:  Need to get number of hands
      // already entered for user
      // If none, then loop this.state.handsNumber of times
      // If hands already entered, find last hand number, add one
      
      // insert hand for each.
      const hand = {
        user_id: this.state.selectedUser,
        run_id: this.state.selectedRun,
        hand_rank: 1,
        hand_number: i + 1,
      };

      this.postNewUserHand(hand);
    }
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
              <Form.Label>Select Run</Form.Label>
              <Form.Control
                name="selectedRun"
                className="controls-space"
                as="select"
                // defaultValue={this.state.selectedRun}
                onChange={this.handleRunSelect}
              >
                <option>Select Run Event</option>
                {this.state.runs.map((run) => (
                  <option key={run.id} value={run.id}>
                    {run.run_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            &nbsp;&nbsp;&nbsp;
            <Form.Group controlId="frmUserSelect">
              <Form.Label>Select User</Form.Label>
              <Form.Control
                name="selectedUser"
                className="controls-space"
                as="select"
                // defaultValue={this.state.selectedUser}
                onChange={this.handleUserSelect}
              >
                <option>Select User</option>
                {this.state.users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.full_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            &nbsp;&nbsp;&nbsp;
            <Form.Group controlId="frmNumberofHands">
              <Form.Label>Number of Hands</Form.Label>
              <Form.Control
                className="controls-space"
                name="handsNumber"
                type="number"
                onChange={this.handleChange}
                defaultValue="1"
              />
            </Form.Group>
            &nbsp;&nbsp;&nbsp;
            <Form.Group controlId="frmAddUserHandButton">
              <Button variant="light" type="submit">
                Add User Hand(s)
              </Button>
            </Form.Group>
          </Form.Row>
        </Form>
        {/* <RunAdminsTable
          runAdmins={this.state.runAdmins}
          deleteAdmin={this.deleteAdmin}
        /> */}
      </section>
    );
  }
}

export default AddUserHand;
