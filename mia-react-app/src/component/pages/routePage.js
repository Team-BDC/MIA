import MainLayout from "../layout/MainLayout";
import { Route, Switch } from "react-router-dom";
import Camera from "./CameraPage/camera";
import Gallery from "./galleryPage/gallery.js";
import Main from "./main";
import Result from "./resultPage/resultPage";
import Mypage from "./mypage";
import Upload from "./UploadPage/Upload";
// import Find from "./find";
import Auth from "./Auth";
import NotFound from "./NotFound";
import { BaseContainer } from "../../containers/BaseContainer";

const RoutePage = () => {
  const userId = 3;
  return (
    <>
      <BaseContainer>
        <MainLayout header={{ noBackBtn: true }}>
          <Switch>
            <Route exact path={["/home", "/"]} component={Main} />
            {/* <Route exact path={"/find"} component={Find} /> */}
            <Route exact path={"/camera"} component={Camera} />
            <Route exact path={"/upload"} component={Upload} />
            <Route exact path={"/result"} component={Result} />
            <Route exact path={`/${userId}/gallery`} component={Gallery} />
            <Route exact path={`/${userId}/mypage`} component={Mypage} />
            {/* 테스트 */}
            <Route exact path="/auth/:kind" component={Auth} />
            <Route component={NotFound} />
          </Switch>
          {/*<BaseContainer />*/}
        </MainLayout>
      </BaseContainer>
    </>
  );
};

export default RoutePage;
