import React, { Component } from 'react'
import axios from 'axios';

class Upload extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedFile: null,
      previewURL : ''
    }
  }

  handleFileInput(e){
    this.setState({
      selectedFile : e.target.files[0],
    })
  }

  handlePost(){
    const formData = new FormData();
    formData.append('file', this.state.selectedFile);

    return axios.post("http://localhost:3000/${userId}/gallery", formData).then(res => {
      alert('성공')
    }).catch(err => {
      alert('실패')
    })
  }
handleFileOnChange = (event) => {
  event.preventDefault();
  let reader = new FileReader();
  let file = event.target.files[0];
  reader.onload = () => {
    this.setState({
      file : file,
      previewURL : reader.result
    });
  };
  reader.readAsDataURL(file);
};
  render() {
    let profile_preview = null;
    if (this.state.file!== '') {
      profile_preview =< img className='profile_preview' src= {this.state.previewURL}></img>
    }
    return (
      <div>
        <input type="file" 
        id = 'photoInput'
        accept="image/jpg, image/png,image/jpeg,image/gif"
        name="profile_img" onChange={e => this.handleFileOnChange(e)}/>
        {profile_preview}
        <button type="button" onClick={this.handlePost()}/> 
      </div>
    )
  }
}

export default Upload