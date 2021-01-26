import BackButton from "../../shared/BackButton";
import SmallButton from "../../shared/SmallButton";
import classNames from "classnames/bind";
import React from "react";
import Item from "./result";
import style from "./result.css";

import axios from "axios";

const cx = classNames.bind(style);
let profile_url = null;
let img_name = null;

function Result(props) {
  const localStorageInfo = localStorage.getItem("userInfo");
  // 현재 로그인 한 사용자
  const parsedUserInfo = JSON.parse(localStorageInfo);
  const current_name = parsedUserInfo.username;

  console.log("url", props.location.state.img);
  console.log("name", props.location.state.name);

  profile_url = props.location.state.img;
  img_name = props.location.state.name;

  function handlePOST() {
    let data = {
      profile_url: profile_url,
      img_name: img_name,
    };
    // 이미지 갤러리로 보내기~~

    axios
      .post(
        `http://localhost:8000/api/v1/mia/add_image/` + current_name,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": `application/json`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        // this.setState({ ...this.state, result: res.data });
        alert("success");
      })
      .catch((err) => {
        console.log(err);
        alert("fail");
      });
  }

  return (
    <div>
      <p className={cx("Title")}>결과페이지</p>
      <div className={cx("App")}>
        <Item>
          <img
            src={`data:image/jpg;base64,${props.location.state.img}`}
            alt="none"
          />
        </Item>
      </div>
      <div className={cx("Button")}>
        <a
          href={`data:image/jpg;base64,${props.location.state.img}`}
          download="test.jpg"
        >
          <SmallButton buttonName="저장"> 저장하기</SmallButton>
        </a>

        <SmallButton
          onClick={() => {
            handlePOST();
          }}
          buttonName="갤러리"
        >
          갤러리에 추가하기
        </SmallButton>
        <BackButton
          onClick={(e) => {
            e.preventDefault();
            window.alert("뒤로가기");
          }}
          buttonName="뒤로가기"
        >
          뒤로가기
        </BackButton>
      </div>
    </div>
  );
}

export default Result;
