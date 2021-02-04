import React, { useEffect, useState } from "react";
import { Loader } from "./Loader";
import { UnsplashImage } from "./UnsplashImage";

import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

// Style
const GlobalStyle = createGlobalStyle`
  *{
    margin : 4em;
    box-sizing: border-box;
    max-height: 300px;
    min-height: 300px;
  }
`;

const WrapperImages = styled.section`
  max-width: 60rem;
  max-height: 8rem;
  // min-width: 8rem;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 300px;
`;

function Gallery() {
  const [images, setImage] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = (count = 10) => {
    const apiRoot = "https://api.unsplash.com";
    const accessKey = process.env.REACT_APP_ACCESSKEY;

    axios
      .get(`${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`)
      .then((res) => {
        setImage([...images, ...res.data]);
      });
  };

  return (
    <div>
      <p>갤러리페이지</p>
      <GlobalStyle />
      <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore={true}
        loader={<Loader />}
      >
        <WrapperImages>
          {images.map((image) => (
            <UnsplashImage url={image.urls.thumb} key={image.id} />
          ))}
        </WrapperImages>
      </InfiniteScroll>
    </div>
  );
}

export default Gallery;

// export default Gallery;

// 연습1
// const photos = [
//   {
//     src: "./hogwart.png",
//     width: 4,
//     height: 3,
//   },
//   {
//     src: "./office.png",
//     width: 1,
//     height: 1,
//   },
// ];

// <Gallery photos={photos} />;

// export default Gallery;
