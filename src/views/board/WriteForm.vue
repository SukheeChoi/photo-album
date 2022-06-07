<template>
  <div class="container2 d-flex">
    <div class="whitespace flex-fill"></div>
    <div class="center flex-fill">
      <div class="writeFormHeader">
        게시글 작성
      </div>
      <form v-if="board" v-on:submit.prevent="handleAdd" class="writeform">
        <div class="titlebox">
          <div class="title">
            제목
          </div>
          <input type="text" class="titleinput form-control" placeholder="글 제목을 입력하세요." v-model="board.btitle" required />
        </div>
        <div class="imagebox">
          <input type="file" id="files" class="form-control-file mb-2" @change="previewImg" ref="images" multiple required />
          <div class="imagethumbnail">
            <div v-for="(blob, index) in bloblist" :key="index">
              <img class="singleimg" :src="blob" />
            </div>
          </div>
        </div>
        <div class="memocontainer">
          <input type="text" class="memoinput form-control" placeholder="메모할 내용을 입력하세요." v-model="board.bmemo"/>
        </div>

        <div class="bottombtn">
          <router-link :to="`/board/list?pageNo=${pageNo}`" class="btn btn-primary btn-sm mr-1">취소</router-link>
          <input type="submit" class="btn btn-primary btn-sm" value="저장"/>
        </div>
      </form>

    </div>
    <div class="whitespace flex-fill"></div>
    
    <AlertDialog v-if="dialog" :message="dialogMessage" @close="dialog = false" />
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import apiBoard from '@/apis/board';
import AlertDialog from "@/components/AlertDialog.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();
let pageNo = route.query.pageNo;
if (pageNo === "undefined") {
  pageNo = 1;
}
const board = reactive({
  btitle: ''
  , bmemo: ''
  , mid: store.state.userId
});

const images = ref(document.getElementById('files'));
// const images = ref(null);
const bloblist = ref([]);
const dialog = ref(false);
const dialogMessage = ref('');

// 사용자가 input태그로 파일 선택시에, 선택된 파일의 갯수 점검.(3개까지 가능.)
// const computedImageNum = computed({
//   get() {
//     if(images.value !== null ){
//       console.log('images.value.files.length : ' + images.value.files.length);
//       return images.value.files.length;
//     } else {
//       return null;
//     }
//   }
//   , set(val) {
//       const a = val;
//       console.log('val : ' + val);
//   }
// });
// const computedImageNum = computed(() => {
//   console.log('computed()');
//   if(images.value !== null) {
//     console.log('images.value.files.length : ' + images.value.files.length);
//     const fileLength = images.value.files.length;
//     return fileLength;
//   }
//   return null;
// });

// watch(
//   () => images.value.files
//   , (newImages, oldImages) => {
//     console.log('///');
//     console.log('watch - newImages : ' + newImages);
//   }
//   , {deep: true}
// );
// watch(images
//   , (newImages, oldImages) => {
//     console.log('watch - newImages : ' + newImages);
//     console.log('watch - newImages.value : ' + newImages.value);
//     console.log('watch - newImages.files.length : ' + newImages.files.length);
//   }
//   , {deep: true}
// );

async function handleAdd() {
  // 제목 작성여부 확인.
  if(board.btitle === null || board.value.btitle === 'undefined' || board.btitle === '') {
    dialog.value = true;
    dialogMessage.value = '제목을 작성해주세요.';
  }

  // 선택한 첨부파일 개수확인.
  let imglength = images.value.files.length;
  console.log('imglength');
  if(imglength < 4) {
    const multipartFormData = new FormData();
    multipartFormData.append('btitle', board.btitle);
    multipartFormData.append('bmemo', board.bmemo);
    multipartFormData.append('mid', store.state.userId);
    for(let i=0; i<images.value.files.length; i++) {
      multipartFormData.append('imagesArray', images.value.files[i]);
    }
    console.log('multipartFormData : ' + multipartFormData);
    const response = await apiBoard.createBoard(multipartFormData);
    console.log(response)
    if(response.result === 'success') {
      router.push(`/board/read?bno=${parseInt(response.bno)}&hit=false&pageNo=${pageNo}`);
    }
  } else {
    dialog.value = true;
    dialogMessage.value = '첨부파일은 최대 3개까지 첨부 가능합니다.';
  }

}

