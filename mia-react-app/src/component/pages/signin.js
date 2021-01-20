import React, { useState} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idx: null,
      email: "",
      pw: "",
      nickname: "",
      isLogin: null
    };
  }
  //이메일 입력창 관리
  handleEmail = e => {
    this.setState({
      email: e.target.value
    });
  };
  //패스워드 입력창 관리
  handlePW = e => {
    this.setState({
      pw: e.target.value
    });
  };
  //로그인버튼 클릭시 서버로 데이터 전송
  handleSubmit = e => {
    e.preventDefault();
    const login_info = {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    };
    fetch("http://localhost:3000/signin", login_info)
      .then(res => {
        return res.json();
      })
      .then(json => {
        //json형식 {idx: 8, nickname: "noh", email: "noh@gmail.com", success: true}
        if (json.success === true) {
          alert("로그인되었습니다");
          // 서버로 부터 받은 JSON형태의 데이터를 로컬스토리지에 우선 저장한다.
          window.localStorage.setItem('userInfo', JSON.stringify(json))
          //스테이트에 유저정보를 저장한다.
          this.setState({
            idx: json.idx,
            email: json.email,
            nickname: json.nickname,
            isLogin: json.success
          });
          this.props.history.push("/main")
        } else {
          alert("아이디 혹은 비밀번호를 확인하세요");
        }
      });
  };
  render() {
    return (
      <Router>
        <div>
          <form onSubmit={this.handleSubmit}>
            {/* 이메일 인풋창 */}
            <div>
              <span>이메일</span>
              <input
                placeholder="example@google.com"
                value={this.state.email}
                onChange={this.handleEmail}
              />
            </div>
            {/* 비밀번호 인풋 */}
            <div>
              <span>비밀번호</span>
              <input
                placeholder="비밀번호 (6자 이상)"
                value={this.state.password}
                onChange={this.handlePW}
                type="password"
              />
            </div>
            <div>
              {/* 로그인버튼 , 회원가입버튼*/}
              <button className="w-1/6 bg-gray-900 text-white p-2 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300"
              onClick={this.Signin}>로그인</button>
              {/* 회원가입 버튼 클릭 -> /signup페이지로 이동 */}
              <button className="w-1/6 bg-gray-900 text-white p-2 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300" 
              onClick={() => this.props.history.push("/signup")}>
                회원가입
              </button>
            </div>
          </form>
        </div>
      </Router>
    );
  }
}

export default Signin;
