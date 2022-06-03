import axios from "axios";

//게시물 목록 요청
async function getBoardList(pageNo) {
  let response = null;
  try {
    response = await axios.get("/board2/list", {params:{pageNo}}); //queryString 방식으로 넘기기, 이름이 같으면 생략 가능

    return {result:"success", data:response.data};
  } catch (error) {
    console.log(error);
    console.log("실패!");
  }
}

export default {
  getBoardList,
}
