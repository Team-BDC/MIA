export default function token() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    return { Authorization: "JWT " + user.token };
  } else {
    return {};
  }
}
