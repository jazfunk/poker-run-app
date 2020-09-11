import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Nav from "./Navigation";
import Home from "./Home";
import UsersList from "../UsersList";
import AddNewRun from "../AddNewRun";
import AddRunAdmin from "../AddRunAdmin";
import Standings from "./Standings";
import RunHome from "../RunHome";
import LogIn from "../Login";
import SignUp from "../SignUp";
import Logout from "./Logout";
import AdminTable from "../AdminTables";
import AddUserHand from "../AddUserHand";
import AddHandCard from "../AddHandCard";
import CardDeck from "../CardDeck";

class Header extends Component {
  constructor(props) {
    super(props);

    // const createBrowserHistory = require("history").createBrowserHistory;
    // const newHistory = createBrowserHistory;
  }

  render() {
    return (
      <BrowserRouter>
        <section>
          <Nav />
          <Switch>
            <Route path="/" exact component={Home} />

            {/* <Route
              exact
              path="/"
              render={(props) => (
                <Home {...props} history={this.newHistory} />
              )}
            /> */}

            <Route path="/userslist" exact component={UsersList} />
            <Route path="/addrun" exact component={AddNewRun} />
            <Route path="/addrunadmin" exact component={AddRunAdmin} />
            <Route path="/adduserhand" exact component={AddUserHand} />
            <Route path="/addhandcard" exact component={AddHandCard} />
            <Route path="/runhome" exact component={RunHome} />
            <Route path="/standings" exact component={Standings} />
            <Route path="/login" exact component={LogIn} />

            {/* <Route 
              exact 
              path="/login"
              render={(props) => (
                <LogIn {...props} history={this.newHistory} />
              )}            
            /> */}

            <Route path="/signup" exact component={SignUp} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/admin" exact component={AdminTable} />
            <Route path="/deck" exact component={CardDeck} />
          </Switch>
        </section>
      </BrowserRouter>
    );
  }
}

export default Header;
