// import { useEffect } from "react";
// import Header from "./header";
import Footer from "./footer";
import Navigation from "./navigation";
import HeaderContainer from "../../containers/HeaderContainer";
// import Navbar from './Navbar'
import Navbar from "./nav";

import { ToastContainer, toast } from 'material-react-toastify';

const MainLayout = (props) => {
  return (
    <div className="w-screen h-screen bg-white">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* <Header /> */}
      <div className="flex justify-end h-1/6">
        <Navbar {...props} />
        {/* <HeaderContainer />  */}
      </div>
      {/* 
      <div className= "flex h-1/6">
        <HeaderContainer className="h-1/2"/> 
      </div> */}

      <main className="flex justify-center md:-flex w-screen h-4/6">
        {/*  <Navigation />*/}
        <section className="justify-center items-center w-5/6">
          <div className="justify-center items-center w-auto h-full text-md">
            {" "}
            {props.children}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
