import React, { Component } from "react";
import axios from "axios";
import AddNewRunComponent from "./Components/AddNewRunComponent";

class AddNewRun extends Component {
  port = process.env.PORT || 5000
  ADD_RUN_URL = `/runs/`;
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  componentDidMount = () => {};
  
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

    debugger;
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
        console.log(JSON.stringify(response.data));
        alert(`New Run Added titled: \n${run.run_name}`)

        this.setState({
          run: run,
        });
      })

      .catch((error) => {
        console.log(error);
      });
  };

  componentDidUpdate = () => {};

  render() {
    return (
      <AddNewRunComponent
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default AddNewRun;
