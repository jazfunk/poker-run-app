import React, { Component } from "react";
import axios from "axios";
import RawUsersTable from "./Components/RawUsersTable";
import RawHandsTable from "./Components/RawHandsTable";
// import RawHandsCardsTable from "./Components/RawHandsCardsTable";
// import RawRunsTable from "./Components/RawRunsTable";
// import RawRunAdminsTable from "./Components/RawRunAdminsTable";
// import RawCardsTable from "./Components/RawCardsTable";

class AdminTables extends Component {
  port = process.env.PORT || 5000
  USERS_URL = `/api/admin/usersraw`;  

  constructor(props) {
    super(props);
    this.state = {
      usersUrl: this.USERS_URL,
      users: [],
    };
  }

  getData = (url) => {
    return axios.get(url).then((response) => response.data);
  };

  componentDidMount = () => {
    this.loadUsers();
    // if(props.user.isLoggedIn) {
    //   // Load Run Events (if any) User is signed up for
    //   // 
    // }
  }

  handleChange = (event) => {}
  handleSubmit = (event) => {}

  loadUsers = () => {
    axios
      .get(this.state.usersUrl)
      .then((response) => {
        console.log(response.data)
        this.setState({
          users: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteUser = (event) => {
    console.log("Remove button clicked")
  }

  deleteHand = (event) => {
    console.log("Remove button clicked")
  }

  deleteHandsCard = (event) => {
    console.log("Remove button clicked")
  }

  deleteRun = (event) => {
    console.log("Remove button clicked")
  }

  deleteRunAdmin = (event) => {
    console.log("Remove button clicked")
  }


  componentDidUpdate = () => {}

  render() {
    return(
      <section className="admin-tables">
        <RawUsersTable users={this.state.users} deleteUser={this.deleteUser} />
        {/* <RawHandsTable hands={this.state.hands} deleteHand={this.deleteHand} /> */}
        {/* <RawHandsCardsTable handscards={this.state.handscards} />
        <RawRunsTable runs={this.state.runs} />
        <RawRunAdminsTable admins={this.state.admins} />
        <RawCardsTable cards={this.state.cards} /> */}
      </section>
    );
  };
};

export default AdminTables;