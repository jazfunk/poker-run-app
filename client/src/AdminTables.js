import React, { Component } from "react";
import axios from "axios";
import RawUsersTable from "./Components/RawUsersTable";
import RawHandsTable from "./Components/RawHandsTable";
import RawHandsCardsTable from "./Components/RawHandsCardsTable";
import RawRunsTable from "./Components/RawRunsTable";
import RawRunAdminsTable from "./Components/RawRunAdminsTable";
import RawCardsTable from "./Components/RawCardsTable";

class AdminTables extends Component {
  port = process.env.PORT || 5000;
  USERS_URL = `/api/admin/usersraw`;
  HANDS_URL = `/api/hands`;
  HANDS_CARDS_URL = `/api/handcards`;
  RUNS_URL = `/api/runs`;
  RUN_ADMINS_URL = `/api/runadmin`;
  CARDS_URL = `/api/cards`;

  constructor(props) {
    super(props);
    this.state = {
      usersUrl: this.USERS_URL,
      handsUrl: this.HANDS_URL,
      handsCardsUrl: this.HANDS_CARDS_URL,
      runsUrl: this.RUNS_URL,
      runAdminsUrl: this.RUN_ADMINS_URL,
      cardsUrl: this.CARDS_URL,
      users: [],
      hands: [],
      handsCards: [],
      runs: [],
      admins: [],
      cards: [],
    };
  }

  getData = (url) => {
    return axios.get(url).then((response) => response.data);
  };

  componentDidMount = () => {
    this.loadUsers();
    this.loadHands();
    // this.loadHandsCards();
    this.loadRuns();
    this.loadRunAdmins();
    this.loadCards();
    // if(props.user.isLoggedIn) {
    //   // Load Run Events (if any) User is signed up for
    //   //
    // }
  };

  handleChange = (event) => {};
  handleSubmit = (event) => {};

  loadUsers = () => {
    axios
      .get(this.state.usersUrl)
      .then((response) => {
        // console.log(response.data)
        this.setState({
          users: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  loadHands = () => {
    axios
      .get(this.state.handsUrl)
      .then((response) => {
        // console.log(response.data)
        this.setState({
          hands: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  loadHandsCards = () => {
    axios
      .get(this.state.handsCardsUrl)
      .then((response) => {
        // console.log(response.data);
        this.setState({
          handsCards: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  loadRuns = () => {
    axios
      .get(this.state.runsUrl)
      .then((response) => {
        // console.log(response.data);
        this.setState({
          runs: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  loadRunAdmins = () => {
    axios
      .get(this.state.runAdminsUrl)
      .then((response) => {
        // console.log(response.data);
        this.setState({
          admins: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  loadCards = () => {
    axios
    .get(this.state.cardsUrl)
    .then((response) => {
      console.log(response.data);
      this.setState({
        cards: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  deleteUser = (event) => {
    console.log("Remove button clicked");
  };

  deleteHand = (event) => {
    console.log("Remove button clicked");
  };

  deleteHandsCard = (event) => {
    console.log("Remove button clicked");
  };

  deleteRun = (event) => {
    console.log("Remove button clicked");
  };

  deleteRunAdmin = (event) => {
    console.log("Remove button clicked");
  };

  componentDidUpdate = () => {};

  render() {
    return (
      <section className="admin-tables">
        AdminTables
        <RawUsersTable users={this.state.users} deleteUser={this.deleteUser} />
        <RawHandsTable hands={this.state.hands} deleteHand={this.deleteHand} />
        {/* <RawHandsCardsTable
          handsCards={this.state.handsCards}
          deleteHandsCard={this.deleteHandsCard}
        /> */}
        <RawRunsTable runs={this.state.runs} deleteRun={this.deleteRun} />
        <RawRunAdminsTable
          admins={this.state.admins}
          deleteRunAdmin={this.deleteRunAdmin}
        />
        <RawCardsTable cards={this.state.cards} />
      </section>
    );
  }
}

export default AdminTables;