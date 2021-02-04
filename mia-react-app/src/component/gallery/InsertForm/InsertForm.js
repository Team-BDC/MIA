import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

// Style
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
  }
`;

const WrapperImages = styled.section`
  max-width: 60rem;
  margin: 4rem auto;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

function InsertForm({ logged }) {
  console.log("gallery", logged);
  const localStorageInfo = localStorage.getItem("userInfo");
  // 현재 로그인 한 사용자
  const parsedUserInfo = JSON.parse(localStorageInfo);
  console.log("name", parsedUserInfo.username);

  const [value, setState] = useState(1);
  const [result, setResult] = useState("");
  const [imageurls, setImageurls] = useState([]);
  const handleChange = (e) => {
    setState(e.target.value);
  };

  const current_name = parsedUserInfo.username;

  // api/v1/mia/image_list/에 url parameter로 현재 로그인한 사용자 username 넘겨준다
  axios
    .get("http://localhost:8000/api/v1/mia/image_list/" + current_name, {
      // username: "parsedUserInfo.username",
      username: "eunjji",
      password: "1234",
    })
    .then((res) => {
      console.log(res);
      // console.log(...imageurls.slice());
      if (res.data.results.length !== imageurls.length) {
        setImageurls([...imageurls, ...res.data.results]);
      }
    });

  return (
    <div>
      <center>
        <p>{parsedUserInfo.username}의 갤러리 입니다.</p>
      </center>
      <GlobalStyle />
      <WrapperImages>
        {logged ? (
          <>
            {imageurls.map((img) => {
              return (
                <img
                  src={`data:image/jpg;base64,` + img.image_path}
                  alt={img.image_name}
                />
              );
            })}
          </>
        ) : (
          <>
            <p>이미지없음</p>
          </>
        )}
      </WrapperImages>
    </div>
  );
}

export default InsertForm;
