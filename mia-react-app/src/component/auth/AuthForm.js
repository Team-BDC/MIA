import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./AuthForm.css";
import SmallButton from "../shared/SmallButton";

const cx = classNames.bind(styles);

const AuthForm = ({
  kind,
  onChangeInput,
  username,
  password,
  onLogin,
  onRegister,
  error,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChangeInput({ name, value });
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      switch (kind) {
        case "register":
          onRegister();
          return;
        case "login":
          onLogin();
          return;
        default:
          return;
      }
    }
  };
  return (
    
    <div className={cx("body")}>
      
      <div className={cx("back")}></div>
      <div className={cx("moon")}></div>
    <div className={cx("section")}>
    
    <div className={cx("mia")}>
    
    <div className={cx("card")}>
    <div className={cx("mia2")}>MeInAnimation</div>
    <div className={cx("auth-form")}>
      <div className={cx("title")}>{kind.toUpperCase()}</div>
      <div className={cx("error")}>
        {error.triggered && (
          <div className={cx("message")}>{error.message}</div>
        )}
      </div>
      <div className={cx("line-wrapper")}>
        <div className={cx("input-title")}>username</div>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className={cx("line-wrapper")}>
        <div className={cx("input-title")}>password</div>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </div>
      {kind === "register" ? (
        <SmallButton onClick={onRegister} className={cx("auth-button")}>
          {kind.toUpperCase()}
        </SmallButton>
      ) : (
        <SmallButton onClick={onLogin} className={cx("auth-button")}>
          {kind.toUpperCase()}
        </SmallButton>
      )}
      {kind === "register" ? (
        <Link to={`/auth/login`} className={cx("description")}>
          if you already have account...
        </Link>
      ) : (
        <Link to={`/auth/register`} className={cx("description")}>
          if you don't have an account...
        </Link>
      )}
          </div>
        </div></div>
      </div>
    </div>
  );
};

export default AuthForm;
