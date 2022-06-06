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
    const resultLee = result.data.boards.map(async (data) => {
      console.log(data);
      const resultlee2 = data.bmemo ? await apiBoard.downloadImage(data.bmemo) : null;
      return { ...data, resultlee2 };
    });
    const lee = await Promise.all(resultLee);

    console.log(lee);
    const lastData = lee.map((img) => {
      const imgUrl = img.resultlee2 ? URL.createObjectURL(img.resultlee2) : "@/assets/noImage.png";
      return { ...img, imgUrl };
    });
    console.log(lastData);
    page.value = { ...result.data, lastData };
    console.log(page.value);
  } else {
    router.push("/board");
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
    alert("로그인해주세요")
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
