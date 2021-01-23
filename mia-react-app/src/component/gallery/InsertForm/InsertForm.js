import React, { useState } from "react";
import axios from "axios";
// import styles from "./InsertForm.css";
// import classNames from "classnames/bind";

// const cx = classNames.bind(styles);

const InsertForm = () => {
  const [value, setState] = useState(1);
  const [result, setResult] = useState("");
  const [imageurls, setImageurls] = useState([]);
  const handleChange = (e) => {
    setState(e.target.value);
  };
  /*   axios
  .post("http://localhost:8000/jwt/token/", {
    username: "admin",
    password: "admin",
  })
  .then((res) => {
    console.log("토큰와따 : ", res.data.token);         .catch((err) => console.log(err));*/
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log("엔터입력");

      axios
        .get("http://localhost:8000/api/v1/mia/image_list/1", {
          username: "harry",
          password: "1234",
        })
        .then((res) => {
          console.log(...imageurls.slice());
          if (res.data.results.length !== imageurls.length) {
            setImageurls([...imageurls, ...res.data.results]);
          }
          // console.log("이미지 반환:", imageurls);
          // console.log(res);
        });

      //onAdd();
    }
  };

  return (
    <div>
      <div>Insert Your Gallery Here...</div>
      <input
        type="text"
        name="gallery"
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />

      {imageurls.map((img, idx) => {
        return (
          <div>
            <div>{idx}</div>
            <img src={img.image_path} alt={img.image_name} />
          </div>
        );
      })}
    </div>
  );
};

export default InsertForm;
