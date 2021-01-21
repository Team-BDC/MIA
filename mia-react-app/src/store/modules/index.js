import { auth, authEpics } from "./auth";
import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";

export const rootReducers = combineReducers({ auth });
export const rootEpics = combineEpics(
  authEpics.loginEpic,
  authEpics.registerEpic,
  authEpics.checkUserEpic,
  authEpics.logoutEpic
);
