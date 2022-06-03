<template>
  <div>
    <div>
      <div class="form">
        <div class="logintitle">로그인</div>
        <div>
          <input type="text" class="form-control" id="userId" placeholder="아이디" v-model="user.id" />
          <input type="password" class="form-control" placeholder="비밀번호" v-model="user.password" />

          <!-- <c:if test="${error != null}">
              <small style="color: red" id="loginError">${error}</small>
            </c:if> -->
          <button class="loginbutton" @click="handleLogin">로그인</button>
        </div>
      </div>
      <AlertDialog v-if="alertDialog" :message="alertDialogMessage" :loading="loading" @close="alertDialog = false" />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import auth from "@/apis/auth";
import AlertDialog from "@/components/AlertDialog.vue";

const router = useRouter();

const alertDialog = ref(false);
const alertDialogMessage = ref("");
const loading = ref(false);

const user = reactive({
  id: "user",
  password: "12345",
});

async function handleLogin() {
  alertDialog.value = true;
  loading.value = true;

  const result = await auth.login(user);

  if (result === "success") {
    alertDialog.value = false;
    router.push("/board/list");
  } else if (result === "fail-401") {
    alertDialogMessage.value = "로그인 실패: 아이디 또는 패스워드가 일치하지 않습니다";
  } else {
    alertDialogMessage.value = "로그인 실패: 네트워크 에러";
  }

  loading.value = false;
}
</script>

<style scoped>
.form {
  /* position: relative; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 1em;
  width: 28em;
  padding: 1.5em;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.8);
}

.logintitle {
  text-align: center;
  font-size: 2.5em;
  font-weight: 400;
}

.form-control {
  height: 2.5em;
  box-sizing: border-box;
  border-style: none;
  border: 0.08em solid rgb(72, 72, 72);
  font-size: 1.1em;
  margin: 1em 0;
}

.loginbutton {
  border: none;
  color: black;
  width: 100%;
  height: 2.5em;
  font-size: 1.2em;
  border-radius: 0.5em;
  cursor: pointer;
}
</style>
