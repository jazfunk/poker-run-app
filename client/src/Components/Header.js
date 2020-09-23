import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Nav from "./Navigation";
import Home from "../Home";
import UsersList from "../UsersList";
import AddNewRun from "../AddNewRun";
import AddRunAdmin from "../AddRunAdmin";
import Standings from "./Standings";
import RunHome from "../RunHome";
import LogIn from "../Login";
import UpdateUser from "../ChangePassword";
import SignUp from "../SignUp";
import Logout from "../Logout";
import AdminTables from "../AdminTables";
import AddUserHand from "../AddUserHand";
import AddHandCard from "../AddHandCard";
import CardDeck from "../CardDeck";
import ValidateStop from "../ValidateStop";

const Header = (props) => {
  // let isAdmin = false;
  // const getAndSetStatus = () => {
  //   const localState =
  //     JSON.parse(window.localStorage.getItem("localState")) || [];

  //   if (localState.length > 0 || localState.constructor === Object) {
  //     isAdmin = localState.isAdmin;
  //   } else {
  //     isAdmin = false;
  //   }
  // };

  // let adminDisplay = () => {
  //   return isAdmin ? AdminTables : Home;
  // }


  return (
    <BrowserRouter>
      <section>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/userslist" exact component={UsersList} />
          <Route path="/addrun" exact component={AddNewRun} />
          <Route path="/addrunadmin" exact component={AddRunAdmin} />
          <Route path="/adduserhand" exact component={AddUserHand} />
          <Route path="/addhandcard" exact component={AddHandCard} />
          <Route path="/runhome" exact component={RunHome} />
          <Route path="/standings" exact component={Standings} />
          <Route path="/login" exact component={LogIn} />
          <Route path="/updateuser" exact component={UpdateUser} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/admin" exact component={AdminTables} />
          {/* <Route path="/admin" exact component={adminDisplay} /> */}
          <Route path="/deck" exact component={CardDeck} />
          <Route path="/validatestop" exact component={ValidateStop} />
          {/* <Route path="/validatestop" render={(props) => <ValidateStop {...props} stopId={props.stopId} />} /> */}
        </Switch>
      </section>
    </BrowserRouter>
  );
};

export default Header;