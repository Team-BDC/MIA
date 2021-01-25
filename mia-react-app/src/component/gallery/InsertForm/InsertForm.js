import React, { useState } from "react";
import axios from "axios";
import * as authActions from "../../../store/modules/auth";
// import styles from "./InsertForm.css";
// import classNames from "classnames/bind";

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

  const current_name = parsedUserInfo.username;

  // api/v1/mia/image_list/에 url parameter로 현재 로그인한 사용자 username 넘겨준다
  axios
    .get("http://localhost:8000/api/v1/mia/image_list/" + current_name, {
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
