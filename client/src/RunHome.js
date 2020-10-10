import React, { Component } from "react";
import axios from "axios";
// import UserHandComponent from "./Components/UserHandComponent";
import UserHandShowHideComponent from "./Components/UserHandShowHideComponent";
import { Redirect } from "react-router-dom";
import { USERS_HAND_URL, USER_HANDS_URL } from "./API_Config";

class RunHome extends Component {
  USERS_HAND_URL = USERS_HAND_URL;
  USER_HANDS_URL = USER_HANDS_URL;

  constructor(props) {
    super(props);
    this.importSavedState();
  }

  importSavedState = () => {
    const localState =
      JSON.parse(window.localStorage.getItem("localState")) || [];

    const dashBoardInitial = {
      users: [],
      hands: [],
      handCards: [],
      runs: [],
      runAdmins: [],
      cards: [],
    };

    if (localState.length > 0 || localState.constructor === Object) {
      this.state = {
        dashBoard: localState.dashBoard || dashBoardInitial,
        email: localState.email || "",
        full_name: localState.full_name || "",
        isLoggedIn: localState.isLoggedIn || false,
        isAdmin: localState.isAdmin || false,
        password: localState.password || "",
        userId: localState.userId || 0,
        allCards: localState.allCards || [],
        allHands: localState.allHands || [],
        randomDeck: localState.randomDeck || [],
        stopId: localState.stopId || 0,
        stopChanged: localState.stopChanged|| false,
      };
    } else {
      this.state = {
        isLoggedIn: false,
        allHands: [],
        allCards: [],
      };
    }
  };

  componentDidMount = async () => {
    if (this.state.isLoggedIn) {
      this.loadAllHandsByUser();
      this.loadHandsUser();

      this.setState({
        stopChanged: false,
      })
    }
  };

  // Joined data
  loadAllHandsByUser = () => {
    axios
      .get(`${this.USERS_HAND_URL}${this.state.userId}`)
      .then((response) => {
        const allCards = response.data;
        const cardsWithStatus = [];
        let previousHand = 1;
        let cardCounter = 0;
        let handCounter = 0;
        let isDealt = false;

        allCards.forEach((card) => {
          if (previousHand === card.hand_number) {
            cardCounter++;
          }

          // isDealt = cardCounter <= card.hand_rank
          isDealt = cardCounter <= this.state.stopId;

          if (cardCounter >= 5) {
            handCounter++;
            cardCounter = 1;
          }

          previousHand = card.hand_number;

          const builtCard = {
            card_face: card.card_face,
            card_id: card.card_id,
            card_suit: card.card_suit,
            card_value: card.card_value,
            first_name: card.first_name,
            hand_id: card.hand_id,
            hand_number: card.hand_number,
            hand_rank: this.state.stopId,
            last_name: card.last_name,
            isDealt: isDealt,
          };
          cardsWithStatus.push(builtCard);
        });

        this.setState({
          allCards: cardsWithStatus,
          handsCount: response.data.length / 5,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  loadHandsUser = () => {
    axios
      .get(`${this.USER_HANDS_URL}${this.state.userId}`)
      .then((response) => {
        this.setState({
          allHands: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleCardClick = (event, card) => {
    const cardSection = event.currentTarget;

    if (card.isDealt) {
      cardSection.className = "card-hidden";
      card.isDealt = false;
    } else {
      cardSection.className = "card-shown";
      card.isDealt = true;
    }
  };

  handleStopReset = (event) => {
    this.setState({
      stopId: 0,
    })
  }

  handleStopClick = (event) => {
    this.setState({
      stopId: event.target.id,
      stopChanged: true,
    })

  }

  componentDidUpdate = () => {
    this.saveLocal();

    if(this.state.stopChanged) {
      this.loadAllHandsByUser();
      this.loadHandsUser();
    }
  };

  saveLocal = () => {
    localStorage.setItem("localState", JSON.stringify(this.state));
  };

  render() {  
    // const isAdmin = !this.state.isAdmin ? (
    //   <Redirect to="/" />
    // ) : null;

    const isLoggedOut = !this.state.isLoggedIn ? (
      <Redirect to="/login" />
    ) : null;

    return (
      <>
        {isLoggedOut}
        {/* {isAdmin} */}
        <section>
          <section>
            <UserHandShowHideComponent
              handleCardClick={this.handleCardClick}
              handleStopClick={this.handleStopClick}
              handleStopReset={this.handleStopReset}
              handCards={this.state.allCards}
              handsCount={this.state.handsCount}
              fullName={this.state.full_name}
            />
          </section>
        </section>
      </>
    );
  }
}

export default RunHome;
