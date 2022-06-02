import axios from "axios";

//게시물 목록 요청
async function getBoardList(pageNo=1) {
  let response = null;
  try {
    response = await axios.get("/board/list", pageNo);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default {
  getBoardList,
}
