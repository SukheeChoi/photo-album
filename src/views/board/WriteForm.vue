<template>
  <div class="container2 d-flex">
    <div class="whitespace flex-fill"></div>
    <div class="center flex-fill line">
      <div class="writeFormHeader">
        게시글 작성
      </div>
      <div class="writeform">
        <div class="titlebox">
          <div class="title">
            제목
          </div>
          <input class="titleinput" type="text" placeholder="글 제목을 입력하세요." />
        </div>
        <div class="imagebox">
          <button class="btn btn-primary btn-sm">사진첨부</button>
          <div class="imagethumbnail">
            <img class="singleimg" src="@/assets/logo.png" />
            <img class="singleimg" src="@/assets/logo.png" />
            <img class="singleimg" src="@/assets/logo.png" />
          </div>
        </div>
        <div class="memocontainer">
          <input class="memoinput" type="text" placeholder="메모할 내용을 입력하세요." />
        </div>
      </div>
      <div class="bottombtn">
        <button class="btn btn-primary btn-sm mr-1">취소</button>
        <button class="btn btn-primary btn-sm">저장</button>
      </div>
    </div>
    <div class="whitespace flex-fill"></div>
    
  </div>
</template>

<script setup>
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
  width: 30rem;
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
  margin-left: 2%;
}
.memoinput {
  width: 30rem;
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