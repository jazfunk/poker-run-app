import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Redirect } from "react-router-dom";
import {
  FULL_NAMES_URL,
  RUNS_URL,
  ADD_HAND_CARD_URL,
  USER_HANDS_URL,
} from "./API_Config";

class AddHandCard extends Component {
  FULL_NAMES_URL = FULL_NAMES_URL;
  RUNS_URL = RUNS_URL;
  ADD_HAND_CARD_URL = ADD_HAND_CARD_URL;
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
        password: localState.password || "",
        userId: localState.userId || 0,
        // users: localState.users || [],
        selectedUser: localState.selectedUser || "",
        selectedRun: localState.selectedRun || 1,
        // runs: localState.runs || [],
        // runAdmins: localState.runAdmins || [],
        userHands: localState.userHands || [],
        selectedHand: localState.selectedHand || "",
        randomDeck: localState.randomDeck || [],
        newHand: localState.newHand || [],
      };
    } else {
      this.state = {
        isLoggedIn: false,
        // users: [],
        selectedUser: "",
        selectedRun: 1,
        // runs: [],
        // runAdmins: [],
      };
    }
  };

  componentDidMount = () => {
    if (this.state.isLoggedIn) {
      // this.loadUsers();
      // this.loadRuns();

      this.setState({
        randomDeck: this.getRandomDeck(52),
      });
    }
  };

  addCardsToHand = () => {
    const deck = [...this.state.randomDeck];
    let newHand = [];

    // Extracts/Deletes the first number in the array
    // Adds it to the hand
    for (let i = 1; i <= 5; i++) {
      var card = deck.shift();
      newHand.push(card);
      console.log(card);
    }

    this.setState({
      randomDeck: deck,
      newHand: newHand,
    });
  };

  getRandomDeck = (cardCount) => {
    // Gets (cardCount) n of unique cards
    // from 1 to 52
    let deck = [];
    while (deck.length < cardCount) {
      let r = Math.floor(Math.random() * 52) + 1;
      if (deck.indexOf(r) === -1) deck.push(r);
    }
    console.log(deck);
    return deck;
  };

  loadUsers = () => {
    // axios
    //   .get(`${this.FULL_NAMES_URL}`)
    //   .then((response) => {
    //     this.setState({
    //       users: response.data,
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  loadRuns = () => {
    // axios
    //   .get(`${this.RUNS_URL}`)
    //   .then((response) => {
    //     this.setState({
    //       runs: response.data,
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  loadUserHands = (id) => {
    axios
      .get(`${this.USER_HANDS_URL}${id}`)
      .then((response) => {
        this.setState({
          userHands: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleUserSelect = (event) => {
    event.preventDefault();
    const selectedUser = event.target.selectedOptions[0];
    console.log(
      `Selected user: ${selectedUser.textContent}-${selectedUser.value}`
    );
    if (selectedUser.textContent === "Select User") {
      return alert("You must select a user");
    }
    this.setState({
      selectedUser: selectedUser.value,
    });

    if (selectedUser.value > 0) {
      this.loadUserHands(selectedUser.value);
    }
  };

  handleRunSelect = (event) => {
    event.preventDefault();
    const selectedRun = event.target.selectedOptions[0];
    console.log(`Selected Run: ${selectedRun.textContent}`);
    
    if (selectedRun.textContent === "Select Run") {
      return alert("You must select a run");
    }
    this.setState({
      selectedRun: selectedRun.value,
    });
  };

  handleHandSelect = (event) => {
    event.preventDefault();
    const selectedHand = event.target.selectedOptions[0];
    console.log(`Selected Hand: ${selectedHand.textContent}`);
    this.setState({
      selectedHand: selectedHand.value,
    });

    // Adds five cards from deck into state only
    this.addCardsToHand();
  };

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    event.target.reset();

    // TODO:  Loop through Deck array
    // to get newHand card id
    // Currently only grabbing the very first.
    const handCard = {
      hand_id: this.state.selectedHand,
      card_id: this.state.newHand[0],
    };

    this.postNewHandCard(handCard);
  };

  postNewHandCard = (handCard) => {
    var data = JSON.stringify(handCard);
    var config = {
      method: "post",
      url: this.ADD_HAND_CARD_URL,
      headers: {
        "Content-Type": "Application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(`New Card Added To Hand`);
      })

      .catch((error) => {
        console.log(error);
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
          {console.log("AddHandCard")}
        <section className="form-container">
          <Form onSubmit={this.handleSubmit}>
            <Form.Row>
              <Form.Group controlId="frmRunSelect">
                <select
                  name="selectedRun"
                  className="form-control"
                  defaultValue={this.state.selectedRun}
                  onChange={this.handleRunSelect}
                >
                  <option>Select Run</option>
                  {this.state.dashBoard.runs.map((run) => (
                    <option key={run.id} value={run.id}>
                      {run.run_name}
                    </option>
                  ))}
                </select>
              </Form.Group>
              &nbsp;&nbsp;&nbsp;
              <Form.Group controlId="frmUserSelect">
                <select
                  name="selectedUser"
                  className="form-control"
                  defaultValue={this.state.selectedUser}
                  onChange={this.handleUserSelect}
                >
                  <option>Select User</option>
                  {this.state.dashBoard.users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.first_name} {user.last_name}
                    </option>
                  ))}
                </select>
              </Form.Group>
              &nbsp;&nbsp;&nbsp;
              <Form.Group controlId="frmUserHandSelect">
                <select
                  name="selectedHand"
                  className="form-control"
                  defaultValue={this.state.selectedHand}
                  onChange={this.handleHandSelect}
                >
                  <option>Select Hand</option>
                  {this.state.userHands.map((hand) => (
                    <option key={hand.id} value={hand.id}>
                      {hand.hand_number}-{hand.run_id}
                    </option>
                  ))}
                </select>
              </Form.Group>
              &nbsp;&nbsp;&nbsp;
              <Form.Group controlId="frmAddUserHandButton">
                <Button variant="light" type="submit">
                  Add Card to Hand
                </Button>
              </Form.Group>
            </Form.Row>
          </Form>
          {/* TODO:  Add Table */}
        </section>
      </>
    );
  }
}

export default AddHandCard;
