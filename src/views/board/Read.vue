<template>
  <div v-if="board != null && images != null" class="dataView">
    <div class="title">
      <div>{{ board.btitle }}</div>
    </div>
    <div class="dataInfo d-flex justify-content-between">
      <div id="dataInline" class="d-flex align-self-center">
        <div class="no">
          <dt style="display: inline">글 번호</dt>
          <img src="@/assets/bg_thGab.gif" alt="" />
          <dd style="display: inline">{{ board.bno }}</dd>
        </div>
        <div class="date">
          <dt style="display: inline">등록일</dt>
          <img src="@/assets/bg_thGab.gif" alt="" />
          <dd style="display: inline">{{ new Date(board.bdate).toLocaleDateString() }}</dd>
        </div>
        <div class="name">
          <dt style="display: inline">글쓴이</dt>
          <img src="@/assets/bg_thGab.gif" alt="" />
          <dd style="display: inline">{{ board.mid }}</dd>
        </div>
        <div class="hitCoun">
          <dt style="display: inline">조회수</dt>
          <img src="@/assets/bg_thGab.gif" alt="" />
          <dd style="display: inline">{{ board.bhitcount }}</dd>
        </div>
      </div>
      <div>
        <router-link to="/board/updateForm" class="btn btn-info btn-sm mr-2">수정</router-link>
        <button class="btn btn-info btn-sm">삭제</button>
      </div>
    </div>
    <div class="dataFile">
      <dl class="hitCount d-flex">
        <dt>첨부파일</dt>
        <dd v-for="image in images" :key="image.ino" @click="dowanloadBattach(image.ino, image.imgoname)">
          <img alt="Vue logo" src="@/assets/logo.png" width="20rem;" />{{ image.imgoname }}
        </dd>
      </dl>
    </div>
    <div class="dataContent d-flex flex-column align-items-center">
      <div class="viewAria mx-5" v-if="lees != null">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">

            <div class="carousel-item" v-for="(blob, index) in lees" :key="index" :class="{ 'active' : index === 0 }">
              <img :src="blob" class="d-block w-100" />
            </div>
            
          </div>
          <button class="carousel-control-prev" type="button" data-target="#carouselExampleIndicators" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-target="#carouselExampleIndicators" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </button>
        </div>
      </div>
      <div>{{board.bmemo}}</div>
      <router-link :to="`/board2/list?pageNo=${pageNo}`" class="btn btn-secondary btn-sm mt-3">목록 가기</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import apiBoard from "@/apis/board";
import fileDownload from "js-file-download";

const route = useRoute();
const router = useRouter();

const bno = route.query.bno;
const pageNo = route.query.pageNo;
const hit = route.query.hit;

const board = ref(null);
const images = ref(null);
const lees = ref(null);

async function getBoard() {
  const result = await apiBoard.getBoard(bno, hit);
  board.value = result;
  const resultImg = await apiBoard.getImages(bno);
  images.value = resultImg.images;

  console.log(result);
  console.log(images.value);
}

async function dowanloadBattach(ino, imgoname) {
  const result = await apiBoard.downloadImage(ino);
  fileDownload(result, imgoname);
  console.log(result);
}

async function getBoardLee() {
  const result = await apiBoard.getImagesLee(bno);
  lees.value = result.map((data)=> {
    return URL.createObjectURL(data);
  });
  console.log(lees.value);
  return result;
}

getBoard();
getBoardLee();

</script>

<style scoped>
.title {
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
  border-top: 1px black solid;
  border-bottom: 1px #b4b4b4 solid;
  padding: 0.8rem;
}

.dataInfo {
  font-size: 0.9rem;
  padding: 0.2rem;
  border-bottom: 1px #b4b4b4 solid;
}

.dataFile {
  font-size: 0.9rem;
  padding: 0.5rem;
  border-bottom: 1px #b4b4b4 solid;
  margin-bottom: 2rem;
}

.dataContent {
  align-content: center;
  text-align: center;
}

.viewAria {
  padding-bottom: 1rem;
  width: 1100px;
}

.viewAria img {
  object-fit: cover;
  height: 500px;
}

textarea {
  padding-bottom: 1rem;
  width: 1100px;
}

dl {
  margin-bottom: 0;
}

dl dd {
  cursor: pointer;
}

dt {
  display: block;
  padding: 0 0.5rem;
  font-weight: bold;
}

dd {
  padding: 0 0.5rem;
  margin-bottom: 0;
}

dd img {
  width: 1rem;
}
</style>
