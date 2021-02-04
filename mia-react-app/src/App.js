import RoutePage from "./component/pages/routePage";
import BaseContainer from "./containers/BaseContainer";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <Router>
      <BaseContainer />
    </Router>
  );
}

export default App;
