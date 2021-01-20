import axios from "axios";
import token from "./token";

const user = JSON.parse(localStorage.getItem("user"));
const API_URL = "http://localhost:8000/api/v1/users/";

class Account {
  getUserProfile() {
    const url = API_URL + user.user.id + "/";
    return axios.get(url, { headers: token() }).then((res) => res.data);
  }
}

export default new Account();
