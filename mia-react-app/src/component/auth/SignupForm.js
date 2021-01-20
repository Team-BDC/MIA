// 서버에 직접 회원 등록
// jwt를 이용, 사용자에게 토큰 발행하고 -> 인증된 사용자인지 판별한다

import React, { Component } from "react";
import SmallButton from "../shared/SmallButton";
import "./SignupForm.css";

import { Provider, connect } from "react-redux";

const SignupForm = ({
  username,
  password,
  email,
  handleChangeUsername,
  handleChangePassword,
  handleChangeEmail,
  handleSubmit,
  validate,
}) => {
  return (
    <div className="Signup">
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            name="username"
            type="text"
            value={username}
            onChange={handleChangeUsername}
          />
        </label>
        <br></br>
        <br></br>
        <label>
          Email:
          <input
            name="email"
            type="text"
            value={email}
            onChange={handleChangeEmail}
          />
        </label>
        <br></br>
        <br></br>
        <label>
          Password:
          <input
            name="password"
            type="password"
            value={password}
            onChange={handleChangePassword}
          />
        </label>
        <br></br>
        <br></br>
        <SmallButton
          type="submit"
          block
          disabled={!validate(username, password)}
        >
          회원가입
        </SmallButton>
      </form>
    </div>
  );
};

export default SignupForm;
