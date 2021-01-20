import { gallery, galleryEpics } from "./gallery";
import { auth, authEpics } from "./auth";
import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";

export const rootReducers = combineReducers({ gallery, auth });
export const rootEpics = combineEpics(
  galleryEpics.addGalleryEpic,
  authEpics.loginEpic,
  authEpics.registerEpic
  //   galleryEpics.getGalleryEpic,
  //   galleryEpics.updateGalleryEpic,
  //   galleryEpics.deleteGalleryEpic
);
   