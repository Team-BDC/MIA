import React, { Component } from "react";
import { connect } from "react-redux";
import * as authActions from "../store/modules/auth";
import { withRouter } from "react-router-dom";

export class BaseContainer extends Component {
  componentDidMount() {
    this.checkUser();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.logged !== this.props.logged && !this.props.logged) {
      window.location.href = "/auth/login";
    }
  }
  checkUser = () => {
    const { checkUser, setUserTemp, history } = this.props;

    // localStorage에 체크 후 userInfo값이 있을때 로그인 되어있는것으로인식 -> setUserTemp
    // 새로고침 할 때, state가 초기화로 logged값이 false로 바뀌는데, 그때도 로그인을 유지하기 위함
    if (localStorage.getItem("userInfo")) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      authActions.setUserTemp({
        id: userInfo.id,
        username: userInfo.username,
        token: userInfo.token,
      });
      return;
    }

    // userInfo값이 localStorage에 없으면 api통신
    checkUser();

    // checkUser가 실패한다면 logged = false로 바뀌므로 로그인 페이지로 이동
    // /auth/register에서는 /auth/login으로 이동할 필요가 없으므로, auth라는 path가 url에 포함될때는 제외시킨다
    if (!this.props.logged && !window.location.pathname.includes("auth")) {
      history.push("/auth/login");
    }
  };

  render() {
    return <div />;
  }
}

const mapStateToProps = (state) => ({
  logged: state.auth.logged,
});

const mapDispatchToProps = (dispatch) => {
  return {
    checkUser: () => {
      dispatch(authActions.checkUser());
    },
    setUserTemp: ({ id, username, token }) => {
      dispatch(authActions.setUserTemp({ id, username, token }));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BaseContainer)
);
