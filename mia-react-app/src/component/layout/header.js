import { useHistory, NavLink } from "react-router-dom";
import { useState } from "react";

function Header({ title, backFunc, params, noBackBtn }) {
  const activeStyle = {
    color: "white",
    fontWeight: "800",
  };

  //const [isLoginUser, setIsLoginUser] = useState(false); //로그인 여부를 알려줄겨 나중에 기능 구현 시작되면!
  // 로그인 여부에 따라 밑에 달라질 것
  //(로그인 x : 메인화면, 로그인, 회원가입, 카메라, 결과물)
  //(로그인 o : 메인화면, 카메라, 결과물, 갤러리, 마이페이지, 로그아웃)
  return (
    <header className="flex items-center bg-gray-800 p-3 flex-wrap w-screen">
      <NavLink
        className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
        exact
        to="/"
        activeStyle={activeStyle}
      >
        메인화면
      </NavLink>

      <NavLink //로그인 페이지에서 연결 시켜야함
        className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
        to="/find"
        activeStyle={activeStyle}
      >
        아이디/비번 찾기
      </NavLink>

      <NavLink
        className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
        to="/signin"
        activeStyle={activeStyle}
      >
        로그인
      </NavLink>
      <NavLink
        className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
        to="/signup"
        activeStyle={activeStyle}
      >
        회원가입
      </NavLink>
      <NavLink
        className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
        to="/camera"
        activeStyle={activeStyle}
      >
        카메라
      </NavLink>
      <NavLink
        className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
        to="/result"
        activeStyle={activeStyle}
      >
        결과물
      </NavLink>
      <NavLink
        className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
        to="/3/gallery"
        activeStyle={activeStyle}
      >
        갤러리
      </NavLink>
      <NavLink
        className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
        to="/3/mypage"
        activeStyle={activeStyle}
      >
        마이 페이지
      </NavLink>
      <button //로그아웃 처리 해주어야함.
        className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
        to="/home"
        activeStyle={activeStyle}
      >
        로그아웃
      </button>
    </header>
  );
}

export default Header;
