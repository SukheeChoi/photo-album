<template>
  <div class="container2 d-flex">
    <div class="whitespace flex-fill"></div>
    <div class="center flex-fill">
      <div class="updateFormHeader">
        게시글 수정
      </div>
      <form v-show="board" v-on:submit.prevent="handleUpdate"  class="updateform">
        <div class="titlebox">
          <div class="title">
            제목
          </div>
          <input type="text" class="titleinput form-control" v-model="board.btitle" />
        </div>
        <div v-show="bloblist != null" class="imagebo">
            <input v-show="showImageInput" type="file" id="files" class="form-control-file mb-2" @change="appendPreviewImg" ref="newimages" multiple />
          <div class="imagethumbnail">
            <!-- 게시글이 가지고 있던 기존 이미지의 미리보기. -->
            <div v-for="(blobObj, index) in bloblist" :key="index">
              <img class="singleimg presentImg" :src="blobObj.blob" data-label="present" :data-ino="blobObj.ino" :data-image-index="index" @click="deleteImg" />
            </div>
            <!-- 새롭게 선택한 이미지의 미리보기. -->
            <div class="imagethumbnail" v-show="newBlobList != null">
              <div v-for="(blob, index) in newBlobList" :key="index">
                <img class="singleimg" :src="blob" data-label="new" :data-new-image-index="index" @click="deleteImg" />
              </div>
            </div>
          </div>
        </div>
        <div class="memocontainer">
          <input type="text" class="memoinput form-control"  v-model="board.bmemo"/>
        </div>

      <div class="bottombtn">
        <router-link :to="`/board/read?bno=${bno}&hit=false&pageNo=${pageNo}`" class="btn btn-primary btn-sm mr-1">취소</router-link>
        <input type="submit" class="btn btn-primary btn-sm" value="수정"/>
      </div>
      </form>

    </div>
    <div class="whitespace flex-fill"></div>
    
    <AlertDialog v-if="dialog" :message="dialogMessage" @close="dialog = false" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import apiBoard from '@/apis/board';
