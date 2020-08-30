import * as constants from "./actionTypes";
import axios from "axios";
import { Thunk } from "../models/state";
import { modalClose } from "./modalActions";

interface DataLoading {
  type: typeof constants.DATA_LOADING;
}
interface GetUsersSuccess {
  type: typeof constants.GET_USERS_SUCCESS;
  payload: any;
}
interface GetAccountsSuccess {
  type: typeof constants.GET_ACCOUNTS_SUCCESS;
  payload: any;
}
interface GetCardsSuccess {
  type: typeof constants.GET_CARDS_SUCCESS;
  payload: any;
}

interface FetchDataError {
  type: typeof constants.FETCH_DATA_ERROR;
  payload: any;
}

interface RemoveAccounts {
  type: typeof constants.REMOVE_ACCOUNTS_SUCCESS;
  payload: any;
}

interface RemoveCards {
  type: typeof constants.REMOVE_CARDS_SUCCESS;
  payload: any;
}

interface Success {
  type: typeof constants.ADD_DATA_SUCCESS;
  payload: any;
}

export type Actions =
  | DataLoading
  | GetUsersSuccess
  | GetAccountsSuccess
  | GetCardsSuccess
  | FetchDataError
  | RemoveAccounts
  | RemoveCards
  | Success;

export const getUsers = (payload?: any): Thunk => async (dispatch) => {
  try {
    dispatch(dataLoading());
    const response = await axios.get("/api/getUsers");
    const { data } = response;
    dispatch(getUsersSuccess(data));
  } catch (err) {
    console.log("FETCHDATAERROR", err);
    dispatch(fetchDataError(err));
  }
};

export const getAccounts = (payload: any): Thunk => async (dispatch) => {
  try {
    dispatch(dataLoading());
    const response = await axios.post("/api/getAccounts", {
      data: { user_id: payload },
    });
    const { data } = response;
    dispatch(getAccountsSuccess(data));
  } catch (err) {
    console.log("FETCHDATAERROR", err);
    dispatch(fetchDataError(err));
  }
};

export const getCards = (payload: any): Thunk => async (dispatch) => {
  try {
    dispatch(dataLoading());
    const response = await axios.post("/api/getCards", {
      data: { account_id: payload },
    });
    const { data } = response;
    dispatch(getCardsSuccess(data));
  } catch (err) {
    console.log("FETCHDATAERROR", err);
    dispatch(fetchDataError(err));
  }
};

export const addAccount = ({
  account_id,
  selectedUserId,
}: any): Thunk => async (dispatch) => {
  try {
    dispatch(dataLoading());
    const response = await axios.post("/api/addAccount", {
      data: { account_id, selectedUserId },
    });
    const { data } = response;
    dispatch(success(data));
    dispatch(modalClose());
  } catch (err) {
    console.log("FETCHDATAERROR", err);
    dispatch(fetchDataError(err));
  }
};

export const addCard = ({ card_id, account_id, balance }: any): Thunk => async (
  dispatch
) => {
  try {
    dispatch(dataLoading());
    const response = await axios.post("/api/addCard", {
      data: { card_id, account_id, balance },
    });
    const { data } = response;
    dispatch(success(data));
    dispatch(modalClose());
  } catch (err) {
    console.log("FETCHDATAERROR", err);
    dispatch(fetchDataError(err));
  }
};

export const removeAccounts = (payload: any) => ({
  type: constants.REMOVE_ACCOUNTS_SUCCESS,
  payload,
});

export const removeCards = (payload: any) => ({
  type: constants.REMOVE_CARDS_SUCCESS,
  payload,
});

export const updateData = (): Thunk => async (dispatch) => {
  try {
    dispatch(dataLoading());
  } catch (err) {
    dispatch(fetchDataError(err));
  }
};

const dataLoading = (payload?: any) => ({
  type: constants.DATA_LOADING,
});

const success = (payload?: any) => ({
  type: constants.ADD_DATA_SUCCESS,
  payload: !payload.success ? "Already exists" : "",
});

const getUsersSuccess = (payload: any) => ({
  type: constants.GET_USERS_SUCCESS,
  payload: payload.data,
});

const getAccountsSuccess = (payload: any) => ({
  type: constants.GET_ACCOUNTS_SUCCESS,
  payload: payload.data,
});

const getCardsSuccess = (payload: any) => ({
  type: constants.GET_CARDS_SUCCESS,
  payload: payload.data,
});

const removeDataSuccess = (payload?: any) => ({
  type: constants.ADD_DATA_SUCCESS,
  payload: payload,
});

const fetchDataError = (payload: any) => ({
  type: constants.FETCH_DATA_ERROR,
  payload: payload.error,
});
