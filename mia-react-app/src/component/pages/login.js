import React, { Component } from "react";
import LoginForm from "../auth/LoginForm";

// 로그인 로직을 수행하는 컴포넌트
export class login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
  }

  // 만약 유저가 이미 로그인된 상태라면 home으로 이동
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/home");
    }
  }

  validateForm(username, password) {
    if (username && username.length > 0 && password && password.length > 0) {
      return true;
    } else {
      alert("폼을 모두 작성해주세요.");
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  // 서버에 등록되어있는 회원 정보로 로그인을 시도하는 경우
  handleSubmit(submitEvent) {
    let data = {
      username: this.state.username,
      password: this.state.password,
    };

    submitEvent.preventDefault();

    let handleErrors = (response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    };

    // 서버로부터 새로운 access token 발급받음
    fetch("http://localhost:8000/jwt/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        // 발급 완료 되었다면 해당 토큰을 클라이언트 Local Storage에 저장
        if (json.user && json.user.username && json.token) {
          this.props.userHasAuthenticated(true, json.user.username, json.token);
          this.props.history.push("/home");
        }
      })
      .catch((error) => alert(error));
  }

  render() {
    return (
      <LoginForm
        username={this.state.username}
        password={this.state.password}
        handleChangeUsername={(e) => this.handleChange(e)}
        handleChangePassword={(e) => this.handleChange(e)}
        handleSubmit={(e) => this.handleSubmit(e)}
        handleGoogleSignIn={(e) => this.handleGoogleSignIn(e)}
        validate={this.validateForm}
      />
    );
  }
}

export default login;
