import React, { Component } from "react";
import axios from "axios";
import CardDeckComponent from "./Components/CardDeckComponent";
import { CARDS_URL } from "./API_Config";

class CardDeck extends Component {
  CARDS_URL = CARDS_URL;

  constructor(props) {
    super(props);  
    this.state = {
      cards: [],
    }  
  }

  componentDidMount = () => {

    // Need to add normalization to state
    // Mimic from all other class components
    
    this.loadCards(); 
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
