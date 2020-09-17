import React, { Component } from "react";
import { evaluateHand } from "../EvaluationWorker";
import HandEvaluationTable from "../Components/TableComponents/HandEvaluationTable";

class Standings extends Component {
  handEvalRows = [];

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
        password: localState.password || "",
        userId: localState.userId || 0,
        selectedUser: localState.selectedUser || "",
        selectedRun: localState.selectedRun || 1,
        userHands: localState.userHands || [],
        selectedHand: localState.selectedHand || "",
        randomDeck: localState.randomDeck || [],
        newHand: localState.newHand || [],
        handsCount: localState.handsCount || 0,
        evaluations: localState.evaluations || [],
      };
    } else {
      this.state = {
        isLoggedIn: false,
        selectedUser: "",
        selectedRun: 1,
        evaluations: [],
      };
    }
  };

  evaluateHands = () => {
    let handId = 0;
    const hands = [...this.state.dashBoard.hands];
    const handCards = [...this.state.dashBoard.handCards];
    const handEvaluations = [];

    hands.forEach((hand) => {
      handId = hand.id;
      let faces = [];
      let suits = [];

      handCards.forEach((card) => {
        if (card.hand_id == handId) {
          faces.push(card.card_value);
          suits.push(card.card_suit);
        }
      });

      const handEvaluation = evaluateHand(faces, suits);
      const compiledHandEvaluation = {
        hand_id: handId,
        hand_evaluation: handEvaluation,
      };

      handEvaluations.push(compiledHandEvaluation);
    });

    const handsDealtEvaluations = handEvaluations.filter((e) => {
      return e.hand_evaluation != undefined;
    });

    console.log(handsDealtEvaluations);

    this.setState({
      evaluations: handsDealtEvaluations,
    })
  };

  componentDidMount = () => {
    this.evaluateHands();
  };

  componentDidUpdate = () => {
    this.saveLocal();
  };

  saveLocal = () => {
    localStorage.setItem("localState", JSON.stringify(this.state));
  };

  render() {
    return (
      <section className="form-container">
        <HandEvaluationTable evaluations={this.state.evaluations} />        
      </section>
    );
  }
}

export default Standings;
