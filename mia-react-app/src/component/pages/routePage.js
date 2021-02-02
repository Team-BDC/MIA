import MainLayout from "../layout/MainLayout";
import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Camera from "./CameraPage/camera";
import Gallery from "./galleryPage/gallery.js";
import Main from "./MainPage/main.js";
import ResultContainer from "./resultPage/resultContainer";

import Auth from "./Auth";
import NotFound from "./NotFound";

// gallery 연동
import Gallery2 from "./galleryPage/gallery2.js";
import UploadContainer from "./UploadPage/UploadContainer";

// 페이지네이터
// import Connect from "../gallery/InsertForm/connect.js";
//import Test from "../gallery/InsertForm/test.js";

const RoutePage = (props) => {
  // const userId = 3;
  useEffect(() => {
    console.log(props);
  }, []);
  return (
    <>
      <MainLayout {...props}>
        <Switch>
          <Route
            exact
            path={["/home", "/"]}
            render={(allProps) => <Main {...props} {...allProps} />}
          />
          {/* <Route exact path={"/find"} component={Find} /> */}
          <Route
            exact
            path={"/camera"}
            render={(allProps) => <Camera {...props} {...allProps} />}
          />
          <Route
            exact
            path={"/upload"}
            render={(allProps) => <UploadContainer {...props} {...allProps} />}
          />
          <Route
            exact
            path={"/result"}
            render={(allProps) => <ResultContainer {...props} {...allProps} />}
          />
          <Route
            exact
            path={"/test"}
            render={(allProps) => <ResultContainer {...props} {...allProps} />}
          />
          {/* 페이지네이터 테스트 */}

          <Route
            exact
            path={"/gallery"}
            render={(allProps) => <Gallery2 {...props} {...allProps} />}
          />
          {/* 회원기능 */}
          <Route
            exact
            path="/auth/:kind"
            render={(allProps) => <Auth {...props} {...allProps} />}
          />
          <Route component={NotFound} />
        </Switch>
        {/*<BaseContainer />*/}
      </MainLayout>
    </>
  );
};

export default RoutePage;
