import React, { useRef, Component, useState } from "react";
import SmallButton from "../../shared/SmallButton";
import Webcam from "react-webcam";
import { Redirect } from "react-router-dom";
import axios from "axios";

import Template from "../../shared/template";
import { Link } from "react-router-dom";

import classNames from "classnames/bind";
import style from "./camera.css";

let img_url;
let img_name;
const cx = classNames.bind(style);

class Probcreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img_url: "",
      img_name: "download.jpeg",
      uploadSuccess: false,
      result: "",
    };
  }
}
// export default Probcreate;
let prop = new Probcreate();
const title = "사진 찍기";
function Camera(props) {
  const videoConstraints = {
    width: 400,
    height: 300,
    margin: 0,
    facingMode: "user",
  };

  const WebcamCapture = () => {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    const [isVideo, setVideo] = useState(true);
    const [values, setValues] = useState({ uploadSuccess: false, result: "" });
    // const [uploadSuccess, setUploadSuccess] = useState(false);
    // const [result, setResult] = useState("");

    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
      setVideo(false);
      img_url = imgSrc;
      prop.state.img_url = imgSrc;
    }, [webcamRef, setImgSrc]);

    function handlePost() {
      let data = {
        profile_url: imgSrc, //url
        img_name: `userImg.jpg`, //파일 이름
      };
      axios
        .post(`http://localhost:8000/api/v1/mia/model/`, JSON.stringify(data), {
          //api 이 형태로 만들어서 보냄
          headers: {
            "Content-Type": `application/json`,
          },
        })
        .then((res) => {
          setValues({
            ...values,
            uploadSuccess: true,
            result: res.data,
          });

          console.log("result:", values);
          alert("success");
        })
        .catch((err) => {
          console.log(err);
          alert("fail");
        });
    }

    return (
      <Template title={title}>

        <div>
        
        <div className={cx("Content"), "flex justify-center"}>
          {isVideo && (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="w-3/5 h-auto"
            />
          )}
        
          {imgSrc && !isVideo && (
            <img src={imgSrc} className="w-3/5 h-auto" id="capture" />
          )}
      </div>
  
          <div className="flex items-center justify-center mt-4 mx-2 space-x-2">
            {isVideo ? (
              <SmallButton onClick={capture}>사진찍기</SmallButton>
            ) : (
              <SmallButton onClick={() => setVideo(true)}>다시하기</SmallButton>
            )}
            <a href={imgSrc} download>
              <SmallButton>다운로드</SmallButton>
            </a>
            <SmallButton
              onClick={(e) => {
                e.preventDefault();
                handlePost();
              }}
            >
              업로드
            </SmallButton>
      
          </div>

        </div>

        {/* post는 success 뜨긴 하던데 여기 부터 안되여 ㅠ ㅠ흑흑 */}
        {values.uploadSuccess && (
          <Redirect
            to={{
              pathname: "/result",
              state: { img: values.result, name: img_name },
            }}
          ></Redirect>
          //결과 페이지에 props로 넘겨주고 싶은거 있으면
          //state : {...} 안에 key:props 형태로 넘겨주면 result페이지에서 props.location.state."지정한 키"형태로 호출할 수 있습니다!
        )}
      </Template>
    );
  };
  return (
    <>
      {/* <p className={cx("Title mt-6 mb-0")}>Camera</p> */}
      <WebcamCapture />
    </>
  );
}

export default Camera;