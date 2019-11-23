import * as constants from "./actionTypes";
import axios from "axios";

import { Thunk } from "../models/state";

interface DataLoading {
  type: constants.DATA_LOADING;
}
interface GetUsersSuccess {
  type: constants.GET_USERS_SUCCESS;
  payload: any;
}
interface GetAccountsSuccess {
  type: constants.GET_ACCOUNTS_SUCCESS;
  payload: any;
}
interface GetCardsSuccess {
  type: constants.GET_CARDS_SUCCESS;
  payload: any;
}

interface FetchDataError {
  type: constants.FETCH_DATA_ERROR;
  payload: any;
}

export type Actions =
  | DataLoading
  | GetUsersSuccess
  | GetAccountsSuccess
  | GetCardsSuccess
  | FetchDataError;

export const getUsers = (payload?: any): Thunk => async dispatch => {
  try {
    dispatch(dataLoading());
    const response = await axios.get("/api/getUsers");
    const { data } = response;
    console.log(data, "FETCH DATA USERS");
    dispatch(getUsersSuccess(data));
  } catch (err) {
    console.log("FETCHDATAERROR", err);
    dispatch(fetchDataError(err));
  }
};

export const getAccounts = (payload: any): Thunk => async dispatch => {
  try {
    dispatch(dataLoading());
    const response = await axios.post("/api/getAccounts", {
      data: {
        user_id: payload
      }
    });
    const { data } = response;
    dispatch(getAccountsSuccess(data));
  } catch (err) {
    console.log("FETCHDATAERROR", err);
    dispatch(fetchDataError(err));
  }
};
export const getCards = (payload: any): Thunk => async dispatch => {
  try {
    dispatch(dataLoading());
    const response = await axios.post("/api/getCards", {
      data: {
        account_id: payload
      }
    });
    const { data } = response;
    console.log("CARDSGET", data);
    dispatch(getCardsSuccess(data));
  } catch (err) {
    console.log("FETCHDATAERROR", err);
    dispatch(fetchDataError(err));
  }
};

export const removeData = (payload: any): Thunk => async dispatch => {
  try {
    dispatch(dataLoading());
  } catch (err) {
    dispatch(fetchDataError(err));
  }
};

export const updateData = ({
  name,
  login,
  password
}: any): Thunk => async dispatch => {
  try {
    dispatch(dataLoading());
  } catch (err) {
    dispatch(fetchDataError(err));
  }
};

function dataLoading(payload?: any): any {
  return {
    type: constants.DATA_LOADING
  };
}

function getUsersSuccess(payload: any): any {
  return {
    type: constants.GET_USERS_SUCCESS,
    payload: payload.data
  };
}

function getAccountsSuccess(payload: any): any {
  return {
    type: constants.GET_ACCOUNTS_SUCCESS,
    payload: payload.data
  };
}

function getCardsSuccess(payload: any): any {
  return {
    type: constants.GET_CARDS_SUCCESS,
    payload: payload.data
  };
}

function removeDataSuccess(payload?: any): any {
  return {
    type: constants.ADD_DATA_SUCCESS,
    payload: payload
  };
}

function fetchDataError(payload: any): any {
  return {
    type: constants.FETCH_DATA_ERROR,
    payload: payload.error
  };
}
