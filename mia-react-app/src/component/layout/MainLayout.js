// import { useEffect } from "react";
// import Header from "./header";
import Footer from "./footer";
import Navigation from "./navigation";
import HeaderContainer from "../../containers/HeaderContainer";

const MainLayout = ({ children }) => {
  return (
    <div className="h-screen">
      {/* <Header /> */}
      <HeaderContainer/>
      <main className="flex md:inline-flex w-screen h-4/5">
      {/*  <Navigation />*/}
        <section className="w-screen">
          <div className="w-screen text-md"> {children}</div>
        </section>
      </main>
      <Footer/>
    </div>
  );
};

export default MainLayout;
