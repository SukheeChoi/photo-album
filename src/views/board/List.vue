<template>
  <div class="boardList mx-0 px-0" >
    <div class="container-fluid row mx-0">
        <div class="col-2"></div>
        <div class="col-8 row">
          <div class="col-3 divItem pt-2" v-for="n in 12" :key="n">
            <div class="w-100 px-3" style="display: flex; justify-content: center; flex-direction: column;">
              <img src="@/assets/logo.png" class="d-block img" style="object-fit: cover;" alt="..."/>
              <div>
                <dt>제목1</dt>
                <dd>1994-02-26</dd>
              </div>
            </div>
          </div>
          <div class="col-12 d-flex align-content-end justify-content-end">
						<a type="button" class="btn btn-info border pt-1 mt-1" style="font-size: 20px; width: 90px;">글쓰기</a>
					</div>
      </div>
      <div class="col-2"></div>
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


</style>

<style>
  .divItem{
    border-bottom: 2px solid #E2E2E2;
  }
  .img{
    width: 100%; height: auto;
    max-height: 120px;
  }

</style>
