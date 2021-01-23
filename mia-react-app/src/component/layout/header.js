import { NavLink } from "react-router-dom";

const LOGON = [
  { title: "Gallery", to: "/gallery" },
  { title: "Camera", to: "/camera" },
  { title: "결과물", to: "/result" },
];
const LOGOFF = [
  { title: "ID/PW", to: "/find" },
  { title: "로그인/회원가입", to: "/auth/login" },
  { title: "카메라", to: "/camera" },
  { title: "결과물", to: "/result" },
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
      className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
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
    <header className="flex items-center bg-gray-800 p-3 flex-wrap w-screen">
      <NavLink
        className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
        exact
        to="/"
        activeStyle={activestyle}
      >
        메인화면
      </NavLink>
      {logged ? (
        <>
          {LOGON.map((content, idx) => (
            <CustomNavLink
              key={idx}
              title={content.title}
              to={content.to}
            ></CustomNavLink>
          ))}
          <button //로그아웃 처리 해주어야함.
            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
            to="/home"
            activeStyle={activestyle}
            onClick={onLogout}
          >
            로그아웃
          </button>
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
    </header>
  );
}
export default Header;
