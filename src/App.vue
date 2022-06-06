<template>
  <div id="app" class="d-flex flex-column vh-100">
    <AppHeader />
  </div>
</template>

<script setup>
import AppHeader from "./components/AppHeader.vue";
import { useStore } from "vuex";

const store = useStore();
store.dispatch("loadAuth");
</script>