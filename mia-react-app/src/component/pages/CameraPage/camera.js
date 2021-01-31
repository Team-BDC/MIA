import React, { useRef, Component, useState } from "react";
import SmallButton from "../../shared/SmallButton";
import Webcam from "react-webcam";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom'

import classNames from "classnames/bind";
import style from "./camera.css";

let img_url = null; 
let img_name = "download.jpeg";
let uploadSuccess = false;
let result = null;

const cx = classNames.bind(style);
  
class Probcreate extends Component{
  constructor(props) {
    super(props);
    this.state = {
      img_url: "",
      img_name: "download.jpeg",
      uploadSuccess: false,
      result:"",
    };
  }
}
// export default Probcreate;
let prop = new Probcreate();
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
      img_url = imgSrc; 
      prop.state.img_url = imgSrc;
    }, [webcamRef, setImgSrc]);
    
  function handlePost(){
    let data = {
      profile_url: imgSrc, //url
      img_name: img_name, //파일 이름
    };
     axios
       .post(`http://localhost:8000/api/v1/mia/model/`, JSON.stringify(data), {
         //api 이 형태로 만들어서 보냄
         headers: {
           "Content-Type": `application/json`,
         },
       })
      .then((res) => {
         console.log(res);
        // this.setState({ ...this.state, uploadSuccess: true, result: res.data });

        uploadSuccess = true;
        prop.state.uploadSuccess = true;
        alert("success");
        result = res.data;
        prop.state.result = res.data;

       })
       .catch((err) => {
         console.log(err);
         alert("fail");
       });
  }
 
    return (
      <>
        <div className={cx("Content")}>
          <Webcam
            audio={false}
            height={300}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={300}
            videoConstraints={videoConstraints}
          />

          {imgSrc && <img src={imgSrc} id="capture" />}
        </div>
        <div className={cx("Button")}>
          <SmallButton onClick={capture}>Capture</SmallButton>
          <a href={imgSrc} download>
            <SmallButton>Download</SmallButton>
          </a>

         <Link to = "/upload" >  
            <SmallButton 
              onClick={() => {
            //    handlePost();
              }}
              >
              Upload
            </SmallButton>
        </Link> 

        </div>
        
        {/* post는 success 뜨긴 하던데 여기 부터 안되여 ㅠ ㅠ흑흑 */}
        {/* {prop.state.uploadSuccess && (
          <Redirect
            to={{
              pathname: "/result",
              state: { img: prop.state.result, name: prop.state.img_name },
            }}
          ></Redirect>
          //결과 페이지에 props로 넘겨주고 싶은거 있으면
          //state : {...} 안에 key:props 형태로 넘겨주면 result페이지에서 props.location.state."지정한 키"형태로 호출할 수 있습니다!
        )} */}

      </>
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
