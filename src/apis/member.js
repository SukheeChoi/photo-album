import axios from "axios";
import apiAuth from "@/apis/auth";

//게시물 목록 요청
async function getMember(mid) {
  let response = null;
  try {
    response = await axios.get(`/mypage/${mid}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default {
  getMember
};
