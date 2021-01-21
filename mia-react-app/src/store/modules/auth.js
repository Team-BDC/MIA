import { ofType } from "redux-observable";
import { ajax } from "rxjs/ajax";
import { map, mergeMap, catchError, withLatestFrom } from "rxjs/operators";
import { of } from "rxjs";

const LOGOUT = "auth/LOGOUT";
const LOGOUT_SUCCESS = "auth/LOGOUT_SUCCESS";
const LOGOUT_FAILURE = "auth/LOGOUT_FAILURE";

const REGISTER = "auth/REGISTER";
const REGISTER_SUCCESS = "auth/REGISTER_SUCCESS";
const REGISTER_FAILURE = "auth/REGISTER_FAILURE";

const LOGIN = "auth/LOGIN";
const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
const LOGIN_FAILURE = "auth/LOGIN_FAILURE";

const INITIALIZE_INPUT = "auth/INITIALIZE_INPUT";
const CHANGE_INPUT = "auth/CHANGE_INPUT";
const INITIALIZE_ERROR = "auth/INITIALIZE_ERROR";

const CHECK_USER = "auth/CHECK_USER";
const CHECK_USER_SUCCESS = "auth/CHECK_USER_SUCCESS";
const CHECK_USER_FAILURE = "auth/CHECK_USER_FAILURE";

const SET_USER_TEMP = "auth/SET_USER_TEMP";

// 로그아웃
export const logout = () => ({
  type: LOGOUT,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutFailure = () => ({
  type: LOGOUT_FAILURE,
});

// 로그인 정보 유지 및 체크
export const checkUser = () => ({
  type: CHECK_USER,
});

export const checkUserSuccess = () => ({
  type: CHECK_USER_SUCCESS,
});

export const checkUserFailure = (error) => ({
  type: CHECK_USER_FAILURE,
  payload: {
    error,
  },
});

export const setUserTemp = ({ id, username, token }) => ({
  type: SET_USER_TEMP,
  payload: {
    id,
    username,
    token,
  },
});

// 회원가입
export const register = () => ({
  type: REGISTER,
});

export const registerSuccess = ({ user, token }) => ({
  type: REGISTER_SUCCESS,
  payload: {
    user,
    token,
  },
});

export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: {
    error,
  },
});

// 로그인
export const login = () => ({
  type: LOGIN,
});

export const loginSuccess = ({ user, token }) => ({
  type: LOGIN_SUCCESS,
  payload: {
    user,
    token,
  },
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: {
    error,
  },
});

export const initializeError = () => ({
  type: INITIALIZE_ERROR,
});

export const initializeInput = () => ({
  type: INITIALIZE_INPUT,
});

export const changeInput = ({ name, value }) => ({
  type: CHANGE_INPUT,
  payload: {
    name,
    value,
  },
});

// 회원가입 api 통신
// /api/v1/user/register/ 에 post로 값 연결
// 해당 endpoint는 git-wiki 참고
const registerEpic = (action$, state$) => {
  return action$.pipe(
    ofType(REGISTER),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const { username, password } = state.auth.form;
      return ajax
        .post(`/api/v1/user/register/`, {
          username,
          password,
        })
        .pipe(
          map((response) => {
            const { user, token } = response.response;
            return registerSuccess({ user, token });
          }),
          catchError((error) =>
            of({
              type: REGISTER_FAILURE,
              payload: error,
              error: true,
            })
          )
        );
    })
  );
};

// 로그인 api 통신
// /api/v1/user/login/ 에 post로 값 연결
// 해당 endpoint는 git-wiki 참고
const loginEpic = (action$, state$) => {
  return action$.pipe(
    ofType(LOGIN),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const { username, password } = state.auth.form;
      return ajax
        .post(`/api/v1/user/login/`, {
          username,
          password,
        })
        .pipe(
          map((response) => {
            const { user, token } = response.response;
            return loginSuccess({ user, token });
          }),
          catchError((error) =>
            of({
              type: LOGIN_FAILURE,
              payload: error,
              error: true,
            })
          )
        );
    })
  );
};

