import React, { Component } from "react";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
    };
  }

  componentDidMount = () => {
    // Add On Mount methods
    // Set State
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
    return (
      <section>
        <div className="App">
          <Header />
          {/* <BodyContent content={this.state.content} /> */}
        </div>        
        <Footer />
      </section>
    );
  }
}

export default App;
