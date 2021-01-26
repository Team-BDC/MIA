import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./test.css";
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
    const img_slice = data.slice(offset, offset + perPage);
    const postData = img_slice.map((img) => (
      <img
        src={`data:image/jpg;base64,` + img.image_path}
        alt={img.image_name}
      />
    ));
    setData(postData);
    setPageCount(Math.ceil(data.length / perPage));
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
  };

  return (
    <div>
      {data}
      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default Test;
