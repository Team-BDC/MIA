import { NavLink } from "react-router-dom";

const LOGON = [
  { title: "Gallery", to: "/3/gallery" },
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
/*<header className="flex items-center bg-gray-800 p-3 flex-wrap w-screen">
        <NavLink
          className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
          exact
          to="/"
          activeStyle={activeStyle}
        >
          메인화면
        </NavLink>
        {LOGON.map((content, idx) => (
          <CustomNavLink
            key={idx}
            title={content.title}
            to={content.to}
          ></CustomNavLink>
        ))}
        {/* 결과페이지는 나중에 nav에서 지우고, 카메라/파일업로드에서 자동으로 연결되도록 수정할 것 */

/* <button //로그아웃 처리 해주어야함.
          className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
          to="/home"
          activeStyle={activeStyle}
          onClick={onLogout}
        >
          로그아웃
        </button>
      </header>
    );
  } else {
    // 로그인 안되어있음
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
        {LOGOFF.map((content, idx) => (
          <>
            <CustomNavLink
              title={content.title}
              to={content.to}
              key={idx}
            ></CustomNavLink>
          </>
        ))}
      </header>
    );
  }*/

// 로그인 여부에 따라 밑에 달라질 것
//(로그인 x : 메인화면, 로그인, 회원가입, 카메라, 결과물)
//(로그인 o : 메인화면, 카메라, 결과물, 갤러리, 마이페이지, 로그아웃)
// return (
//   <header className="flex items-center bg-gray-800 p-3 flex-wrap w-screen">
//     <NavLink
//       className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
//       exact
//       to="/"
//       activeStyle={activeStyle}
//     >
//       메인화면
//     </NavLink>

//     <NavLink //로그인 페이지에서 연결 시켜야함
//       className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
//       to="/find"
//       activeStyle={activeStyle}
//     >
//       아이디/비번 찾기
//     </NavLink>

//     <NavLink
//       className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
//       to="/auth/login"
//       activeStyle={activeStyle}
//     >
//       로그인/회원가입
//     </NavLink>

//     <NavLink
//       className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
//       to="/camera"
//       activeStyle={activeStyle}
//     >
//       카메라
//     </NavLink>
//     {/* 결과페이지는 나중에 nav에서 지우고, 카메라/파일업로드에서 자동으로 연결되도록 수정할 것 */}
//     <NavLink
//       className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
//       to="/result"
//       activeStyle={activeStyle}
//     >
//       결과물
//     </NavLink>
//     <NavLink
//       className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
//       to="/3/gallery"
//       activeStyle={activeStyle}
//     >
//       갤러리
//     </NavLink>
//     <NavLink
//       className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
//       to="/3/mypage"
//       activeStyle={activeStyle}
//     >
//       마이 페이지
//     </NavLink>
//     <button //로그아웃 처리 해주어야함.
//       className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
//       to="/home"
//       activeStyle={activeStyle}
//       onClick={onLogout}
//     >
//       로그아웃
//     </button>
//     {/* api 통신 테스트 */}
//     <NavLink
//       className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
//       to="/test"
//       activeStyle={activeStyle}
//     >
//       테스트
//     </NavLink>
//   </header>
// );
