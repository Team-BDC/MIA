import { ajax } from "rxjs/observable/dom/ajax";
import { of } from "rxjs";
import { map, mergeMap, catchError, withLatestFrom } from "rxjs/operators";
import { ofType } from "redux-observable";

const CHANGE_GALLERY_INPUT = "gallery/CHANGE_GALLERY_INPUT";

const ADD_GALLERY = "gallery/ADD_GALLERY";
const ADD_GALLERY_SUCCESS = "gallery/ADD_GALLERY_SUCCESS";
const ADD_GALLERY_FAILURE = "gallery/ADD_GALLERY_FAILURE";

export const changeGalleryInput = ({ value }) => ({
  type: CHANGE_GALLERY_INPUT,
  payload: { value },
});

export const addGallery = () => ({
  type: ADD_GALLERY,
});
export const addGallerySuccess = (gallery) => ({
  type: ADD_GALLERY_SUCCESS,
  payload: {
    gallery,
  },
});
export const addGalleryFailure = (error) => ({
  type: ADD_GALLERY_FAILURE,
  payload: {
    error,
  },
});

const addGalleryEpic = (action$, state$) => {
  return action$.pipe(
    ofType(ADD_GALLERY),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      return ajax
        .post(`/api/v1/mia/gallery_list/`, { text: state.gallery.galleryInput })
        .pipe(
          map((response) => {
            const note = response.response;
            return addGallerySuccess(note);
          }),
          catchError((error) =>
            of({
              type: ADD_GALLERY_FAILURE,
              payload: error,
              error: true,
            })
          )
        );
    })
  );
};

const initialState = {
  galleryInput: "",
};

export const gallery = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_GALLERY_INPUT:
      return {
        ...state,
        galleryInput: action.payload.value,
      };
    case ADD_GALLERY_SUCCESS:
      const { gallery } = action.payload;
      return {
        ...state,
        notes: [gallery].concat(state.gallery),
        noteInput: "",
      };
    case ADD_GALLERY_FAILURE:
      return {
        ...state,
        error: {
          triggered: true,
          message: "Error! Please Try With Unempty Gallery",
        },
      };

    default:
      return state;
  }
};

export const galleryEpics = {
  addGalleryEpic,
};
