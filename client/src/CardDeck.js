import React, { Component } from "react";
import axios from "axios";
import CardDeckComponent from "./Components/CardDeckComponent";

class CardDeck extends Component {
  CARDS_URL = "/api/cards";

  constructor(props) {
    super(props);  
    this.state = {
      cards: [],
    }  
  }

  componentDidMount = () => {
    this.loadCards();    
    // if (props.user.isLoggedIn) {
    //   // Load Run Events (if any) User is signed up for
    //   //
    // }
  };

  loadCards = () => {
    axios
      .get(this.CARDS_URL)
      .then((response) => {
        this.setState({
          cards: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (event) => {};
  handleSubmit = (event) => {};
  
  componentDidUpdate = () => {};

  render() {
    return (
    <section>
      <CardDeckComponent cards={this.state.cards} />
    </section>
    );
  }
}

export default CardDeck;
