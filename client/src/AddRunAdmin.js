import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import RunAdminsTable from "./Components/RunAdminsTable";

class AddRunAdmin extends Component {
  port = process.env.PORT || 5000;
  ADD_RUN_ADMIN_URL = "/api/runadmin/";
  USERS_FULL_NAME_URL = "/api/fullnames/";
  RUNS_URL = "/api/runs/";
  RUN_ADMINS_URL = "/api/runadminsbyrun/";

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      selectedUser: "",
      selectedRun: 1,
      runs: [],
      runAdmins: [],
    };
  }

  componentDidMount = () => {
    this.loadUsers();
    this.loadRunAdmins(this.state.selectedRun);
    this.loadRuns();
    // if (props.user.isLoggedIn) {
    //   // Load Run Events (if any) User is signed up for
    //   //
    // }
  };

  loadUsers = () => {
    axios
      .get(`${this.USERS_FULL_NAME_URL}`)
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
    // console.log(`Selected user: ${selectedUser.textContent}`);
    this.setState({
      selectedUser: selectedUser.value,
    });
  };

  handleRunSelect = (event) => {
    const selectedRun = event.target.selectedOptions[0];
    // console.log(`Selected Run: ${selectedRun.textContent}`);
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
        // this.setState({
        //   run: run,
        // });
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
    // console.log(this.state.runAdmins);
  };

  render() {
    return (
      <section className="form-container">
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group controlId="frmRunSelect">
              <Form.Control
                className="controls-space"
                as="select"
                defaultValue={this.state.selectedRun}
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
              <Form.Control
                className="controls-space"
                as="select"
                defaultValue={this.state.selectedUser}
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
                Add Run Administrator
              </Button>
            </Form.Group>
          </Form.Row>
        </Form>
        <RunAdminsTable
          runAdmins={this.state.runAdmins}
          deleteAdmin={this.deleteAdmin}
        />
      </section>
    );
  }
}

export default AddRunAdmin;
