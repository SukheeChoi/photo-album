<template>
  <div class="container2 d-flex">
    <div class="whitespace flex-fill"></div>
    <div class="center flex-fill line">
      <div class="updateFormHeader">
        게시글 수정
      </div>
      <form v-show="board" v-on:submit.prevent="handleUpdate"  class="updateform line">
        <div class="titlebox">
          <div class="title">
            제목
          </div>
          <input type="text" class="titleinput form-control" v-model="board.btitle"/>
        </div>
        <div v-show="bloblist != null" class="imagebox line">
            <input v-show="showImageInput" type="file" class="form-control-file mb-2" ref="newimages" multiple/>
          <div class="imagethumbnail">
            <!-- 게시글이 가지고 있던 기존 이미지의 미리보기. -->
            <div v-for="(blob, index) in bloblist" :key="index">
              <img class="singleimg" :src="blob" :data-image-index="index" @click="deleteImg" />
            </div>
            <!-- 새롭게 선택한 이미지의 미리보기. -->
            <div>
              <img class="singleimg" />
            </div>
          </div>
        </div>
        <div class="memocontainer">
          <input type="text" class="memoinput form-control"  v-model="board.bmemo"/>
        </div>
      </form>
      <div class="bottombtn">
        <input type="button" class="btn btn-primary btn-sm mr-1" value="취소" v-on:click="handleCancel"/>
        <input type="submit" class="btn btn-primary btn-sm" value="수정"/>
      </div>
    </div>
    <div class="whitespace flex-fill"></div>
    
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import apiBoard from '@/apis/board';

const store = useStore();
const router = useRouter();
const board = ref(null);
// const bno = route.query.bno;
const bno = 10129;
const images = ref(null);
const bloblist = ref([]);
const showImageInput = ref(false);
const newimages = ref(null);

async function getBoard() {
  const dbBoard = await apiBoard.getBoard(bno, false);
  board.value = dbBoard;
  const resultImg = await apiBoard.getImages(bno);
  images.value = resultImg.images; //list

  console.log('board.value : ' + board.value);
  console.log('resultImg : ' + resultImg);
  console.log('resultImg.images : ' + resultImg.images);
  console.log('resultImg.images[0] : ' + resultImg.images[0]);
  console.log('resultImg.images[0].ino : ' + resultImg.images[0].ino);
  console.log('images.value.length : ' + images.value.length);
  console.log('images.value[2].ino : ' + images.value[2].ino);
  console.log('typeof(images.value) : ' + typeof(images.value));
  console.log('JSON.stringify(images.value) : ' + JSON.stringify(images.value));

  // images테이블에서 bno가 일치하는 행들의 수만큼 반복하면서, 이미지 가져오기.
  for(let imageinfo of images.value) {
    console.log('imageinfo : ' + imageinfo);
    console.log('imageinfo.ino : ' + imageinfo.ino);
    const imagedata = await apiBoard.getImage(imageinfo.ino);
    bloblist.value.push( URL.createObjectURL(imagedata) );
    // console.log(`bloblist.value[${i}] : `  + bloblist.value[i]);
    // console.log(`bloblist.value[${i}].substring(5) : `  + bloblist.value[i].substring(5));

  }

  // for(let i=0; i<images.value.length; i++) {
  //   console.log('for start - i : ' + i);
  //   console.log('for - images.value.length : ' + images.value.length);
  //   console.log(`images.value[${i}].ino : ` + images.value[i].ino);
  //   const imagedata = await apiBoard.getImage(images.value[i].ino);
  //   bloblist.value.push( URL.createObjectURL(imagedata) );
  //   console.log(`bloblist.value[${i}] : `  + bloblist.value[i]);
  //   console.log(`bloblist.value[${i}].substring(5) : `  + bloblist.value[i].substring(5));
  //   console.log('for end - i : ' + i);
  // }

}
getBoard();

// 첨부된 사진의 수가 3개 미만인 경우에만, 파일첨부 태그가 활성화되도록 함.
watch(bloblist.value
      , (newBlobList, oldBlobList) => {
        if(newBlobList.length < 3) {
          showImageInput.value = true;
        } else {
          showImageInput.value = false;
        }
      }
      , {deep: true}
);

// 첨부된 이미지 클릭시에, 바인딩 객체인 images에서 삭제.
function deleteImg(event) {
  console.log('event.target.dataset.imageIndex : ' + event.target.dataset.imageIndex);
  // bloblist에서 해당 index의 데이터를 삭제. -> 바인딩 객체이므로, 미리보기에서도 삭제됨.
  // 수정을 취소하거나 새로고침하면 기존 첨부 데이터들 새롭게 불러옴. 클릭시에 실제로 삭제되는건 X. 최종적으로 '수정'버튼' 클릭될 때 까지 정보를 가지고 있어야함.
  bloblist.value.splice(event.target.dataset.imageIndex, 1);
}

async function handleUpdate() {

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
  /* justify-content: center; */
  /* align-content: center; */
  align-content: stretch;
}
.updateform {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  /* padding-left: 30rem; */
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
  /* display: flex; */
  /* align-items:center; */
  /* flex-grow: 1; */
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
  align-content: center;
  flex-grow: 1;
}
.singleimg {
  width: 220px;
  height: 150px;
  margin-left: 2%;
  background-size: cover;
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