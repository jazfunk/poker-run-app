import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import SignupComponent from "./Components/SignupComponent";
import UsersListMDBTable from "./Components/TableComponents/UsersListMDBTable";
import { Redirect } from "react-router-dom";
import { ADD_USER_URL, ADMIN_DASHBOARD } from "./API_Config";

class SignUp extends Component {
  ADD_USER_URL = ADD_USER_URL;
  ADMIN_DASHBOARD = ADMIN_DASHBOARD;  

  constructor(props) {
    super(props);
    this.importSavedState();
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
        isAdmin: localState.isAdmin || false,
        password: localState.password || "",
        passwordConfirm: localState.passwordConfirm || "",
        userId: localState.userId || 0,
        randomDeck: localState.randomDeck || [],
        stopId: localState.stopId || 1,
      };
    } else {
      this.state = {
        isLoggedIn: false,
      };
    }
  };

  componentDidMount = () => {
    if (this.state.isLoggedIn) {
      this.loadDashboard();
      this.getUsersDisplay();
    }
  };

  getUsersDisplay = () => {
    const users = [...this.state.dashBoard.users]
    const usersDisplay = [];
    users.forEach((user) => {
      let dateMoment = moment(user.created_at);
      let name = `${user.first_name} ${user.last_name}`
      const builtUser = {
        id: user.id,
        name: name,
        email: user.email,
        createdAt: dateMoment.format("MM-DD-YYYY hh:mm a"),
      }
      usersDisplay.push(builtUser)
    })
    this.setState({
      usersDisplay: usersDisplay,
    })
  }

  loadDashboard = () => {
    axios
      .get(this.ADMIN_DASHBOARD)
      .then((response) => {
        this.setState({
          dashBoard: response.data,
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

    
    const users = [...this.state.dashBoard.users]
    const userEmail = users.filter((user) => {
      return user.email === this.state.add_email;      
    })
    
    if (userEmail.length > 0) {
      this.setState({
        add_email: "",
      })
      return alert("An account with that email address already exists")
    }

    const passwordTrimmed = this.state.add_password.trim();
    const passwordConfirmTrimmed = this.state.add_passwordConfirm.trim();

    if (passwordTrimmed != passwordConfirmTrimmed) {
      this.setState({
        add_passwordConfirm: "",
      })
      return alert("Passwords do not match");
    }

    let loweredEmail = this.state.add_email.toLowerCase();
    const user = {
      first_name: this.state.add_first_name.trim(),
      last_name: this.state.add_last_name.trim(),
      email: loweredEmail.trim(),
      password: this.state.add_password.trim(),
    };
    
    this.postNewUser(user);

    this.setState({
      add_first_name: "",
      add_last_name: "",
      add_email: "",
      add_password: "",
    })
    
    event.target.reset();

  };

  postNewUser = (user) => {
    var data = JSON.stringify(user);
    var config = {
      method: "post",
      url: this.ADD_USER_URL,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        alert(`${user.first_name}! \n has been signed up`);
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
    const isAdmin = !this.state.isAdmin ? (
      <Redirect to="/" />
    ) : null;

    const isLoggedOut = !this.state.isLoggedIn ? (
      <Redirect to="/login" />
    ) : null;
    return (
      <>
        {isLoggedOut}
        {isAdmin}
        <section>
          <SignupComponent
            add_first_name={this.state.add_first_name}
            add_last_name={this.state.add_flast_name}
            add_email={this.state.add_email}
            add_password={this.state.add_password}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
           <section>
            <UsersListMDBTable users={this.state.usersDisplay} />
          </section>
        </section>
      </>
    );
  }
}

export default SignUp;
