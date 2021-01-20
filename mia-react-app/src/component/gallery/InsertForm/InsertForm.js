import React from "react";
// import styles from "./InsertForm.css";
// import classNames from "classnames/bind";

// const cx = classNames.bind(styles);

const InsertForm = ({ galleryInput, onChangeInput, onAdd }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    onChangeInput({ value });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onAdd();
    }
  };

  return (
    <div>
      <div>Insert Your Gallery Here...</div>
      <input
        type="text"
        name="gallery"
        value={galleryInput}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default InsertForm;
