import { combineReducers, createStore, applyMiddleware } from "redux";
import databaseReducer from "../reducers/databaseReducer";

import thunk from "redux-thunk";

const initialState = {};
const middleware = [thunk];

const rootReducer = combineReducers<any>({
  database: databaseReducer
});

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

export { store };
