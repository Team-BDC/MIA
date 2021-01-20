import React from "react";
import AuthForm from "../auth/AuthForm";
import AuthContainer from "../../containers/AuthContainer";

const Auth = ({ match }) => {
  // App.js /:kind로 설정해둔 값입니다.
  const { kind } = match.params;
  return (
    <div>
      <AuthContainer kind={kind} />
    </div>
  );
};

export default Auth;
