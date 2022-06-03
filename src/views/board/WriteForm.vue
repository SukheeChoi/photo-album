<template>
  <div class="container2 d-flex">
    <div class="whitespace flex-fill"></div>
    <div class="center flex-fill">
      <div class="writeFormHeader">
        게시글 작성
      </div>
      <form v-on:submit.prevent="handleAdd" class="writeform">
        <div class="titlebox">
          <div class="title">
            제목
          </div>
          <input type="text" class="titleinput form-control" placeholder="글 제목을 입력하세요." v-model="board.btitle"/>
        </div>
        <div class="imagebox">
          <input type="file" class="form-control-file mb-2" ref="images" multiple/>
          <div class="imagethumbnail">
            <img class="singleimg" src="@/assets/포르쉐.png" />
            <img class="singleimg" src="@/assets/포르쉐.png" />
            <img class="singleimg" src="@/assets/포르쉐.png" />
          </div>
        </div>
        <div class="memocontainer">
          <input type="text" class="memoinput form-control" placeholder="메모할 내용을 입력하세요." v-model="board.bmemo"/>
        </div>

        <div class="bottombtn">
          <input type="button" class="btn btn-primary btn-sm mr-1" value="취소" v-on:click="handleCancel"/>
          <input type="submit" class="btn btn-primary btn-sm" value="저장"/>
        </div>
      </form>

    </div>
    <div class="whitespace flex-fill"></div>
    
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import apiBoard from '@/apis/board';

const store = useStore();
const router = useRouter();

const board = reactive({
  btitle: ''
  , bmemo: ''
  , mid: store.state.userId
});

const images = ref(null);

async function handleAdd() {
  const multipartFormData = new FormData();
  // multipartFormData.append('btitle', board.btitle);
  // multipartFormData.append('bmemo', board.bmemo);
  // multipartFormData.append('mid', store.state.userId);
  for(let i=0; i<images.value.files.length; i++) {
    multipartFormData.append('imagesArray', images.value.files[i]);
  }
  await apiBoard.createBoard(board, multipartFormData);
  router.push('/board/list');
}

// 취소 버튼 클릭시에, 목록화면으로 이동.// pager 넘기기~~~~~~~
function handleCancel() {
  router.push('/board/list');
}

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
.writeform {
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
  width: 50rem;
  height: 3rem;
  font-size: 17px;
}
.writeFormHeader {
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
}

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