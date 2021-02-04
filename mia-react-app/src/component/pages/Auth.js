import React from "react";
import AuthContainer from "../../containers/AuthContainer";

const Auth = (props) => {
  const { kind } = props.match.params;
  return (
    <div>
      <AuthContainer kind={kind} {...props} />
    </div>
  );
};

export default Auth;
