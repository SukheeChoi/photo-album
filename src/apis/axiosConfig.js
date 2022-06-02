import axios from "axios";

axios.defaults.baseURL = "http://localhost";

function addAuthHeader(accessToken) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
}

function removeAuthHeader() {
  delete axios.defaults.headers.common["Authorization"];
}

export default {
  addAuthHeader,
  removeAuthHeader,
}