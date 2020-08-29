import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Nav from "./Navigation";
import Home from "./Home";
import Standings from "./Standings";
import Hands from "./Hands";
import Login from "./Login";
import Signup from "./Signup";
import Logout from "./Logout";

const Header = (props) => {
  return (
    <BrowserRouter>
      <section>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/standings" exact component={Standings} />
          <Route path="/hands" exact component={Hands} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/logout" exact component={Logout} />
        </Switch>
      </section>
    </BrowserRouter>
  );
};

export default Header;
