import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import user from "./redux/slices/userSlice";

const reducer = combineReducers({
  user,
});

export const store = configureStore({
  reducer,
});
