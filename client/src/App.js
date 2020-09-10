import React, { Component } from "react";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import DefaultLanding from "./Components/DefaultLanding";

class App extends Component {
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
        isLoggedIn: localState.isLoggedIn || false,
        auth: "isLoggedInTrue",
        password: localState.password || "",
        userId: localState.userId || 0,
      };
    } else {
      this.state = {
        isLoggedIn: false,
        auth: "isLoggedInFalse"
      }
    }
  };



  componentDidMount = () => {
    // Check localStorage for logged in "key"
    // Allow access to app only if "key" exists.
    if (this.state.isLoggedIn) {
      console.log("Logged In")
      // Load app
    } else {
      console.log("Not Logged In")

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

  componentDidUpdate = () => {
    // Add update methods
    // Update state
  };

  render() {

    // debugger;
    // const componentToSend = {
    //   isLoggedInTrue: <Header />,
    //   isLoggedInFalse: <DefaultLanding />,
    // }

    // const CurrentComponent = componentToSend[this.state.auth]

    return (
      <section>
        <div className="App">
          <Header />
        </div>        
        <Footer />
      </section>
    );
  }
}

export default App;
