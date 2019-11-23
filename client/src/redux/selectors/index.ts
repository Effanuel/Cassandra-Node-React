import { createSelector } from "reselect";

import { AppState } from "../models/state";

const getUsers = (state: AppState) => state.database.data;
const getAccounts = (state: AppState) => state.database.accounts;
const getCards = (state: AppState) => state.database.cards;
const getLoading = (state: AppState) => state.database.loading;

export const databaseUsersSelector = createSelector(
  [getUsers],
  (data: any) => data
);
export const databaseLoadingSelector = createSelector(
  [getLoading],
  (loading: any) => loading
);
export const databaseCardsSelector = createSelector(
  [getCards],
  (cards: any) => cards
);

export const databaseAccountsSelector = createSelector(
  [getAccounts],
  (accounts: any) => accounts
);
