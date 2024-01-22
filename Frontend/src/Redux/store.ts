import { configureStore, combineReducers } from "@reduxjs/toolkit";
import siginReducer from "./signin/slice";
import signupReducer from "./signup/slice";

const rootReducer = combineReducers({
  signin: siginReducer,
  signup: signupReducer,
});

export default configureStore({
  reducer: rootReducer,
});
