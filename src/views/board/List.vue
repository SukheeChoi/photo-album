<template>
  <div class="boardList">
    <div class="container">
      <ul>
        <li class="col-xs-12 col-sm-6 col-md-3">
          <div>
            <img alt="Vue logo" src="@/assets/logo.png" width="150" />
            <dl>
              <dt>제목1</dt>
              <dd>1994-02-26</dd>
            </dl>
          </div>
        </li>
        <li class="col-xs-12 col-sm-6 col-md-3">
          <div>
            <img alt="Vue logo" src="@/assets/logo.png" width="150" />
            <dl>
              <dt>제목2</dt>
              <dd>1994-02-26</dd>
            </dl>
          </div>
        </li>
        <li class="col-xs-12 col-sm-6 col-md-3">
          <div>
            <img alt="Vue logo" src="@/assets/logo.png" width="150" />
            <dl>
              <dt>제목3</dt>
              <dd>1994-02-26</dd>
            </dl>
          </div>
        </li>
        <li class="col-xs-12 col-sm-6 col-md-3">
          <div>
            <img alt="Vue logo" src="@/assets/logo.png" width="150" />
            <dl>
              <dt>제목4</dt>
              <dd>1994-02-26</dd>
            </dl>
          </div>
        </li>
        <li class="col-xs-12 col-sm-6 col-md-3">
          <div>
            <img alt="Vue logo" src="@/assets/logo.png" width="150" />
            <dl>
              <dt>제목5</dt>
              <dd>1994-02-26</dd>
            </dl>
          </div>
        </li>
        <li class="col-xs-12 col-sm-6 col-md-3">
          <div>
            <img alt="Vue logo" src="@/assets/logo.png" width="150" />
            <dl>
              <dt>제목1</dt>
              <dd>1994-02-26</dd>
            </dl>
          </div>
        </li>
        <li class="col-xs-12 col-sm-6 col-md-3">
          <div>
            <img alt="Vue logo" src="@/assets/logo.png" width="150" />
            <dl>
              <dt>제목2</dt>
              <dd>1994-02-26</dd>
            </dl>
          </div>
        </li>
        <li class="col-xs-12 col-sm-6 col-md-3">
          <div>
            <img alt="Vue logo" src="@/assets/logo.png" width="150" />
            <dl>
              <dt>제목3</dt>
              <dd>1994-02-26</dd>
            </dl>
          </div>
        </li>
        <li class="col-xs-12 col-sm-6 col-md-3">
          <div>
            <img alt="Vue logo" src="@/assets/logo.png" width="150" />
            <dl>
              <dt>제목4</dt>
              <dd>1994-02-26</dd>
            </dl>
          </div>
        </li>
        <li class="col-xs-12 col-sm-6 col-md-3">
          <div>
            <img alt="Vue logo" src="@/assets/logo.png" width="150" />
            <dl>
              <dt>제목5</dt>
              <dd>1994-02-26</dd>
            </dl>
          </div>
        </li>
      </ul>
      <div class="d-flex">
        <button>글 작성</button>
      </div>
    </div>
    <ul class="pagination d-flex justify-content-center">
      <li class="page-item"><a class="page-link" href="#">Previous</a></li>
      <li class="page-item"><a class="page-link" href="#">1</a></li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item"><a class="page-link" href="#">Next</a></li>
    </ul>
  </div>
</template>

<script setup>
import apiBoard from "@/apis/board";
import { ref } from "vue";

const page = ref(null);

async function getBoardList(pageNo) {
  const result = await apiBoard.getBoardList(pageNo);
  console.log(result);
  // page.value = result;
}

getBoardList(1);
</script>

<style scoped>
ul {
  list-style: none;
}

li {
  display: inline-block;
}

.pagination {
}
</style>
