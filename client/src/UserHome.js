import React, { Component } from "react"

class UserHome extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    if(props.user.isLoggedIn) {
      // Load Run Events (if any) User is signed up for
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

export default UserHome;