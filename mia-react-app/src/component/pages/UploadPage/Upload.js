import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./Upload.css";

let profile_url = null; //-> axios로 json 형태로 보내기 !~ -> views.py로 ~ -> 사진 url
let img_name = null; //-> axios로 json 형태로 보내기 !~ -> views.py로 ~ -> 파일 저장할 때 사용

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      previewURL: "",
      img_name: "",
      uploadSuccess: false,
    };
  }

  handleFileInput(e) {
    this.setState({
      selectedFile: e.target.files[0],
    });
  }

  handlePost() {
    let data = {
      profile_url: profile_url, //url
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
        this.setState({ ...this.state, uploadSuccess: true, result: res.data });
      })
      .catch((err) => {
        console.log(err);
        alert("fail");
      });
  }

  handleFileOnChange = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onload = () => {
      this.setState({
        file: file,
        previewURL: reader.result,
        img_name: file.name,
        uploadSuccess: false,
        result: "",
      });
    };
    console.log(this.state);
    reader.readAsDataURL(file);
  };

  render() {
    let profile_preview = null;
    if (this.state.file !== "") {
      profile_preview = (
        <img
          className="profile_preview upload_img"
          src={this.state.previewURL}
        ></img>
      );
      profile_url = this.state.previewURL;
      img_name = this.state.img_name;
      //console.log(profile_url);
    }
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="filebox flex flex-col justify-center items-center w-full h-full justify-items-center">
          <div className="w-2/5 h-2/3 flex justify-center items-center flex-col bg-white border-20  border-white	 rounded-large mb-5">
            {this.state.previewURL ? (
              <img src={this.state.previewURL} alt="error"></img>
            ) : (
              <>
                <img
                  className="w-1/4 h-auto"
                  src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FOB4lX%2FbtqVqFUMrz5%2Fe0ENv6GOAXmbLDORHWciu1%2Fimg.png"
                  alt="oops"
                />
                <p className="font-NEXEN font-grey text-3xl mt-4 text-gray-500">
                  NO
                  <br /> IMAGE
                </p>
              </>
            )}
          </div>
          <div className="flex flex-row justify-center items-center">
            <input
              className="upload-name font-G h-4"
              value={img_name || "이미지를 선택하세요"}
            />
            {!this.state.previewURL ? (
              <>
                <label htmlFor="file" className="font-G text-yellow-300">
                  선택
                </label>
                <input
                  type="file"
                  id="file"
                  accept="image/jpg, image/png,image/jpeg,image/gif"
                  name="profile_img"
                  onChange={(e) => this.handleFileOnChange(e)}
                />
              </>
            ) : (
              <button
                className="font-G text-yellow-300 uploadButton"
                onClick={() => {
                  this.handlePost();
                }}
              >
                업로드
              </button>
            )}
          </div>
        </div>

        {this.state.uploadSuccess && (
          <Redirect
            to={{
              pathname: "/result",
              state: { img: this.state.result, name: this.state.img_name },
            }}
          ></Redirect>
          //결과 페이지에 props로 넘겨주고 싶은거 있으면
          //state : {...} 안에 key:props 형태로 넘겨주면 result페이지에서 props.location.state."지정한 키"형태로 호출할 수 있습니다!
        )}
      </div>
    );
  }
}

export default Upload;
