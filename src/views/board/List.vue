<template>
  <div v-if="page != null">
    <div class="boardList mx-0 px-0">
      <div class="container-fluid row mx-0">
        <div class="col-2"></div>
        <div class="col-8 row">
          <div class="col-3 divItem pt-2" v-for="board of page.lastData" :key="board.bno">
            <!-- 앨범 요소 시작-->
            <router-link :to="`/board/read?bno=${board.bno}&pageNo=${page.pager.pageNo}&hit=true`">
              <div class="w-100 px-3" style="display: flex; justify-content: center; flex-direction: column">
                <img :src="board.imgUrl" class="d-block img" style="object-fit: cover" alt="..." />
                <div>
                  <dt>{{ board.btitle }}</dt>
                  <dd>{{ new Date(board.bdate).toLocaleDateString() }}</dd>
                </div>
              </div>
            </router-link>
            <!-- 앨범 요소 끝 -->
          </div>
          <div class="col-12 d-flex align-content-end justify-content-end">
            <button @click="goWriteForm(pageNo)" class="btn btn-info border pt-1 mt-1" style="font-size: 20px; width: 90px">글쓰기</button>
          </div>
        </div>
      </div>
      <!-- 페이저 -->
      <ul class="pagination d-flex justify-content-center">
        <li @click="changePageNo(1)" class="btn btn-outline-primary btn-sm mr-1">First</li>
        <li v-if="page.pager.groupNo > 1" @click="changePageNo(page.pager.startPageNo)" class="page-item">Previous</li>
        <!-- <li class="page-item"><a class="page-link" href="#">1</a></li> -->
        <li
          v-for="pageNo in range(page.pager.startPageNo, page.pager.endPageNo)"
          :key="pageNo"
          @click="changePageNo(pageNo)"
          class="btn"
          :class="page.pager.pageNo === pageNo ? 'btn-outline-success' : ''"
        >
          {{ pageNo }}
        </li>
        <li v-if="page.pager.groupNo < page.pager.totalGroupNo" @click="changePageNo(page.pager.endPageNo + 1)" class="page-item">Next</li>
        <li @click="changePageNo(page.pager.totalPageNo)" class="btn btn-outline-primary btn-sm mr-1">Last</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import apiBoard from "@/apis/board";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const page = ref(null);
const route = useRoute();
const router = useRouter();

//라우팅 시에 전달된 QueryString에서 pageNo를 읽기
let pageNo = route.query.pageNo;
if (pageNo === "undefined") {
  pageNo = 1;
}

//Rest API와 통신해서 페이지에 대한 정보(게시물 목록+페이저)
async function getBoardList(pageNo) {
  const result = await apiBoard.getBoardList(pageNo);
  if (result.result === "success") {

    //bmemo에 담긴 ino을 이용해 map함수로 하나씩 요청을 보낸다. 
    const resultData = result.data.boards.map(async (data) => {
      const responseData = data.bmemo ? await apiBoard.downloadImage(data.bmemo) : null;
      return { ...data, responseData };
    });

    //받아온 데이터들 promise.all로 비동기 처리 해준다.
    const promiseAll = await Promise.all(resultData);

    //받아온 데이터들 중 blob데이터를 URL로 바꾸는 코드
    const lastData = promiseAll.map((img) => {
      const imgUrl = img.responseData ? URL.createObjectURL(img.responseData) : null;
      return { ...img, imgUrl };
    });
    
    page.value = { ...result.data, lastData };
    
  } else {
    router.push("/board/list");
  }
}

getBoardList(pageNo);

function range(start, end) {
  const numbers = [];
  for (let i = start; i <= end; i++) {
    numbers.push(i);
  }
  return numbers;
}

function changePageNo(pageNo) {
  router.push(`/board/list?pageNo=${pageNo}`);
  console.log("=========pageNo=============");
  console.log(pageNo);
  console.log(page.value.pager.pageNo);
  console.log("===========route2==========");
  console.log(route.query);
}

watch(route, (newUrl, oldUrl) => {
  if (newUrl.query.pageNo) {
    getBoardList(newUrl.query.pageNo);
    console.log("url변함");
  } else {
    console.log("url안변함");
    getBoardList(1);
  }
});

function goWriteForm(pageNo = 1) {
  if (sessionStorage.getItem("userId")) {
    router.push(`/board/writeform?pageNo=` + pageNo);
  } else {
    alert("로그인 해주세요")
  }
}
</script>

<style scoped></style>

<style>
.divItem {
  border-bottom: 2px solid #e2e2e2;
}
.img {
  width: 100%;
  height: auto;
  max-height: 120px;
}
a {
  text-decoration: none;
  color: black;
}
</style>
