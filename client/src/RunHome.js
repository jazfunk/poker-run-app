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
        stopId: localState.stopId || 1,
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
    }
  };

  // Joined data
  loadAllHandsByUser = () => {
    axios
      .get(`${this.USERS_HAND_URL}${this.state.userId}`)
      .then((response) => {
        // Loop response.data
        // add isDealt property

        // Only allow isDealt to be true if
        // hand.hand_rank >= hand_number

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
          // allCards: response.data,
          handsCount: response.data.length / 5,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // data for form select element
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
    console.log(cardSection.className);

    if (card.isDealt) {
      cardSection.className = "card-hidden";
      card.isDealt = false;
    } else {
      cardSection.className = "card-shown";
      card.isDealt = true;
    }

    console.log(card);
  };

  handleChange = (event) => {};
  handleSubmit = (event) => {};

  handleStopSelect = (event) => {
    const stopId = parseInt(event.target.selectedOptions[0].value);
    this.setState({
      stopId: stopId,
    });
  };

  componentDidUpdate = () => {
    this.saveLocal();
  };

  saveLocal = () => {
    localStorage.setItem("localState", JSON.stringify(this.state));
  };

  render() {  
    const isLoggedOut = !this.state.isLoggedIn ? (
      <Redirect to="/login" />
    ) : null;
    return (
      <>
        {isLoggedOut}
        <section>
          <section className="temp-stop-id">
            <select
              name="selectStopId"
              className="form-control"
              defaultValue={this.state.stopId}
              onChange={this.handleStopSelect}
            >
              <option value="1">Stop #1</option>
              <option value="2">Stop #2</option>
              <option value="3">Stop #3</option>
              <option value="4">Stop #4</option>
              <option value="5">Stop #5</option>
            </select>
          </section>
          <section>
            {/* <UserHandFlipComponent
              handleCardClick={this.handleCardClick}
              handCards={this.state.allCards}
              handsCount={this.state.handsCount}
              fullName={this.state.full_name}
            /> */}
            <UserHandShowHideComponent
              handleCardClick={this.handleCardClick}
              handCards={this.state.allCards}
              handsCount={this.state.handsCount}
              fullName={this.state.full_name}
            />
          </section>
          {/* <section>
            <UserHandComponent
              handCards={this.state.allCards}
              handsCount={this.state.handsCount}
              fullName={this.state.full_name}
            />
          </section> */}
        </section>
      </>
    );
  }
}

export default RunHome;
