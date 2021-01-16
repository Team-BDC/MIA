import BackButton from "../../shared/BackButton";
import SmallButton from "../../shared/SmallButton";
import classNames from "classnames/bind";

import React from "react";
import Item from "./result";
import style from "./result.css";

const cx = classNames.bind(style);

function Result() {
  return (
    <>
      <p className={cx("Title")}>결과페이지</p>
      <div className={cx("App")}>
        <Item>Before</Item>
        <Item>After</Item>
      </div>
      <div className={cx("Button")}>
        <SmallButton
          onClick={(e) => {
            e.preventDefault();
            window.alert("저장");
          }}
          buttonName="저장"
        >
          저장하기
        </SmallButton>
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
