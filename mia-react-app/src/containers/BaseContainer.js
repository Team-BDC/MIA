// import React, { Component } from "react";
// import { connect } from "react-redux";
// import * as authActions from "../store/modules/auth";
// import { withRouter } from "react-router-dom";

// // 전역으로 사용할 컨테이너
// // 여기서 로그인 유지와 관련된 기능을 수행
// // redux-auth의 logged state로 로그인 상태를 체크하며, 로그인/회원가입 하면 true로
// // 현재 새로고침하면 logged = false 되면서 로그인이 풀린다.
// // 도와줘요 진희갓(당근 흔드는 중)

// export class BaseContainer extends Component {
//   componentDidMount() {
//     this.checkUser();
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevProps.logged !== this.props.logged && !this.props.logged) {
//       window.location.href = "/auth/login";
//     }
//   }
//   checkUser = () => {
//     //const { checkUser, setUserTemp, history } = authActions;
//     // localStorage에 체크 후 userInfo값이 있을때 로그인 되어있는것으로인식 -> setUserTemp
//     // 새로고침 할 때, state가 초기화로 logged값이 false로 바뀌는데, 그때도 로그인을 유지하기 위함
//     /*if (localStorage.getItem("userInfo")) {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       console.log(userInfo);
//       setUserTemp({
//         id: userInfo.id,
//         username: userInfo.username,
//         token: userInfo.token,
//       });
//       return;
//     } else checkUser();*/
//     // userInfo값이 localStorage에 없으면 api통신
//   };

//   render() {
//     return <>{this.props.children}</>;
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     logged: state.auth.logged,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     checkUser: () => {
//       dispatch(authActions.checkUser());
//     },
//     setUserTemp: ({ id, username, token }) => {
//       dispatch(authActions.setUserTemp({ id, username, token }));
//     },
//   };
// };

// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(BaseContainer)
// );

import React, { Component } from "react";
import { connect } from "react-redux";
import RoutePage from "../component/pages/routePage";
import * as authActions from "../store/modules/auth";

export class BaseContainer extends Component {
  componentDidMount() {
    this.props.checkUser();
    //this.props.setUserTemp(id, username, token);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.logged !== this.props.logged && !this.props.logged) {
      window.location.href = "/auth/login";
    }
  }
  render() {
    return <RoutePage {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    logged: state.auth.logged,
    userInfo: state.auth.userInfo,
  };
};
/*const mapStateToProps = (state) => ({});*/

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(authActions.logout());
    },
    setUserTemp: ({ id, username, token }) => {
      dispatch(authActions.setUserTemp({ id, username, token }));
    },
    checkUser: () => {
      dispatch(authActions.checkUser());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseContainer);