// 로그아웃 api 통신
// knox token 이용
// 성공하면 localStorage에서 현재 유저 정보를 지운다
const logoutEpic = (action$, state$) => {
  return action$.pipe(
    ofType(LOGOUT),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const token = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo")).token
        : null;
      return ajax
        .post(
          `/api/v1/user/auth/logout/`,
          {},
          {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          }
        )
        .pipe(
          map((response) => {
            localStorage.removeItem("userInfo");
            return logoutSuccess();
          }),
          catchError((error) => {
            of({
              type: LOGIN_FAILURE,
              payload: error,
              error: true,
            });
          })
        );
    })
  );
};

const checkUserEpic = (action$, state$) => {
  return action$.pipe(
    ofType(CHECK_USER),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const token = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo")).token
        : null;
      return ajax
        .get(`/api/v1/user/user/`, {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        })
        .pipe(
          map((response) => {
            return checkUserSuccess();
          }),
          catchError((error) =>
            of({
              type: CHECK_USER_FAILURE,
              payload: error,
              error: true,
            })
          )
        );
    })
  );
};

const initialState = {
  form: {
    username: "",
    password: "",
  },
  error: {
    triggered: false,
    message: "",
  },
  logged: false,
  userInfo: {
    id: null,
    username: "",
    token: null,
  },
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_INPUT:
      return {
        ...state,
        form: {
          username: "",
          password: "",
        },
      };

    case CHANGE_INPUT:
      let newForm = state.form;
      newForm[action.payload.name] = action.payload.value;
      return {
        ...state,
        form: newForm,
      };

    case INITIALIZE_ERROR:
      return {
        ...state,
        error: {
          triggered: false,
          message: "",
        },
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        logged: true,
        userInfo: {
          id: action.payload.user.id,
          username: action.payload.user.username,
          token: action.payload.token,
        },
      };

    case REGISTER_FAILURE:
      switch (action.payload.status) {
        case 400:
          return {
            ...state,
            error: {
              triggered: true,
              message: "WRONG USERNAME OR PASSWORD",
            },
          };

        case 500:
          return {
            ...state,
            error: {
              triggered: true,
              message: "TOO SHORT USERNAME OR PASSWORD",
            },
          };

        default:
          return {
            ...state,
          };
      }

    case LOGIN_SUCCESS:
      return {
        ...state,
        logged: true,
        userInfo: {
          id: action.payload.user.id,
          username: action.payload.user.username,
          token: action.payload.token,
        },
      };

    case LOGIN_FAILURE:
      switch (action.payload.status) {
        case 400:
          return {
            ...state,
            error: {
              triggered: true,
              message: "WRONG USERNAME OR PASSWORD",
            },
          };

        case 500:
          return {
            ...state,
            error: {
              triggered: true,
              message: "PLEASE TRY AGAIN",
            },
          };

        default:
          return {
            ...state,
          };
      }

    case CHECK_USER_SUCCESS:
      return {
        ...state,
      };

    case CHECK_USER_FAILURE:
      return {
        ...state,
        logged: false,
        userInfo: { id: null, username: "", token: null },
      };

    case SET_USER_TEMP:
      return {
        ...state,
        logged: true,
        userInfo: {
          id: action.payload.id,
          username: action.payload.username,
          token: action.payload.token,
        },
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        logged: false,
        userInfo: {
          id: null,
          message: "",
          token: null,
        },
      };

    case LOGOUT_FAILURE:
      return {
        ...state,
        error: {
          triggered: true,
          message: "LOGOUT ERROR, PLEASE TRY AGAIN",
        },
      };

    default:
      return state;
  }
};

export const authEpics = {
  loginEpic,
  registerEpic,
  checkUserEpic,
  logoutEpic,
};
