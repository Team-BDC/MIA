import MainLayout from "../layout/MainLayout";
import { Route, Switch } from "react-router-dom";
import Camera from "./CameraPage/camera";
import Gallery from "./galleryPage/gallery.js";
import Main from "./main";
import Result from "./resultPage/resultPage";
import Upload from "./UploadPage/Upload";

import Auth from "./Auth";
import NotFound from "./NotFound";
import { BaseContainer } from "../../containers/BaseContainer";

// gallery 연동
import Gallery2 from "./galleryPage/gallery2.js";

// 페이지네이터
// import Connect from "../gallery/InsertForm/connect.js";
import Test from "../gallery/InsertForm/test.js";

const RoutePage = () => {
  // const userId = 3;
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
            {/* 페이지네이터 테스트 */}
            <Route exact path={"/test"} component={Test} />
            {/* <Route exact path={`/${userId}/gallery`} component={Gallery} /> */}
            <Route exact path={"/gallery"} component={Gallery2} />
            {/* 회원기능 */}
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
