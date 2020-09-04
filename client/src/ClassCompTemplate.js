import React, { Component } from "react"

class ClassCompTemplate extends Component {
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
      <section>Class Component Template</section>
    );
  };
};

export default ClassCompTemplate;