import MainLayout from "../layout/MainLayout";
import { Route, Switch } from "react-router-dom";
import Camera from "./CameraPage/camera";
import Gallery from "./galleryPage/gallery.js";
import Main from "./main";
import Result from "./resultPage/resultPage";
import Signin from "./signin";
import Signup from "./signup";
import Mypage from "./mypage";
// import Find from "./find";

const RoutePage = () => {
  const userId = 3;
  return (
    <MainLayout header={{ noBackBtn: true }}>
      <Switch>
        <Route exact path={["/home", "/"]} component={Main} />
        {/* <Route exact path={"/find"} component={Find} /> */}
        <Route exact path={"/signup"} component={Signup} />
        <Route exact path={"/signin"} component={Signin} />
        <Route exact path={"/camera"} component={Camera} />
        <Route exact path={"/result"} component={Result} />
        <Route exact path={`/${userId}/gallery`} component={Gallery} />
        <Route exact path={`/${userId}/mypage`} component={Mypage} />
      </Switch>
    </MainLayout>
  );
};

export default RoutePage;
