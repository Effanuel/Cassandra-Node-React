import { combineReducers, createStore, applyMiddleware } from "redux";
import databaseReducer from "../reducers/databaseReducer";
import modalReducer from "../reducers/modalReducer";
import thunk from "redux-thunk";

const initialState = {};
const middleware = [thunk];

const rootReducer = combineReducers<any>({
  database: databaseReducer,
  modal: modalReducer
});

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

export { store };
