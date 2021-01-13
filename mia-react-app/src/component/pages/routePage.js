import MainLayout from "../layout/MainLayout";
import { Route, Switch } from "react-router-dom";
import Camera from "./camera";
import Gallery from "./gallery";
import Main from "./main";
import Result from "./result";
import Signin from "./signin";
import Signup from "./signup";

const RoutePage = () => {
  const userId = 3;
  return (
    <MainLayout header={{ noBackBtn: true }}>
      <Switch>
        <Route exact path={["/home", "/"]} component={Main} />
        <Route exact path={"/signup"} component={Signup} />
        <Route exact path={"/signin"} component={Signin} />
        <Route exact path={"/camera"} component={Camera} />
        <Route exact path={"/result"} component={Result} />
        <Route exact path={`/${userId}/gallery`} component={Gallery} />
      </Switch>
    </MainLayout>
  );
};

export default RoutePage;
