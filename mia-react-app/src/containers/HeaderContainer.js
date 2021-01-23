import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../component/layout/header";
import * as authActions from "../store/modules/auth";

export class HeaderContainer extends Component {
  componentDidMount() {
    const localStorageInfo = localStorage.getItem("userInfo");

    if (localStorageInfo) {
      const parsedUserInfo = JSON.parse(localStorageInfo);
      this.props.setUserTemp({
        id: parsedUserInfo.id,
        username: parsedUserInfo.username,
        token: parsedUserInfo.token,
      });

      //this.props.setUserTemp(id, username, token);
    }
  }

  handleLogout = () => {
    const { logout } = this.props;
    logout();
  };
  render() {
    const { handleLogout } = this;
    return <Header onLogout={handleLogout} logged={this.props.logged} />;
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
