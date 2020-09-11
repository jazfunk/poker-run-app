import React, { Component } from "react";
import axios from "axios";
import AddNewRunComponent from "./Components/AddNewRunComponent";
import { Redirect } from "react-router-dom";

class AddNewRun extends Component {
  port = process.env.PORT || 5000;
  ADD_RUN_URL = `/api/runs/`;
  USERS_NAMES_URL = `/api/fullnames/`;
  
  constructor(props) {
    super(props);    
    this.importSavedState();    
  }

  importSavedState = () => {
    const localState =
      JSON.parse(window.localStorage.getItem("localState")) || [];

    if (localState.length > 0 || localState.constructor === Object) {
      console.log(localState);
      this.state = {
        email: localState.email || "",
        full_name: localState.full_name || "",
        isLoggedIn: localState.isLoggedIn || false,
        password: localState.password || "",
        userId: localState.userId || 0,
        users: [],
      };
    } else {
      this.state = {
        isLoggedIn: false,
        users: [],
      };
    }
  };

  loadUsersNamesList = () => {
    axios
      .get(this.USERS_NAMES_URL)
      .then((response) => {
        console.log(response.data)
        this.setState({
          users: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount = () => {
    this.loadUsersNamesList();
    // if(this.state.isLoggedIn) {
    // }
  };

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSelect = (event) => {
    const selectedOwner = event.target.selectedOptions[0];
    this.setState({
      owner_id: selectedOwner.value,
    });
    console.log(`Owner Selected: ${selectedOwner.textContent}`);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
    const run = {
      run_name: this.state.run_name,
      run_description: this.state.run_description,
      run_date: this.state.run_date,
      owner_id: this.state.owner_id,
    };

    this.postNewRun(run);
  };

  postNewRun = (run) => {
    var data = JSON.stringify(run);
    var config = {
      method: "post",
      url: this.ADD_RUN_URL,
      headers: {
        "Content-Type": "Application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        alert(`New Run Added titled: \n${run.run_name}`);
        this.setState({
          run: run,
        });
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
          {console.log("AddNewRun")}
          <AddNewRunComponent
            users={this.state.users}
            user={this.state.userId}
            validationError={this.state.validationError}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleSelect={this.handleSelect}
          />
        </section>
      </>
    );
  }
}

export default AddNewRun;

{
  /* <AddNewRunComponent
  users={this.state.users}
  user={this.state.user}
  validationError={this.state.validationError}
  handleChange={this.handleChange}
  handleSubmit={this.handleSubmit}
  handleSelect={this.handleSelect}
/> */
}
