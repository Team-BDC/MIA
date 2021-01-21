import React, { Component } from "react";
import { connect } from "react-redux";
import InsertForm from "../component/gallery/InsertForm/InsertForm";

import * as galleryActions from "../store/modules/gallery";

export class GalleryContainer extends Component {
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
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  galleryInput: state.gallery.galleryInput,
  gallery: state.gallery.gallery,
});

const mapDispatchToProps = (dispatch) => {
  return {
    changeNoteInput: ({ value }) => {
      dispatch(galleryActions.changeGalleryInput({ value }));
    },
    addGallery: () => {
      dispatch(galleryActions.addGallery());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryContainer);
