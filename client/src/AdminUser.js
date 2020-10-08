import React, { Component } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import UserAdminComponent from "./Components/UserAdminComponent";
import ChangePasswordComponent from "./Components/ChangePasswordComponent";
import { Redirect } from "react-router-dom";
import { USERS_HAND_URL, USER_HANDS_URL, UPDATE_USER_URL } from "./API_Config";

class AdminUser extends Component {
  USERS_HAND_URL = USERS_HAND_URL;
  USER_HANDS_URL = USER_HANDS_URL;
  UPDATE_USER_URL = UPDATE_USER_URL;

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
        allCardsSelectedUser: localState.allCardsSelectedUser || [],
        allHandsSelectedUser: localState.allHandsSelectedUser || [],
        selectedUserName: localState.selectedUserName || "",
        randomDeck: localState.randomDeck || [],
        stopId: 5,
        edit_Id: localState.edit_Id || 0,
        edit_first_name: localState.edit_first_name || "",
        edit_last_name: localState.edit_last_name || "",
        edit_email: localState.edit_email || "",
        edit_password: localState.edit_password || "",
        edit_passwordConfirm: localState.edit_passwordConfirm || "",
        edit_hasBeenUpdated: localState.edit_hasBeenUpdated || false,
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
      this.setState({
        edit_first_name: "",
        edit_last_name: "",
        edit_email: "",
        edit_password: "",
        edit_passwordConfirm: "",
        edit_hasBeenUpdated: false,
      });
    }
  };

  validatePassword = () => {
    const passwordTrimmed = this.state.edit_password.trim();
    const passwordConfirmTrimmed = this.state.edit_passwordConfirm.trim();
    return passwordTrimmed != passwordConfirmTrimmed;
  };

  buildUser = (userId) => {
    const users = [...this.state.dashBoard.users];
    const existingUser = users.filter((user) => {
      return user.id === userId;
    });

    this.setState({
      edit_first_name: existingUser[0].first_name,
      edit_last_name: existingUser[0].last_name,
      edit_email: existingUser[0].email,
      edit_password: "",
      edit_passwordConfirm: "",
    });
  };

  updateUser = (user) => {
    const doPasswordsMatch = this.validatePassword();

    console.log(user);

    debugger;

    if (doPasswordsMatch) {
      return alert("Passwords do not match");
    } else {
      var data = JSON.stringify(user);
      var config = {
        method: "put",
        url: `${this.UPDATE_USER_URL}${this.state.edit_Id}`,
        headers: {
          "Content-Type": "Application/json",
        },
        data: data,
      };

      axios(config)
        .then((response) => {
          alert(`Account has been updated.`);
          this.setState({
            edit_password: "hidden",
            edit_confirmPassword: "",
            edit_hasBeenUpdated: true,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  handleLoadUser = (event) => {
    event.preventDefault();
    console.log("Load User button clicked");
    this.loadAllHandsByUser(this.state.selectedUser);
    this.loadHandsUser(this.state.selectedUser);
  };

  handleUserSelect = async (event) => {
    event.preventDefault();
    const selectedUser = event.target.selectedOptions[0];
    if (selectedUser.textContent === "Select User") {
      return alert("Select a valid user");
    }
    console.log(
      `Selected user: ${selectedUser.textContent} - ${selectedUser.value}`
    );

    this.buildUser(parseInt(selectedUser.value));

    this.setState({
      selectedUser: selectedUser.value,
      edit_Id: selectedUser.value,
      selectedUserName: selectedUser.textContent,
    });
  };

  // Joined data
  loadAllHandsByUser = (userId) => {
    axios
      .get(`${this.USERS_HAND_URL}${userId}`)
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
          allCardsSelectedUser: cardsWithStatus,
          // allCards: response.data,
          handsCountSelectedUser: response.data.length / 5,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // data for form select element
  loadHandsUser = (userId) => {
    axios
      .get(`${this.USER_HANDS_URL}${userId}`)
      .then((response) => {
        this.setState({
          allHandsSelectedUser: response.data,
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

    console.log(card);
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

    debugger;

    const updatedUser = {
      first_name: this.state.edit_first_name,
      last_name: this.state.edit_last_name,
      email: this.state.edit_email,
      password: this.state.edit_password,
    };

    // Prohibit changing of MY password (JK)
    if (this.state.selectedUser != 1) {
      this.updateUser(updatedUser);
    }
  };

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
    const isAdmin = !this.state.isAdmin ? (
      <Redirect to="/" />
    ) : null;

    const hasBeenUpdated = this.state.hasBeenUpdated ? (
      <Redirect to="/" />
    ) : null;

    const isLoggedOut = !this.state.isLoggedIn ? (
      <Redirect to="/login" />
    ) : null;
    return (
      <>
        {isLoggedOut}
        {isAdmin}
        {hasBeenUpdated}
        <section>
          <section className="form-container">
            <Form onSubmit={this.handleLoadUser}>
              <Form.Row>
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
                <Form.Group controlId="frmLoadUserButton">
                  <Button variant="light" type="submit">
                    Load Hands
                  </Button>
                </Form.Group>
              </Form.Row>
            </Form>
          </section>
          <ChangePasswordComponent
            edit_first_name={this.state.edit_first_name}
            edit_last_name={this.state.edit_last_name}
            edit_email={this.state.edit_email}
            edit_password={this.state.edit_password}
            edit_passwordConfirm={this.state.edit_passwordConfirm}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
          <section>
            <UserAdminComponent
              handleCardClick={this.handleCardClick}
              handCards={this.state.allCardsSelectedUser}
              handsCount={this.state.handsCountSelectedUser}
              fullName={this.state.selectedUserName}
            />
          </section>
        </section>
      </>
    );
  }
}

export default AdminUser;
