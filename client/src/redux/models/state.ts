import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

export type Thunk = ThunkAction<void, any, any, Action<string>>;

export interface AppState {
  database: DatabaseState;
  modal: ModalState;
}

export interface DatabaseState {
  data: any;
  accounts: any;
  cards: any;
  loading: boolean;
  error: string;
}

export interface ModalState {
  showModal: string | null | undefined;
  selectedUserId: any;
  selectedAccountId: any;
}
