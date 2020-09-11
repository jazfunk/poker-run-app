import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import UsersTable from "./Components/TableComponents/UsersTable";
import axios from "axios";
import { Redirect } from "react-router-dom";

class UsersList extends Component {
  port = process.env.PORT || 5000;
  USERS_URL = `/api/users/`;
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
        users: localState.users || [],
        hands: localState.hands || [],
        userSearch: localState.userSearch || "",
      };
    } else {
      this.state = {
        isLoggedIn: false,
        users: [],
        hands: [],
        userSearch: "",
      };
    }
  };

  componentDidMount = () => {
    if (this.state.isLoggedIn) {
      axios
        .get(this.USERS_URL)
        .then((response) => {
          this.setState({
            users: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  handleChange = (event) => {
    this.setState({
      userSearch: event.target.value,
    });
  };

  handleSearch = () => {};

  handleClear = () => {
    if (this.state.userSearch) {
      this.setState({
        userSearch: "",
      });
    }
  };

  handlePrevious = (event) => {};
  handleNext = (event) => {};

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
            <section>
              <input
                id="search-text"
                type="text"
                className="form-control"
                placeholder="Search Users"
                value={this.state.userSearch}
                onChange={this.handleChange}
                required={true}
              />
              &nbsp;
              <Button
                id="btn-search"
                className="btn-secondary"
                onClick={this.handleSearch}
              >
                Search
              </Button>
              &nbsp;
              <Button
                id="btn-clear"
                className="btn-info"
                onClick={this.handleClear}
              >
                Clear
              </Button>
              &nbsp;
              <Button id="btn-prev" onClick={this.handlePrevious}>
                {`<Prev`}
              </Button>
              &nbsp;
              <Button id="btn-next" onClick={this.handleNext}>
                {`Next>`}
              </Button>
              <br></br>
              <UsersTable users={this.state.users} />
              <section className="record-count-display">
                {`Display number of users and number of pages`}
              </section>
            </section>
          </section>
        </section>
      </>
    );
  }
}

export default UsersList;