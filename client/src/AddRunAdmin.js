import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import RunAdminsTable from "./Components/TableComponents/RunAdminsTable";
import { Redirect } from "react-router-dom";
import {
  ADD_RUN_ADMIN_URL,
  FULL_NAMES_URL,
  RUNS_URL,
  RUN_ADMINS_URL,
} from "./API_Config";

class AddRunAdmin extends Component {
  ADD_RUN_ADMIN_URL = ADD_RUN_ADMIN_URL
  FULL_NAMES_URL = FULL_NAMES_URL;
  RUNS_URL = RUNS_URL;
  RUN_ADMINS_URL = RUN_ADMINS_URL;

  constructor(props) {
    super(props);
    this.importSavedState();
    // Loading each table independently here
    // instead of relying on the dashboard data
    // To ensure fresh data when adding Run admins
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
      this.loadRunAdmins(this.state.selectedRun);
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

  loadRunAdmins = (runId) => {
    axios
      .get(`${this.RUN_ADMINS_URL}${runId}`)
      .then((response) => {
        this.setState({
          runAdmins: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
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
    const admin = {
      user_id: this.state.selectedUser,
      run_id: this.state.selectedRun,
      admin_role: this.state.admin_role,
    };

    this.postNewRunAdmin(admin);
  };

  handleUserSelect = (event) => {
    const selectedUser = event.target.selectedOptions[0];
    console.log(`Selected user: ${selectedUser.textContent}`);
    this.setState({
      selectedUser: selectedUser.value,
    });
  };

  handleRunSelect = (event) => {
    const selectedRun = event.target.selectedOptions[0];
    console.log(`Selected Run: ${selectedRun.textContent}`);
    this.setState({
      selectedRun: selectedRun.value,
    });
  };

  postNewRunAdmin = (admin) => {
    var data = JSON.stringify(admin);
    var config = {
      method: "post",
      url: this.ADD_RUN_ADMIN_URL,
      headers: {
        "Content-Type": "Application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        alert(`New Run Admin Added: \n${admin.full_name}`);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  deleteAdmin = (event) => {
    console.log("Delete Button clicked");
    // The delete api request for api/runadmin/:id
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
                    {this.state.runs.map((run, index) => (
                      <option key={index} value={run.id}>
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
                    {this.state.users.map((user, index) => (
                      <option key={index} value={user.id}>
                        {user.full_name}
                      </option>
                    ))}
                  </select>
                </Form.Group>
                &nbsp;&nbsp;&nbsp;
                <Form.Group controlId="frmAdminRoleInput">
                  <Form.Control
                    className="controls-space"
                    name="admin_role"
                    placeholder="Administrative Role"
                    onChange={this.handleChange}
                    defaultValue={this.state.admin_role}
                  />
                </Form.Group>
                &nbsp;&nbsp;&nbsp;
                <Form.Group controlId="frmAddRunAdminButton">
                  <Button variant="light" type="submit">
                    Add Run Admin
                  </Button>
                </Form.Group>
              </Form.Row>
            </Form>
            <RunAdminsTable
              runAdmins={this.state.runAdmins}
              deleteAdmin={this.deleteAdmin}
            />
          </section>
        </section>
      </>
    );
  }
}

export default AddRunAdmin;
