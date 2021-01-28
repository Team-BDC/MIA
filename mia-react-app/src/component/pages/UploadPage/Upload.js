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
        <img className="profile_preview upload_img" src={this.state.previewURL}></img>
      );
      profile_url = this.state.previewURL;
      img_name = this.state.img_name;
      //console.log(profile_url);
    }
    return (
      // <div>
      //   <input
      //     type="file"
      //     id="photoInput"
      //     accept="image/jpg, image/png,image/jpeg,image/gif"
      //     name="profile_img"
      //     onChange={(e) => this.handleFileOnChange(e)}
      //   />
      //   {profile_preview}
      //   <button type="button" onClick={this.handlePost()} />
      // </div>
      <div>

<div className="filebox flex justify-center justify-items-center mt-10 mb-2"> 
          <label for="file">select</label> 
          <input 
            type="file"
            id="file"
            accept="image/jpg, image/png,image/jpeg,image/gif"
            name="profile_img"
            onChange={(e) => this.handleFileOnChange(e)}/> 
          <input className="upload-name" value={img_name} />
        </div>

        <div className="flex justify-center max-h-96">
            {profile_preview}
        </div>
        <div className = "upload mt-3">
          <button
            className="rounded-full font w-56 h-16 m-4 px-4 bg-gray-900 text-white cursor-pointer hover:bg-gray-400 hover:text-white mt-0 text-3xl"
            onClick={() => {
              this.handlePost();
            }}
          >
          Upload
          </button>
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
