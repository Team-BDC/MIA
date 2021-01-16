import React, { useRef, Component, useState } from "react";
import SmallButton from "../../shared/SmallButton";
import Webcam from "react-webcam";

import classNames from "classnames/bind";
import style from "./camera.css";

const cx = classNames.bind(style);

function Camera() {
  const videoConstraints = {
    width: 400,
    height: 300,
    margin: 0,
    facingMode: "user",
  };

  const WebcamCapture = () => {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);

    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);

    return (
      <>
        <div className={cx("Content")}>
          <Webcam
            audio={false}
            height={300}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={400}
            videoConstraints={videoConstraints}
          />
          <br></br>
          {imgSrc && <img src={imgSrc} id="capture" />}
        </div>
        <div className={cx("Button")}>
          <SmallButton onClick={capture}>화면 캡처</SmallButton>
          <a href={imgSrc} download>
            <SmallButton>다운로드</SmallButton>
          </a>
        </div>
      </>
    );
  };

  return (
    <>
      <p className={cx("Title")}>카메라페이지</p>
      <WebcamCapture />
    </>
  );
}

export default Camera;
