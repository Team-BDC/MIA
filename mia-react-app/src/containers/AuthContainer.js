import React, { Component } from "react";
import { connect } from "react-redux";
import AuthForm from "../component/auth/AuthForm";
import { withRouter } from "react-router-dom";
import * as authActions from "../store/modules/auth";

// redux-auth의 logged state로 로그인 상태를 체크하며, 로그인/회원가입 하면 true로
// 현재 새로고침하면 logged = false 되면서 로그인이 풀린다.

export class AuthContainer extends Component {
  componentDidMount() {
    this.initialize();
  }

  // 로그인 여부에 따라 컴포넌트를 업데이트한다.
  // 현재 유저 정보의 저장
  componentDidUpdate(prevProps, prevState) {
    const { history } = this.props;

    if (prevProps.kind !== this.props.kind) {
      this.initialize();
    }
    if (prevProps.logged !== this.props.logged && this.props.logged) {
      // logged = true 일 때 로그인 되었으므로, localStorage에 현재 값을 저장한다.
      // localStorage는 문자열만 가능하므로 JSON.stringify를 이용한다.
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          id: this.props.userInfo.id,
          username: this.props.userInfo.username,
          token: this.props.userInfo.token,
        })
      );
      // 로그인에 성공하면 main페이지로 이동
      history.push("/");
    }
  }

  initialize = () => {
    const { initializeInput, initializeError } = this.props;
    initializeError();
    initializeInput();
  };

  handleChangeInput = ({ name, value }) => {
    const { changeInput } = this.props;
    changeInput({ name, value });
  };

  handleLogin = () => {
    const { login } = this.props;
    login();
  };

  handleRegister = () => {
    const { register } = this.props;
    register();
  };

  render() {
    const { kind, username, password, error } = this.props;
    const { handleChangeInput, handleLogin, handleRegister } = this;
    return (
      <AuthForm
        kind={kind}
        username={username}
        password={password}
        onChangeInput={handleChangeInput}
        onLogin={handleLogin}
        onRegister={handleRegister}
        error={error}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.auth.form.username,
  password: state.auth.form.password,
  userInfo: state.auth.userInfo,
  logged: state.auth.logged,
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch) => {
  return {
    initializeInput: () => {
      dispatch(authActions.initializeInput());
    },
    changeInput: ({ name, value }) => {
      dispatch(authActions.changeInput({ name, value }));
    },
    initializeError: () => {
      dispatch(authActions.initializeError());
    },
    register: () => {
      dispatch(authActions.register());
    },
    login: () => {
      dispatch(authActions.login());
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AuthContainer)
);
