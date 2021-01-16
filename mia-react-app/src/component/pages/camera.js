import React, { useRef, Component, useState } from "react";
import SmallButton from "../shared/SmallButton";
import Webcam from "react-webcam";

function Camera() {
  const videoConstraints = {
    width: 800,
    height: 600,
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
        <Webcam
          audio={false}
          height={600}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={800}
          videoConstraints={videoConstraints}
        />
        <SmallButton onClick={capture}>화면 캡처</SmallButton>
        {imgSrc && <img src={imgSrc} />}
      </>
    );
  };

  return (
    <>
      <WebcamCapture />
    </>
  );
}

export default Camera;
