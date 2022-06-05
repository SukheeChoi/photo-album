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
          <input type="text" class="titleinput form-control" placeholder="글 제목을 입력하세요." v-model="board.btitle"/>
        </div>
        <div class="imagebox">
          <input type="file" class="form-control-file mb-2" @change="previewImg" ref="images" multiple/>
          <div class="imagethumbnail">
            <!-- <img class="singleimg" :src="" /> -->
            <!-- <img class="singleimg" id="img1"/>
            <img class="singleimg" id="img2" />
            <img class="singleimg" id="img3" /> -->
            <div v-for="(blob, index) in bloblist" :key="index">
              <img class="singleimg" :src="blob" />
            </div>
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
import { onMounted, reactive, ref, watch, watchEffect } from 'vue';
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
const bloblist = ref([]);

async function handleAdd() {
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
    await apiBoard.createBoard(multipartFormData);
    router.push('/board/list');
  } else {
    alert('첨부파일은 최대 3개까지 첨부 가능합니다.');
  }

}

// 취소 버튼 클릭시에, 목록화면으로 이동.// pager 넘기기~~~~~~~
function handleCancel() {
  router.push('/board/list');
}

// watch(images.value
//     , (newImages, oldImages) => {
//     console.log('watch()');
//     }
//     // , {deep: true}
// );

// 첨부할 사진 선택시에 미리보기 제공.
function previewImg() {
  // 반응형 array와 URL.createObjectUR를 이용한 미리보기 제공.
  bloblist.value = [];
  for(let imageFile of images.value.files) {
    bloblist.value.push( URL.createObjectURL(imageFile) );
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
  background-size: cover;
  /* visibility: hidden; */
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