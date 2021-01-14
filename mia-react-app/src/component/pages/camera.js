import React, { useRef, Component } from "react";
import Webcam from "react-webcam";

function Camera() {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const WebcamCapture = () => {
    const webcamRef = React.useRef(null);

    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
    }, [webcamRef]);
  };

  return (
    <>
      <Webcam
        audio={false}
        height={720}
        ref={WebcamCapture.webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      {/* 캡처 기능 추가하기 */}
      {/* <button onClick={WebcamCapture.capture}>Capture photo</button> */}
    </>
  );
}

export default Camera;