import AlertDialog from "@/components/AlertDialog.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();
const board = ref(null);
const bno = route.query.bno;
let pageNo = route.query.pageNo;
if (pageNo === "undefined") {
  pageNo = 1;
}
const images = ref(null);
const bloblist = ref([]);
const showImageInput = ref(false);
const newimages = ref(null);
const newBlobList = ref([]);
const deleteInoList = [];
const dialog = ref(false);
const dialogMessage = ref('');

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
  // console.log('images.value[2].ino : ' + images.value[2].ino);
  console.log('typeof(images.value) : ' + typeof(images.value));
  console.log('JSON.stringify(images.value) : ' + JSON.stringify(images.value));

  // images테이블에서 bno가 일치하는 행들의 수만큼 반복하면서, 이미지 가져오기.
  for(let imageinfo of images.value) {
    console.log('imageinfo : ' + imageinfo);
    console.log('imageinfo.ino : ' + imageinfo.ino);
    const imagedata = await apiBoard.getImage(imageinfo.ino);
    // images의 ino와 imagedata의 blob을 1개의 img태그에 각각 data-attribute와 src로 바인딩하기 위해서, {}를 []에 담음.
    let attr = {
      blob: URL.createObjectURL(imagedata)
      , ino: imageinfo.ino
    };
    bloblist.value.push(attr);
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
watch([bloblist, newBlobList]
      , ([newOldBlobList, newNewBlobList], [oldOldBlobList, oldNewBlobList]) => {
        if(newOldBlobList.length + newNewBlobList.length < 3) {
          showImageInput.value = true;
        } else if(newOldBlobList.length + newNewBlobList.length === 3) {
          // input태그는 비활성화하지만, 첨부된 사진은 그대로 둠.
          showImageInput.value = false;
        } else {
          // input태그 비활성화하고, 새롭게 첨부된 사진 이전의 상태로 되돌림.
          //첨부파일 3개 초과시, newBlobList.value.pop(); : newBlobList.value가 const라서 속성에 대한 변경만 가능하기 때문에 pop().
          let over = (newOldBlobList.length + newNewBlobList.length) - 3;
          console.log('newimages.value.files[newimages.value.files.length-1] : ' + newimages.value.files[newimages.value.files.length-1]);
          let keys = Object.keys(newimages.value.files);
          console.log('~~~~~~!@!@keys : ' + keys);
          console.log('~~~~~~!@!@keys[keys.length-1] : ' + keys[keys.length-1]);
          console.log('~~~~~~!@!@typeof(keys) : ' + typeof(keys));
          //
          const input = document.getElementById('files')
          // input.addEventListener('change', () => {
            const fileListArr = [...input.files]
            for(let i=0; i<over; i++) {
              fileListArr.splice(-1, 1);
              console.log(fileListArr);
            }
            // input.files = {...fileListArr};
            input.files = null;
            // newimages.value.files = {...fileListArr};
          // });
          /////
          // newimages.value.files = null;
          // newimages.value = null;

          // console.log('newimages.value.files : ' + newimages.value.files);
          //
          // const fileListArr = [...newimages.value.files]
          for(let i=0; i<over; i++) {
            // console.log('typeof(newimages.value) : ' + typeof(newimages.value));
            // console.log('typeof(newimages.value.files) : ' + typeof(newimages.value.files));
            // console.log('typeof(newimages.value.length) : ' + typeof(newimages.value.length));
            // 갯수 초과된 첨부사진은 미리보기에서 제거되도록 newBlobList에서 삭제.
            newBlobList.value.pop();
            // 갯수 초과된 첨부사진은 수정시에 저장되지 않도록 newimages에서도 삭제.
            // console.log('before splice fileListArr' + fileListArr)
            // fileListArr.splice(-1, 1);
            // console.log('after splice fileListArr' + fileListArr)
            // delete newimages.value.files[[keys[keys.length-(i+1)]]];
            // delete newimages.value.files[Object.keys(newimages.value.files)[keys[keys.length-(i+1)]]];

            // console.log('newimages.value.files[newimages.value.files.length-1] : ' + newimages.value.files[newimages.value.files.length-1]);
          }
          // newimages.value.files = {...fileListArr};
          // newimages.value = fileListArr;
          // newimages.value.files = fileListArr;
          // console.log('@@@newimages.value.files.length : ' + newimages.value.files.length);
          // console.log('JSON.stringify(newimages.value) : ' + JSON.stringify(newimages.value));
          // console.log('JSON.stringify(newimages.value.files) : ' + JSON.stringify(newimages.value.files));
          // console.log('newimages.value : ' + newimages.value);
          // console.log('newimages.value.files : ' + newimages.value.files);
          // console.log('Object.keys(newimages.value)[images.value.length -1] : ' + Object.keys(newimages.value)[images.value.length -1]);
          // console.log('Object.keys(newimages.value)[-1] : ' + Object.keys(newimages.value)[newimages.value.files]);
          showImageInput.value = false;
          dialog.value = true;
          dialogMessage.value = '사진은 3개까지 첨부할 수 있습니다.';
        }
      }
      , {deep: true}
      , {immediate: true}
);

// 첨부할 사진 선택시에 미리보기에 추가해서 제공.
function appendPreviewImg() {
  // 반응형 array와 URL.createObjectUR를 이용한 미리보기 제공.
  newBlobList.value = [];
  if(newimages.value.files.length != 0) {
    for(let imageFile of newimages.value.files) {
      newBlobList.value.push( URL.createObjectURL(imageFile) );
    }
  }
}

// 첨부된 이미지 클릭시에, 바인딩 객체인 images에서 삭제.
function deleteImg(event) {
  if(event.target.dataset.label === 'present') {
    // bloblist에서 해당 index의 데이터를 삭제. -> 바인딩 객체이므로, 미리보기에서도 삭제됨.
    // 수정을 취소하거나 새로고침하면 기존 첨부 데이터들 새롭게 불러옴. 클릭시에 실제로 삭제되는건 X. 최종적으로 '수정'버튼' 클릭될 때 까지 정보를 가지고 있어야함.
    bloblist.value.splice(event.target.dataset.imageIndex, 1);
    deleteInoList.push(event.target.dataset.ino);
  } else if(event.target.dataset.label === 'new') {
    // 새롭게 추가된 이미지를 클릭해서 삭제한 경우에는 newBlobList에서 삭제.
    newBlobList.value.splice(event.target.dataset.newImageIndex, 1);
  }
}

async function handleUpdate() {
  // 필수 입력값인 제목과 사진이 등록되었는지 점검.
  if(board.value.btitle === null || board.value.btitle === 'undefined' || board.value.btitle === '') {
    dialog.value = true;
    dialogMessage.value = '제목을 입력해주세요.';
    return;
  } else if(bloblist.value.length + newBlobList.value.length == 0) {
    dialog.value = true;
    dialogMessage.value = '사진을 등록해주세요.';
    return;
  }

  // board.value.mid = store.state.userId;
  board.value.bno = bno;
  if(deleteInoList.length > 0) {
    board.value.deleteInoList = deleteInoList;
  }
  const multipartFormData = new FormData();
  multipartFormData.append('board'
                          , new Blob([JSON.stringify(board.value)]
                          , {type: "application/json"})
  );
  if(newimages.value.files.length != 0) {
  // if(newimages.value.files.length > 0) {
    // let imagesArray = [];
    for(let i=0; i<newimages.value.files.length; i++) {
      // imagesArray.push(newimages.value.files[i]);
      multipartFormData.append('imagesArray', newimages.value.files[i]);
    }
    // multipartFormData.append('imagesArray', imagesArray);
  }
  // for(let ino of deleteInoList) {
  //   console.log('typeof(ino) : ' + typeof(ino));
  //   multipartFormData.append('deleteInoList', ino);
  // }
  const result = await apiBoard.updateBoard(multipartFormData);
  console.log('result : ' + result);
  if(result === 'success') {
    router.push(`/board/read?bno=${bno}&hit=false&pageNo=${pageNo}`);
  }
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
  /* flex-grow: 1;
  justify-content: center; */
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 22%;
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
  /* flex-grow: 1; */
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
  margin-top: 1rem;
}
.bottombtn {
  display: flex;
  justify-content: flex-end;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-right: 18%;
}
</style>