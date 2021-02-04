import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./test.css";

import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

// import Pagination from "rc-pagination";
// import "rc-pagination/assets/index.css";

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
  max-width: 70rem;
  margin: 4rem auto;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
`;

function Test() {
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(6);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    getData();
  }, [offset]);

  const localStorageInfo = localStorage.getItem("userInfo");
  const parsedUserInfo = JSON.parse(localStorageInfo);
  const current_name = parsedUserInfo.username;

  const getData = async () => {
    const res = await axios.get(
      "http://localhost:8000/api/v1/mia/image_list/" + current_name
    );
    console.log("res", res);
    const data = res.data.results;
    console.log("data", data);
    // 한페이지에 6개씩 나옴
    // 받아온 이미지들을 0-6까지 자른다
    const img_slice = data.slice(offset, offset + perPage);
    // 자른 이미지 출력
    const postData = img_slice.map((img) => (
      <img
        src={`data:image/jpg;base64,` + img.image_path}
        alt={img.image_name}
      />
    ));
    setData(postData);
    console.log("length", data.length);
    setPageCount(Math.ceil(data.length / perPage));
  };

  // 페이지 옮길 때 offset 재설정
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = Math.ceil(selectedPage * perPage);
    setOffset(offset);
  };

  return (

    <div className="w-full h-full bg-yellow-300 flex flex-col justify-center items-center">

      <div className="h-12 w-full relative top-0 left-0 text-center">
      {/* <center className="flex justify-center m-3">  */}
        <p className="light_font text-xl justify-center items-center">{parsedUserInfo.username}의 갤러리 입니다.</p>
      {/* </center> */}
      </div>

      <div className="flex justify-center h-4/6 w-full"> 
        <GlobalStyle />
        <WrapperImages>{data}</WrapperImages>
      </div>
      

      <div className="h-8 w-full bg-yellow-300">
      <ReactPaginate
        previousLabel={"prev"}
        previousClassName="light_font h-full text-yellow-300 hover:text-white"
        nextLabel={"next"}
        nextClassName="light_font text-yellow-300 hover:text-white"
        breakLabel={"..."}
        // 총 페이지 개수
        pageCount={pageCount}
        pageClassName="light_font text-yellow-300 hover:text-white"
        // 여백 페이지 개수
        marginPagesDisplayed={1}
        // 페이지 범위
        pageRangeDisplayed={6}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
        className="bg-yellow-300"
      /></div>
  

    </div>

    
  );
}

export default Test;
