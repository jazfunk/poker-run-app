const API_PORT = process.env.PORT || 5000;
const ADMIN_DASHBOARD = "/api/dashboard";
const ADD_USER_URL = "/api/users/";
const FULL_NAMES_URL = "/api/fullnames/";
const RUNS_URL = "/api/runs/";
const ADD_RUN_URL = "/api/runs/";
const RUN_ADMINS_URL = "/api/runadminsbyrun/";
const ADD_RUN_ADMIN_URL = "/api/runadmin/";
const ADD_USERS_HAND = "/api/hands/";
const ADD_HAND_CARD_URL = "/api/handcards/"
const ADD_HAND_CARD_ARRAY_URL = "/api/handcardarray/"
const USER_HANDS_URL = "/api/handsuser/";
const USERS_HAND_URL = "/api/usershand/";
const CARDS_URL = "/api/cards";
const LOGIN_URL = "/api/user/login";
const UPDATE_USER_URL = "/api/users/"

module.exports = {
  API_PORT,
  ADMIN_DASHBOARD,
  ADD_USER_URL,
  FULL_NAMES_URL,
  RUNS_URL,  
  ADD_RUN_URL,
  ADD_RUN_ADMIN_URL,
  RUN_ADMINS_URL,
  ADD_USERS_HAND,
  ADD_HAND_CARD_URL,
  ADD_HAND_CARD_ARRAY_URL,
  USER_HANDS_URL,
  USERS_HAND_URL,
  CARDS_URL,
  LOGIN_URL,
  UPDATE_USER_URL
};
