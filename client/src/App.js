import React, { Component } from "react";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Login";
// import { Redirect } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.importSavedState();
  }

  importSavedState = () => {
    const localState =
      JSON.parse(window.localStorage.getItem("localState")) || [];

    if (localState.length > 0 || localState.constructor === Object) {
      // console.log(localState);
      this.state = {
        email: localState.email || "",
        redirect: null,
        isLoggedIn: localState.isLoggedIn || false,
        password: localState.password || "",
        userId: localState.userId || 0,
      };
    } else {
      this.state = {
        isLoggedIn: false,
        redirect: "/login",
      };
    }
  };

  componentDidMount = (prevProps) => {
    // Check localStorage for logged in "key"
    // Allow access to app only if "key" exists.
    if (this.state.isLoggedIn) {
      console.log("Logged In");
      // Load app
    } else {
      console.log("Not Logged In");
      // Set up variable to toggle
      // in the render() method
      // if logged in, open Header component
      // if not logged in, load only the login component
    }
  };

  handleChange = (event) => {
    event.preventDefault();
  };

  handleSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
  };

  componentDidUpdate = () => {};

  showHeader = () => {
    return (
      <section>
        <div className="App">
          <Header isLoggedIn={this.state.isLoggedIn} />
        </div>
        <Footer />
      </section>
    );
  };

  showAuthCheck = () => {
    return (
      <div className="App">
        <Login />
      </div>
    );
  };

  render() {
    // const isLoggedOut = !this.state.isLoggedIn ? (
    //   <Redirect to={this.state.redirect} />
    // ) : null;

    // return (
    //   <>
    //     {isLoggedOut}
    //     <div className="App">
    //       <Header isLoggedIn={this.state.isLoggedIn} />
    //     </div>
    //     {/* <Footer /> */}
    //   </>
    // );



    if(this.state.isLoggedIn) {
      return this.showHeader()
    } else {
      return this.showAuthCheck()
    }



    // return (
    //   <section>
    // <div className="App">
    //   <Header isLoggedIn={this.state.isLoggedIn} />
    // </div>
    // {/* <Footer /> */}
    //   </section>
    // );
  }
}

export default App;
