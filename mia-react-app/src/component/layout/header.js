import { NavLink } from "react-router-dom";
import "./header.css";

const LOGON = [
  { title: "Gallery", to: "/gallery" },
  { title: "Camera", to: "/camera" },
  { title: "Result", to: "/result" },
];
const LOGOFF = [
  { title: "Login", to: "/auth/login" },
  { title: "Camera", to: "/camera" },
  { title: "Result", to: "/result" },
];

//현재 로컬스토리지에 저장되어 있는 걸로 판단!
//메인화면에 로고 넣고 그건 메인으로 연결되게!
const CustomNavLink = ({ title, to }) => {
  const activestyle = {
    color: "white",
    fontWeight: "800",
  };
  return (
    <NavLink
      className="font lg:inline-flex lg:w-auto px-3 py-4 mr-1 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
      activeStyle={activestyle}
      exact
      to={to}
    >
      {title}
    </NavLink>
  );
};

function Header({ noBackBtn, setUserTemp, onLogout, logged }) {
  console.log("this is Header", logged);
  const activestyle = {
    color: "white",
    fontWeight: "800",
  };
  // 현재 새로고침하면 로그인 유지 안되는데(userInfo 남아있는데 state가 없음)
  // 로그인하고 새로고침하거나 시간 좀 지나야 보임
  // 새로고침 했을 때 로그인이 유지되고 있는건지 아닌건지 확인한 후에 이 주석 지우기
  //1. 새로고침 시 로그인 유지
  //2. 로그아웃 햇을 때 userInfo날아가나 화깅ㄴ
  //3. 로그아웃 /로그인 시 헤더 내용 다르게

  return (
    <header className="mia_font flex items-center bg-gray-800 h-1/6 flex-wrap w-screen text-xl">
      <NavLink
        className="lg:inline-flex lg:w-auto w-1/6 lg:px-auto py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
        exact
        to="/"
        activeStyle={activestyle}
      >
      <p className="ml-12 mr-12 text-5xl">MIA</p>
      </NavLink>
      <div className="menu w-5/6">
        {logged ? (
          <>
          <div>
            {LOGON.map((content, idx) => (
             <CustomNavLink
                key={idx}
                title={content.title}
                to={content.to}
              ></CustomNavLink>
            ))}
            <button //로그아웃 처리 해주어야함.
              className="font lg:inline-flex lg:w-auto px-3 py-4 mr-1 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
              to="/home"
              activeStyle={activestyle}
              onClick={onLogout}
            >
              Logout
            </button>
            </div>
          </>
        ) : (
          <>
            {LOGOFF.map((content, idx) => (
              <CustomNavLink
               title={content.title}
                to={content.to}
                key={idx}
              ></CustomNavLink>
            ))}
          </>      
        )}
      </div>
    </header>
  );
}
export default Header;
