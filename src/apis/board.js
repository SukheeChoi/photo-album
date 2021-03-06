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
async function getBoardListById(pageNo, mid) {
  let response = null;
  console.log('getBoardListById - mid : ' + mid);
  try {
    response = await axios.get("/board2/list", { params: { pageNo, mid } }); //queryString 방식으로 넘기기, 이름이 같으면 생략 가능

    return { result: "success", data: response.data };
  } catch (error) {
    console.log(error);
    console.log("실패!");
  }
}

async function getBoardList2(pageNo) {
  let response = null;
  try {
    response = await axios.get("/board2/list2", { params: { pageNo } }); //queryString 방식으로 넘기기, 이름이 같으면 생략 가능

    return { result: "success", data: response.data };
  } catch (error) {
    console.log(error);
    console.log("실패!");
  }
}

// 게시물 작성(멀티 파트로 구성해서 전달)
async function createBoard(multipartFormData) {
  try {
    const response = await axios.post("/board2/", multipartFormData);
    return response.data;
  } catch (error) {
    if (error.response) {
      // 서버 응답이 있다
      if (error.response.status === 403) {
        if (await apiAuth.refreshToken()) {
          const response = await axios.post("/board2/", multipartFormData);
          return response.data;
        }
      }
    }
    console.log(error);
  }
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

//게시물 하나의 이미지 전체 가져오는 요청
async function getImagesBlob(bno) {
  let response = null;
  let result = null;
  try {
    response = getImages(bno).then(async (data) => {

      result = await data.images.map(async (data) => {
        let responseData = await axios.get(`/board2/image/${data.ino}`, { responseType: "blob" });
        return responseData.data;
      });

      const promiseAll = await Promise.all(result);
      return promiseAll;
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}

// 먼저 송신받는 이미지부터 렌더링하기 위한 매소드.
async function getImage(ino) {
  try {
    let image = await axios.get(`/board2/image/${ino}`, { responseType: "blob" });
    return image.data;
  } catch (error) {
    console.log(error);
  }
}

// 게시물 수정하고, 수정한 데이터 받아옴.(수정 성공시, bno와 hit를 read페이지에 넘겨서 수정된 결과물을 사용자에게 보여주기.)
async function updateBoard(multipartFormData) {
  try {
    const response = await axios.put('/board2/', multipartFormData);
    return response.data.result;
  } catch(error) {
    console.log(error);
  }
}

// 게시물 삭제.
async function deleteBoard(bno) {
  try {
    const response = await axios.delete(`/board2/${bno}`);
    return response.data.result;
  } catch(error) {
    console.log(error);
  }
}

export default {
  getBoardList,
  getBoardList2,
  createBoard,
  getBoard,
  getImages,
  downloadImage,
  getImagesBlob
  , getImage
  , updateBoard
  , deleteBoard
  , getBoardListById
};
