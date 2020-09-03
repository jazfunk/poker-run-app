import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Nav from "./Navigation";
import Home from "./Home";
import UsersList from "../UsersList";
import AddNewRun from "../AddNewRun";
import Standings from "./Standings";
import Hands from "./Hands";
import RunHome from "../RunHome";
import LogIn from "./Login";
import SignUp from "../SignUp";
import Logout from "./Logout";

const Header = (props) => {
  return (
    <BrowserRouter>
      <section>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/userslist" exact component={UsersList} />
          <Route path="/addrun" exact component={AddNewRun} />
          <Route path="/runhome" exact component={RunHome} />
          <Route path="/standings" exact component={Standings} />
          <Route path="/hands" exact component={Hands} />
          <Route path="/login" exact component={LogIn} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/logout" exact component={Logout} />
        </Switch>
      </section>
    </BrowserRouter>
  );
};

export default Header;