// watch(images.value
//     , (newImages, oldImages) => {
//     console.log('watch()');
//     }
//     // , {deep: true}
// );

// 첨부할 사진 선택시에 미리보기 제공.
function previewImg(event) {
  // 반응형 array와 URL.createObjectUR를 이용한 미리보기 제공.
  bloblist.value = [];
  for(let imageFile of images.value.files) {
    bloblist.value.push( URL.createObjectURL(imageFile) );
  }

  // 선택된 총 사진 갯수 점검해서, 초과분의 뒷부분은 제거.
  if(images.value.files.length > 3) {
    let overZero = images.value.files.length;
    console.log('before - event.target.files.length : ' + event.target.files.length);
    console.log('before - event.target.files[0] : ' + event.target.files[0]);
    event.target.value = '';
    console.log('after - event.target.files.length : ' + event.target.files.length);
    // 미리보기도 제거.
    for(let i=0; i<overZero; i++) {
      console.log('bloblist.value.length : ' + bloblist.value.length);
      bloblist.value.pop();
    }
    dialog.value = true;
    dialogMessage.value = '첨부파일은 최대 3개까지 첨부 가능합니다.';
  }

  // FileReader()를 이용한 미리보기 제공.
  // if(images.value.files.length !== 0) {
  //   console.log('images.value.files.length !== 0');
  //   for(let i=0; i<images.value.files.length; i++) {
  //     var reader = new FileReader();
  //     reader.onload = function(event) {
  //       let imgtag = document.getElementById(`img${i+1}`);
  //       imgtag.src = event.target.result;
  //       imgtag.style.visibility = 'visible';
  //     };
  //     reader.readAsDataURL(images.value.files[i]);
  //   }
  // }
}
// onMounted(() => {
//   console.log('onMounted()');
//   console.log('onMounted() - images.value.files : ' + images.value.files);
//   console.log('onMounted() - images.value.files.length : ' + images.value.files.length);
//   // function previewImg() {
//   //   console.log('onMounted() - previewImg()');
//   //   console.log('onMounted() - previewImg() - images.value.files : ' + images.value.files);
//   //   console.log('onMounted() - previewImg() - images.value.files.length : ' + images.value.files.length);
//   //   if(images.value.files.length != 0) {
//   //     for(let i; i<images.value.files.length; i++) {
//   //       // let html = `<img class="singleimg" src="{URL.createObjectURL(images.value.files[i])}" />`;
//   //       // this.$refs.imagethumbnail.innerHtml(html);
//   //       let targetRef = `img{i}`;
//   //       console.log('targetRef : ' + targetRef);
//   //       img1.value = URL.createObjectURL(images.value.files[i]);
//   //       // this.$refs.targetRef.src = URL.createObjectURL(images.value.files[i]);
//   //     }
//   //   } else {
//   //     // battach.value = null;
//   //   }
//   // }

//   watch(images, (newImages, oldImages) => {
//         console.log('watch() - images.value.files.item.length : ');
//         console.log(images.value.files.item.length);
//         // for(let i; i<newImages.value.files.length; i++) {
//         // //  let html = `<img class="singleimg" src="{URL.createObjectURL(images.value.files[i])}" />`;
//         //   let targetRef = `img{i}`;
//         //   console.log('targetRef : ' + targetRef);
//         //   this.$refs.targetRef.src = URL.createObjectURL(images.value.files[i]);
//         // }
//       }
//       , {deep: true}
//   );

// });


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
  background-size: cover;
  /* visibility: hidden; */
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