<template>
  <div class="container2 d-flex">
    <div class="whitespace flex-fill"></div>
    <div class="center flex-fill line">
      <div class="updateFormHeader">
        게시글 수정
      </div>
      <div class="updateform">
        <div class="titlebox">
          <div class="title">
            제목
          </div>
          <input type="text" class="titleinput form-control" v-model="board.btitle"/>
        </div>
        <div class="imagebox">
          <input type="file" class="form-control-file mb-2" @change="previewImg" ref="images" multiple/>
          <div class="imagethumbnail">
            <img class="singleimg" id="img1"/>
            <img class="singleimg" id="img2" />
            <img class="singleimg" id="img3" />
          </div>
        </div>
        <div class="memocontainer">
          <input type="text" class="memoinput form-control"  v-model="board.bmemo"/>
        </div>
      </div>
      <div class="bottombtn">
        <input type="button" class="btn btn-primary btn-sm mr-1" value="취소" v-on:click="handleCancel"/>
        <input type="submit" class="btn btn-primary btn-sm" value="수정"/>
      </div>
    </div>
    <div class="whitespace flex-fill"></div>
    
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import apiBoard from '@/apis/board';

const store = useStore();
const router = useRouter();
const board = ref(null);
// const bno = route.query.bno;
const bno = 10129;
const images = ref(null);
const newimages = ref(null);

async function getBoard() {
  const dbBoard = await apiBoard.readBoard(bno, false);
  board.value = dbBoard;//board2에 imageNum필드 추가필요.
  // images테이블에서 bno가 일치하는 행들의 ino를 받아옴.
  let inolist = await apiBoard.getInos(bno);
  // ino리스트의 length만큼 반복하면서 이미지 가져오기.
  for(let i=0; i<inolist.length; i++) {
    const blob = await apiBoard.downloadBoardAttach(inolist[i]);
    var reader = new FileReader();
    reader.onload = function(event) {
      let imgtag = document.getElementById(`img${i+1}`);
      imgtag.src = event.target.result;
      imgtag.style.visibility = 'visible';
    };
    reader.readAsDataURL(images.value.files[i]);
// battach.value = URL.createObjectURL(blob);
  }

}

getBoard();

</script>

<style scoped>
.container2 {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  padding-bottom: 2rem;
}
.whitespace {
  display: flex;
  flex-direction: column;
}
.center {
  width: 80%;
  display: flex;
  flex-direction: column;
}
.updateform {
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 30rem;
}

.line {
  border: 1px solid black;
}
.titlebox {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.title {
  font-size: 25px;
}
.titleinput {
  width: 30rem;
  height: 3rem;
  font-size: 17px;
}
.updateFormHeader {
  font-size: 35px;
  text-align: center;
  border-bottom: thick double #6355a6d8;
}
.imagebox {
  padding-top: 1rem;
  padding-bottom: 1rem;  
}
.imagethumbnail {
  display: flex;
  flex-direction: row;
}
.singleimg {
  width: 220px;
  height: 150px;
  margin-left: 2%;
  background-size: cover;
  visibility: hidden;}
.memoinput {
  width: 50rem;
  height: 7rem;
  font-size: 17px;
}
.bottombtn {
  display: flex;
  justify-content: flex-end;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-right: 30rem;
}
</style>