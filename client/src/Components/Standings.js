import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
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
        isAdmin: localState.isAdmin || false,
        password: localState.password || "",
        userId: localState.userId || 0,
        // selectedUser: localState.selectedUser || "",
        // selectedRun: localState.selectedRun || 1,
        // userHands: localState.userHands || [],
        // selectedHand: localState.selectedHand || "",
        randomDeck: localState.randomDeck || [],
        newHand: localState.newHand || [],
        handsCount: localState.handsCount || 0,
        evaluations: localState.evaluations || [],
        stopId: localState.stopId || 1,
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

  loadDashboard = () => {
    axios
      .get(this.ADMIN_DASHBOARD)
      .then((response) => {
        this.setState({
          dashBoard: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  evaluatePair = (cards) => {
    let previousCharacter = "";
    let highPair = 0;

    cards.forEach((e) => {
      const face = e.slice(0, -1);

      if (face === previousCharacter) {
        switch (face) {
          case "A":
            if (highPair < 14) {
              highPair = 14;
            }
            break;
          case "K":
            if (highPair < 13) {
              highPair = 13;
            }
            break;
          case "Q":
            if (highPair < 12) {
              highPair = 12;
            }
            break;
          case "J":
            if (highPair < 11) {
              highPair = 11;
            }
            break;
          case "10":
            if (highPair < 10) {
              highPair = 10;
            }
            break;
          case "9":
            if (highPair < 9) {
              highPair = 9;
            }
            break;
          case "8":
            if (highPair < 8) {
              highPair = 8;
            }
            break;
          case "7":
            if (highPair < 7) {
              highPair = 7;
            }
            break;
          case "6":
            if (highPair < 6) {
              highPair = 6;
            }
            break;
          case "5":
            if (highPair < 5) {
              highPair = 5;
            }
            break;
          case "4":
            if (highPair < 4) {
              highPair = 4;
            }
            break;
          case "3":
            if (highPair < 3) {
              highPair = 3;
            }
            break;
          case "2":
            if (highPair < 2) {
              highPair = 2;
            }
            break;
          default:
            break;
        }
      }

      previousCharacter = face;
    });

    return highPair;
  };

  evaluateHighCard = (cards, highPair) => {
    let highCard = 0;

    cards.forEach((e) => {
      const face = e.slice(0, -1);

      switch (face) {
        case "A":
          if (highCard < 14 && highPair != 14) {
            highCard = 14;
          }
          break;
        case "K":
          if (highCard < 13 && highPair != 13) {
            highCard = 13;
          }
          break;
        case "Q":
          if (highCard < 12 && highPair != 12) {
            highCard = 12;
          }
          break;
        case "J":
          if (highCard < 11 && highPair != 11) {
            highCard = 11;
          }
          break;
        case "10":
          if (highCard < 10 && highPair != 10) {
            highCard = 10;
          }
          break;
        case "9":
          if (highCard < 9 && highPair != 9) {
            highCard = 9;
          }
          break;
        case "8":
          if (highCard < 8 && highPair != 8) {
            highCard = 8;
          }
          break;
        case "7":
          if (highCard < 7 && highPair != 7) {
            highCard = 7;
          }
          break;
        case "6":
          if (highCard < 6 && highPair != 6) {
            highCard = 6;
          }
          break;
        case "5":
          if (highCard < 5 && highPair != 5) {
            highCard = 5;
          }
          break;
        case "4":
          if (highCard < 4 && highPair != 4) {
            highCard = 4;
          }
          break;
        case "3":
          if (highCard < 3 && highPair != 3) {
            highCard = 3;
          }
          break;
        case "2":
          if (highCard < 2 && highPair != 2) {
            highCard = 2;
          }
          break;
        default:
          break;
      }
    });

    return highCard;
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
        let displayItems = [];
        let handValue = 0;

        handCards.forEach((card) => {
          if (card.hand_id == handId) {
            let suit = 0;
            switch (card.card_suit) {
              case "C":
                suit = 1;
                break;
              case "D":
                suit = 2;
                break;
              case "H":
                suit = 4;
                break;
              case "S":
                suit = 8;
                break;
              default:
                break;
            }

            faces.push(card.card_value);
            suits.push(suit);
            displayItems.push(`${card.card_face}${card.card_suit}`);

            handValue += card.card_value;
          }
        });

        displayItems.sort();

        const handEvaluation = evaluateHand(faces, suits);
        const handRank = this.rankEvaluation(handEvaluation);

        const compiledHandEvaluation = {
          hand_rank: handRank,
          hand_evaluation: handEvaluation,
          full_name: hand.full_name,
          hand_number: hand.hand_number,
          hand_id: handId,
          hand_display: displayItems.toString(),
          hand_value: handValue,
          weighted_value: 0,
          high_pair: 0,
          high_card: 0,
        };
        handEvaluations.push(compiledHandEvaluation);
    });

    // Clear out un-dealt hands
    const handsDealtEvaluations = handEvaluations.filter((e) => {
      return e.hand_evaluation != undefined;
    });

    handsDealtEvaluations.forEach((hand) => {
      // let weightedValue = 0;
      let highPair = 0;
      let highCard = 0;

      if (
        hand.hand_rank === "6" ||
        hand.hand_rank === "7" ||
        hand.hand_rank === "8" ||
        hand.hand_rank === "9"
      ) {
        highCard = 0;

        const cards = hand.hand_display.split(",");

        highPair = this.evaluatePair(cards);
        highCard = this.evaluateHighCard(cards, highPair);

        hand.high_pair = highPair;
        hand.high_card = highCard;
        // hand.weighted_value = weightedValue;
      }
    });

    handsDealtEvaluations.sort(this.dynamicSort("hand_value", "desc"));
    handsDealtEvaluations.sort(this.dynamicSort("high_card", "desc"));
    handsDealtEvaluations.sort(this.dynamicSort("high_pair", "desc"));
    handsDealtEvaluations.sort(this.dynamicSort("hand_rank", "asc"));

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
    // this.loadDashboard();
    this.evaluateHands();
    if (this.state.loggedIn) {
      // this.loadDashboard();
      // const J = 11,
      //   Q = 12,
      //   K = 13,
      //   A = 14,
      //   C = 1,
      //   D = 2,
      //   H = 4,
      //   S = 8;
      // console.log(evaluateHand([2, 3, 4, 5, 6], [D, D, D, D, D]));
    }
  };

  componentDidUpdate = () => {
    this.saveLocal();
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
          <HandEvaluationTable evaluations={this.state.evaluations} />
        </section>
      </>
    );
  }
}

{
  /* <section className="form-container">
        <HandEvaluationTable evaluations={this.state.evaluations} />
      </section> */
}

export default Standings;
