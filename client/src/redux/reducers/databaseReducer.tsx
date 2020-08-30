import {
  FETCH_DATA_ERROR,
  DATA_LOADING,
  GET_USERS_SUCCESS,
  GET_ACCOUNTS_SUCCESS,
  GET_CARDS_SUCCESS,
  REMOVE_ACCOUNTS_SUCCESS,
  REMOVE_CARDS_SUCCESS,
  ADD_DATA_SUCCESS,
} from "../actions/actionTypes";

import { Actions } from "../actions/databaseActions";
import { DatabaseState } from "../models/state";

const initialState = {
  data: [],
  accounts: [],
  cards: [],
  loading: false,
  error: "",
};

export default (state: DatabaseState = initialState, action: Actions): any => {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: "" };
    case GET_ACCOUNTS_SUCCESS:
      return {
        ...state,
        loading: false,
        accounts: [...state.accounts, action.payload],
        error: "",
      };
    case GET_CARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        cards: [...state.accounts, action.payload],
        error: "",
      };

    case REMOVE_ACCOUNTS_SUCCESS:
      return {
        ...state,
        loading: false,
        accounts: [
          ...state.accounts.filter(
            (item: any) => item.user_id !== action.payload
          ),
        ],
        error: "",
      };
    case REMOVE_CARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        cards: [
          ...state.cards.filter(
            (item: any) => item.account_id !== action.payload
          ),
        ],
        error: "",
      };

    case DATA_LOADING:
      return { ...state, loading: true, error: "" };
    case ADD_DATA_SUCCESS:
      return { ...state, loading: false, error: action.payload };
    case FETCH_DATA_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
