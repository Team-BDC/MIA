import BackButton from "../../shared/BackButton";
import SmallButton from "../../shared/SmallButton";
import GalleryButton from "../../shared/GalleryButton";
import SaveButton from "../../shared/SaveButton";
import { Link } from 'react-router-dom'

import classNames from "classnames/bind";
import React from "react";
import Item from "./result";
import style from "./result.css";

import axios from "axios";

const cx = classNames.bind(style);
let profile_url = null;
let img_name = null;

let go; //로그인 안되어있으면 갤러리에 추가 눌렀을 때 갈 장소!

function Result(props) {

  const localStorageInfo = localStorage.getItem("userInfo");
  // 현재 로그인 한 사용자
  let current_name;
  let parsedUserInfo;
  
  if(localStorageInfo){
    parsedUserInfo = JSON.parse(localStorageInfo);
    current_name = parsedUserInfo.username;
    //go="/gallery"; 
    go="/test";
  }else{
    parsedUserInfo = null;
    current_name = null;
    go = "/auth/login";
  }

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
      {/* <p className={cx("Title")}>결과페이지</p> */}
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
          <SaveButton buttonName="저장"></SaveButton>
        </a>

        <Link to = {go}> 
          <GalleryButton
            onClick={() => {
              handlePOST();
            }}
            buttonName="갤러리"
          > 
          </GalleryButton>
        </Link>

        <BackButton buttonName="뒤로가기"></BackButton>

      </div>
    </div>
  );
}

export default Result;
