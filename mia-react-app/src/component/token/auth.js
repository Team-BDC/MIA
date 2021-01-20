import axios from "axios";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
const API_URL = "http://localhost:8000";

class Auth {
  login(username, password) {
    return axios
      .post(API_URL + "/jwt/token", { username, password })
      .then((response) => {
        if (response.data.token) {
          console.log(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
        }
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, password, email, first_name, last_name) {
    const data = {
      username,
      password,
      email,
      first_name,
      last_name,
    };
    console.log(JSON.stringify(data));
    return axios
      .post(API_URL + "api/v1/user/", data)
      .then((res) => {
        if (res.statusText === "Created") {
          alert("회원가입에 성공하였습니다.");
          history.push("/login");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

export default new Auth();
