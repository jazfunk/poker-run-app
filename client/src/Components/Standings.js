import React, { Component } from "react";
import { evaluateHand } from "../EvaluationWorker";
import HandEvaluationTable from "../Components/TableComponents/HandEvaluationTable";

class Standings extends Component {
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

      const handRank = this.rankEvaluation(handEvaluation);

      const compiledHandEvaluation = {
        hand_rank: handRank,
        hand_evaluation: handEvaluation,
        full_name: hand.full_name,
        hand_number: hand.hand_number,
        hand_id: handId,
      };

      handEvaluations.push(compiledHandEvaluation);
    });

    const handsDealtEvaluations = handEvaluations.filter((e) => {
      return e.hand_evaluation != undefined;
    });

    handsDealtEvaluations.sort(this.dynamicSort("hand_rank", "asc"));

    console.log(handsDealtEvaluations);

    this.setState({
      evaluations: handsDealtEvaluations,
    });
  };

  rankEvaluation = (evaluation) => {
    const rankEvaluator = [
      "Royal Flush",
      "Straight Flush",
      "4 of a Kind",
      "Full House",
      "Flush",
      "Straight",
      "3 of a Kind",
      "2 Pair",
      "1 Pair",
      "High Card",
    ];

    for (let rank in rankEvaluator) {
      if (rankEvaluator[rank] === evaluation) {
        return rank;
      }
    }
  };

  dynamicSort = (property, order) => {
    var sort_order = 1;
    if (order === "desc") {
      sort_order = -1;
    }
    return function (a, b) {
      // a should come before b in the sorted order
      if (a[property] < b[property]) {
        return -1 * sort_order;
        // a should come after b in the sorted order
      } else if (a[property] > b[property]) {
        return 1 * sort_order;
        // a and b are the same
      } else {
        return 0 * sort_order;
      }
    };
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
