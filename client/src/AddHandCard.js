import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

class AddHandCard extends Component {
  USERS_FULL_NAME_URL = "/api/fullnames/";
  RUNS_URL = "/api/runs/";
  ADD_HAND_CARD_URL = "/api/handcards/";
  USER_HANDS_URL = "/api/handsuser/";

  constructor(props) {
    super(props);
    this.state = {
      usersFullNamesUrl: this.USERS_FULL_NAME_URL,
      addHandcardUrl: this.ADD_HAND_CARD_URL,
      userHandsUrl: this.USER_HANDS_URL,
      runsUrl: this.RUNS_URL,
      users: [],
      userHands: [],
      selectedUser: "",
      runs: [],
      selectedRun: "",
      selectedHand: "",
      randomDeck: [],
      newHand: [],
    };
  }

  componentDidMount = () => {
    this.loadUsers();
    this.loadRuns();

    this.setState({
      randomDeck: this.getRandomDeck(52),
    });
  };

  addCardsToHand = () => {
    const deck = [...this.state.randomDeck];
    let newHand = [];

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
    // Gets cardCount number of unique cards
    // from 1 to 52
    var deck = [];
    while (deck.length < cardCount) {
      var r = Math.floor(Math.random() * 52) + 1;
      if (deck.indexOf(r) === -1) deck.push(r);
    }
    console.log(deck);
    return deck;
  };

  loadUsers = () => {
    axios
      .get(`${this.state.usersFullNamesUrl}`)
      .then((response) => {
        this.setState({
          users: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  loadRuns = () => {
    axios
      .get(`${this.state.runsUrl}`)
      .then((response) => {
        this.setState({
          runs: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  loadUserHands = (id) => {
    axios
      .get(`${this.state.userHandsUrl}${id}`)
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
      url: this.state.addHandcardUrl,
      headers: {
        "Content-Type": "Application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(`New Hand Card Added`);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  componentDidUpdate = () => {};

  render() {
    return (
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
                {this.state.runs.map((run) => (
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
                {this.state.users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.full_name}
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
                Add Hand
              </Button>
            </Form.Group>
          </Form.Row>

          {/* <Form.Row>
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
          </Form.Row> */}
        </Form>
        {/* <RunAdminsTable
          runAdmins={this.state.runAdmins}
          deleteAdmin={this.deleteAdmin}
        /> */}
      </section>
    );
  }
}

export default AddHandCard;
