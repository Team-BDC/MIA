import React, { useEffect, useState } from "react";
// import Nothing from "../../others/nothing";
import PhotoGallery from "react-photo-gallery";
import { Loader } from "./Loader";
import { UnsplashImage } from "./UnsplashImage";

// import { connect } from "react-redux";
// import ImageTheatre from "../../others/imageTheatre/imageTheatre";

import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
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
  max-width: 70rem;
  margin: 4rem auto;
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
