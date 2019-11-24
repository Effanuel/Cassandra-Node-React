import {
  FETCH_DATA_ERROR,
  DATA_LOADING,
  GET_USERS_SUCCESS,
  GET_ACCOUNTS_SUCCESS,
  GET_CARDS_SUCCESS,
  SELECT_NAME
} from "../actions/actionTypes";

import { Actions } from "../actions/databaseActions";
import { DatabaseState } from "../models/state";

const initialState = {
  data: [],
  accounts: [],
  cards: [],
  loading: false,
  error: "",
  selectedName: {
    name: "",
    login: "",
    password: ""
  }
};

export default (state: DatabaseState = initialState, action: Actions): any => {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: ""
      };
    case GET_ACCOUNTS_SUCCESS:
      return {
        ...state,
        loading: false,
        accounts: state.accounts.concat(action.payload),
        error: ""
      };
    case GET_CARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        cards: state.cards.concat(action.payload),
        error: ""
      };

    case DATA_LOADING:
      return { ...state, loading: true, error: "" };
    case FETCH_DATA_ERROR:
      return { ...state, loading: false, error: action.payload };
    // case ADD_DATA_ERROR:
    //   return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
