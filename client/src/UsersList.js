import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import UsersTable from "./Components/UsersTable";
import axios from "axios";


class UsersList extends Component {
  port = process.env.PORT || 5000
  USERS_URL = `/users/`;
  constructor(props) {
    super(props);
    this.state = {
      usersUrl: this.USERS_URL,
      users: [],
      userSearch: "",
    };
  }

  getData = (url) => {
    return axios.get(url).then((response) => response.data);
  };

  componentDidMount = () => {
    axios
      .get(this.state.usersUrl)
      .then((response) => {
        console.log(process.env.PG_USER)
        this.setState({
          users: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
        usersUrl: this.USERS_URL,
        userSearch: "",
      });
    }
  };

  handlePrevious = (event) => {};
  handleNext = (event) => {};
  componentDidUpdate = (prevProps, prevSTate) => {};

  render() {
    return (
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
    );
  }
}

export default UsersList;
