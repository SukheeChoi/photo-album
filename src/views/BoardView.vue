<template>
  <div class="board">
    <router-view class="mx-5"></router-view>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function login() {
  router.push("/board/list");
}
</script>
<style scoped>
  h1 {
    text-align: center;
  }
</style>

