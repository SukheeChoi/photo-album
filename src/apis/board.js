import axios from "axios";
import apiAuth from "@/apis/auth";

//게시물 목록 요청
async function getBoardList(pageNo) {
  let response = null;
  try {
    response = await axios.get("/board2/list", { params: { pageNo } }); //queryString 방식으로 넘기기, 이름이 같으면 생략 가능

    return { result: "success", data: response.data };
  } catch (error) {
    console.log(error);
    console.log("실패!");
  }
}



// 게시물 작성(멀티 파트로 구성해서 전달)
async function createBoard(multipartFormData) {
  let dbBoard = null;
  try {
    const response = await axios.post("/board2/", multipartFormData);
    dbBoard = response.data;
  } catch (error) {
    if (error.response) {
      // 서버 응답이 있다
      if (error.response.status === 403) {
        if (await apiAuth.refreshToken()) {
          console.log("~~~~~~~~~~~~~~~~");
          const response = await axios.post("/board2/", multipartFormData);
          dbBoard = response.data;
        }
      }
    }
    console.log(error);
  }

  return dbBoard;
}

//게시물 1개 요청
async function getBoard(bno, hit) {
  let response = null;
  try {
    response = await axios.get(`/board2/${bno}?hit=${hit}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

//이미지 정보 가져오기
async function getImages(bno) {
  let response = null;
  try {
    response = await axios.get(`/board2/images/${bno}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

//이미지 하나 다운로드 요청
async function downloadImage(ino) {
  let response = null;
  try {
    response = await axios.get(`/board2/image/${ino}`, { responseType: "blob" });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

//전체 이미지 가져오는 요청
async function getImagesLee(bno) {
  let response = null;
  let result = null;
  try {
    response = getImages(bno).then(async (data) => {
      result = await data.images.map(async (data) => {
        let dataLee = await axios.get(`/board2/image/${data.ino}`, { responseType: "blob" });
        return dataLee.data;
      });

      const lee = await Promise.all(result);
      return lee;
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}

export default {
  getBoardList,
  createBoard,
  getBoard,
  getImages,
  downloadImage,
  getImagesLee,
};
