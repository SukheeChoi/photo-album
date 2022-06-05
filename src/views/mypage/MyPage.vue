<template>
  <div>
    <div class="mypage col-8">
      <div class="mypagetitle">마이페이지</div>
      <hr />
      <div>
        <div class="myinfo">이름 :</div>
        <div class="myinfo">이메일 :</div>
      </div>
      <hr />

      <div class="subtitle">내가 작성한 게시글</div>
      <div>
        <div class="row">
          <div class="col-3 divItem pt-2" v-for="n in 8" :key="n">
            <div class="w-100 px-3" style="display: flex; justify-content: center; flex-direction: column">
              <img src="@/assets/logo.png" class="d-block img" style="object-fit: cover" alt="..." />
              <div>
                <dt>제목1</dt>
                <dd>1994-02-26</dd>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-3">
          <router-link to="/board/writeform" class="writebtn">글쓰기</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.mypage {
  position: static;
  margin: 2em auto;
  border-radius: 1em;
  padding: 1.5em;
}

.mypagetitle {
  text-align: center;
  font-size: 2.5em;
  font-weight: 400;
}

.myinfo {
  font-size: 1.2em;
}

.subtitle {
  font-size: 1.5em;
}

divItem {
  border-bottom: 2px solid #e2e2e2;
}
.img {
  width: 100%;
  height: auto;
  max-height: 120px;
}

.writebtn {
  background-color: #a6a6a6;
  color: white;
  padding: 0.4em;
  border-radius: 0.3em;
  font-size: 1.2em;
}
</style>
