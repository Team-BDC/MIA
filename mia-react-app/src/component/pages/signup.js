import React, { Component } from "react";
import SignupForm from "../auth/SignupForm";
import axios from "axios";
import Auth from "../token/auth";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export class signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
    };
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  validateForm(username, email, password) {
    return (
      username &&
      username.length > 0 &&
      password &&
      password.length > 0 &&
      email &&
      email.length > 0
    );
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  async handleSubmit(submitEvent) {
    let data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };

    submitEvent.preventDefault();

    let handleErrors = (response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    };

    fetch("http://localhost:8000/api/v1/user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        if (json.username && json.token) {
          this.props.userHasAuthenticated(true, json.username, json.token);
          this.props.history.push("/");
        }
      })
      .catch((error) => alert(error));
  }

  render() {
    return (
      <div>
        <SignupForm
          username={this.state.username}
          password={this.state.password}
          email={this.state.email}
          handleChangeUsername={(e) => this.handleChange(e)}
          handleChangePassword={(e) => this.handleChange(e)}
          handleChangeEmail={(e) => this.handleChange(e)}
          handleSubmit={(e) => this.handleSubmit(e)}
          validate={this.validateForm}
        />
      </div>
    );
  }
}

export default signup;
