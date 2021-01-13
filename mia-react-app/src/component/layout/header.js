import { useHistory, NavLink } from "react-router-dom";
import { useState } from "react";

function Header({ title, backFunc, params, noBackBtn }) {
  const activeStyle = {
    color: "white",
    fontWeight: "800",
  };

  //const [isLoginUser, setIsLoginUser] = useState(false); //로그인 여부를 알려줄겨 나중에 기능 구현 시작되면!

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
    </header>
  );
}

export default Header;
