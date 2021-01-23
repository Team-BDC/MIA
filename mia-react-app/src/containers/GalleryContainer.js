import React, { Component } from "react";
import { connect } from "react-redux";
import InsertForm from "../component/gallery/InsertForm/InsertForm";
import * as authActions from "../store/modules/auth";

import * as galleryActions from "../store/modules/gallery";

export class GalleryContainer extends Component {
  componentDidMount() {
    const localStorageInfo = localStorage.getItem("userInfo");

    if (localStorageInfo) {
      const parsedUserInfo = JSON.parse(localStorageInfo);
      this.props.setUserTemp({
        id: parsedUserInfo.id,
        username: parsedUserInfo.username,
        token: parsedUserInfo.token,
      });
    }
  }

  handleChange = ({ value }) => {
    const { changeGalleryInput } = this.props;
    changeGalleryInput({ value });
  };

  addGallery = () => {
    const { addGallery } = this.props;
    addGallery();
  };

  render() {
    const { galleryInput } = this.props;
    const { handleChange, addGallery } = this;
    return (
      <div>
        <InsertForm
          galleryInput={galleryInput}
          onChangeInput={handleChange}
          onAdd={addGallery}
          logged={this.props.logged}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    logged: state.auth.logged,
    userInfo: state.auth.userInfo,
    galleryInput: state.gallery.galleryInput,
    gallery: state.gallery.gallery,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeNoteInput: ({ value }) => {
      dispatch(galleryActions.changeGalleryInput({ value }));
    },
    addGallery: () => {
      dispatch(galleryActions.addGallery());
    },
    setUserTemp: ({ id, username, token }) => {
      dispatch(authActions.setUserTemp({ id, username, token }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryContainer);
