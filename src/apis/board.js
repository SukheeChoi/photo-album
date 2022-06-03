import axios from "axios";
import apiAuth from '@/apis/auth';

//게시물 목록 요청
async function getBoardList(pageNo=1) {
  let response = null;
  try {
    response = await axios.get("/board2/list", pageNo);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// 게시물 작성(멀티 파트로 구성해서 전달)
async function createBoard(multipartFormData) {
  let dbBoard = null;
  try {
    const response = await axios.post('/board2/', multipartFormData);
    dbBoard = response.data;
  } catch(error) {
    if(error.response) {
      // 서버 응답이 있다
      if(error.response.status === 403) {
        if(await apiAuth.refreshToken()) {
          console.log('~~~~~~~~~~~~~~~~');
          const response = await axios.post('/board2/', multipartFormData);
          dbBoard = response.data;
        }
      }
    }
    console.log(error);
  }

  return dbBoard;
}

export default {
  getBoardList
  , createBoard
}
