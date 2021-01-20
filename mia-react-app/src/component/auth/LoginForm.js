import React, { Component } from "react";
import "./LoginForm.css";

export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    alert(
      "A username and password was submitted: " +
        this.state.username +
        " " +
        this.state.password
    );
    event.preventDefault();
  }

  render() {
    return (
      <div>
        로그인
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </label>
          <br></br>
          <br></br>
          <label>
            Password:
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <br></br>
          <br></br>
          <input type="submit" value="로그인" />
        </form>
      </div>
    );
  }
}

export default LoginForm;
