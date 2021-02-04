import SmallButton from "../../shared/SmallButton";
import GalleryButton from "../../shared/r_Button";
import SaveButton from "../../shared/r_Button";
import { Link } from "react-router-dom";
import { toast } from "material-react-toastify";
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

  if (localStorageInfo) {
    parsedUserInfo = JSON.parse(localStorageInfo);
    current_name = parsedUserInfo.username;
    //go="/gallery";
    go = "/test";
  } else {
    parsedUserInfo = null;
    current_name = null;
    go = "/auth/login";
  }

  console.log(props);

  function handlePOST() {
    let data = {
      profile_url: props.location.state.img,
      img_name: props.location.state.name
        ? props.location.state.name
        : "userImg.jpeg",
    };
    // 이미지 갤러리로 보내기~~
    console.log("너 이름이 모니?:", data);
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

        toast.success("✔ 저장 성공! ", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("❕❕ 저장 실패", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  }

  return (
    <div className="bg-yellow-300 h-full p-4 outer flex items-center justify-center flex-col">
      {/* <p className={cx("Title")}>결과페이지</p> */}
      {/* <div className="self-center"> */}
      <div className={(cx("App"), "mb-3")}>
        <Item>
          <div className="bg-white h-4/6 border-white App p-4 rounded-2xl mb-4 mt-2 rounded-large">
            {/* <div className> */}
            <img
              className="h-full m-0 "
              src={`data:image/jpg;base64,${props.location.state.img}`}
              alt="none"
            />
            {/* </div> */}
          </div>
        </Item>
      </div>

      <div className={(cx("Button"), "flex justify-center space-x-14 m-0")}>
        <a
          href={`data:image/jpg;base64,${props.location.state.img}`}
          download="test.jpg"
        >
          <SaveButton buttonName="저장">사진 저장</SaveButton>
        </a>

        <Link to={go}>
          <GalleryButton
            onClick={() => {
              handlePOST();
            }}
            buttonName="갤러리"
          >
            갤러리에 추가
          </GalleryButton>
        </Link>
      </div>

      <div className="flex justify-center mt-5 space-x-4">
        <p className="flex font text-gray-500 text-lg">
          {" "}
          다시 한 번 해보고 싶다면?{" "}
        </p>
        <Link to="/upload">
          <p className="flex font text-xl">다시하기</p>{" "}
        </Link>
        {/* <BackButton buttonName="뒤로가기"></BackButton> */}
      </div>
    </div>
  );
}

export default Result;
