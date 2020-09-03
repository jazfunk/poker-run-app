import React, { Component } from "react"

class RunHome extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    if(props.user.isLoggedIn) {
      // Load users hands for this event
      // Show top three winning hands
      // Show a row of cards for each hand
      // 
    }
  }
  handleChange = (event) => {}
  handleSubmit = (event) => {}
  componentDidUpdate = () => {}

  render() {
    return(
      <section>UserHome</section>
    );
  };
};

export default RunHome;