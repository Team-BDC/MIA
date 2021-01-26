import BackButton from "../../shared/BackButton";
import SmallButton from "../../shared/SmallButton";
import classNames from "classnames/bind";
import React from "react";
import Item from "./result";
import style from "./result.css";

const cx = classNames.bind(style);

function Result(props) {
  return (
    <>
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
          onClick={(e) => {
            e.preventDefault();
            window.alert("갤러리");
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
    </>
  );
}

export default Result;
