import React, { useState } from "react";
import axios from "axios";
import * as authActions from "../../../store/modules/auth";
// import styles from "./InsertForm.css";
// import classNames from "classnames/bind";

// const cx = classNames.bind(styles);
// 8 ~ 67
// const InsertForm = ({ logged }) => {
//   console.log("gallery", logged);
//   const [value, setState] = useState(1);
//   const [result, setResult] = useState("");
//   const [imageurls, setImageurls] = useState([]);
//   const handleChange = (e) => {
//     setState(e.target.value);
//   };
//   /*   axios
//   .post("http://localhost:8000/jwt/token/", {
//     username: "admin",
//     password: "admin",
//   })
//   .then((res) => {
//     console.log("토큰와따 : ", res.data.token);         .catch((err) => console.log(err));*/
//   // const handleKeyPress = (e) => {
//   // if (e.key === "Enter") {
//   //   console.log("엔터입력");

//   axios
//     .get("http://localhost:8000/api/v1/mia/image_list/1", {
//       username: "harry",
//       password: "1234",
//     })
//     .then((res) => {
//       console.log(...imageurls.slice());
//       if (res.data.results.length !== imageurls.length) {
//         setImageurls([...imageurls, ...res.data.results]);
//       }
//       // console.log("이미지 반환:", imageurls);
//       // console.log(res);
//     });

//   //onAdd();
//   // }
//   // };

//   return (
//     <div>
//       {/* <div>Insert Your Gallery Here...</div> */}
//       {/* <input
//         type="text"
//         name="gallery"
//         value={value}
//         onChange={handleChange}
//         onKeyPress={handleKeyPress}
//       /> */}

//       {imageurls.map((img, idx) => {
//         return (
//           <div>
//             <img src={img.image_path} alt={img.image_name} />
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default InsertForm;

function InsertForm({ logged }) {
  console.log("gallery", logged);
  const localStorageInfo = localStorage.getItem("userInfo");
  // 현재 로그인 한 사용자
  const parsedUserInfo = JSON.parse(localStorageInfo);
  console.log("name", parsedUserInfo.username);

  const [value, setState] = useState(1);
  const [result, setResult] = useState("");
  const [imageurls, setImageurls] = useState([]);
  const handleChange = (e) => {
    setState(e.target.value);
  };

  // "http://localhost:8000/api/v1/mia/image_list/1"
  // api에서 모든 gallery 객체 가져온 후,
  // api에서 username과 일치하는 값을 fk로 가지는 gallery를 filter로 분류 후 리턴

  axios
    .get("http://localhost:8000/api/v1/mia/image_list/harry", {
      username: parsedUserInfo.username,
      password: "1234",
    })
    .then((res) => {
      console.log(...imageurls.slice());
      if (res.data.results.length !== imageurls.length) {
        setImageurls([...imageurls, ...res.data.results]);
      }
    });

  return (
    // logged 말고, axios로 받아온 배열에 데이터 있는지 확인해서 삼항연산자
    <div>
      <p>{parsedUserInfo.username}의 갤러리 입니다.</p>
      {logged ? (
        <>
          {imageurls.map((img, idx) => {
            return (
              <div>
                <img src={img.image_path} alt={img.image_name} />
              </div>
            );
          })}
        </>
      ) : (
        <>
          <p>이미지없음</p>
        </>
      )}
    </div>
  );
}

export default InsertForm;
