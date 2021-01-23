import { auth, authEpics } from "./auth";
import { combineReducers } from "redux";
import { gallery, galleryEpics } from "./gallery";
import { combineEpics } from "redux-observable";

export const rootReducers = combineReducers({ auth, gallery });
export const rootEpics = combineEpics(
  authEpics.loginEpic,
  authEpics.registerEpic,
  authEpics.checkUserEpic,
  authEpics.logoutEpic,
  galleryEpics.addGalleryEpic
);
