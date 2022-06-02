<!-- <template>
  <div class="card">
    <div class="card-header">로그인</div>
    <div class="card-body">
      <div v-if="store.state.userId === ''">
        <div class="form-group">
          <label class="form-label">User ID</label>
          <input type="text" class="form-control" id="userId" v-model="user.id" />
        </div>
        <div class="form-group">
          <label for="userPassword" class="col-form-label">User Password</label>
          <input type="text" class="form-control" v-model="user.password" />
        </div>
        <button class="btn btn-info btn-sm" v-on:click="handleLogin()">로그인</button>
      </div>

      <div v-if="store.state.userId !== ''">
        <button class="btn btn-info btn-sm mr-2" v-on:click="handleLogout()">로그아웃</button>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style> -->

<template>
  <div>
    <div>
      <div>
        <form class="form" method="post" action="${pageContext.request.contextPath}/user/login">
          <div class="logintitle">로그인</div>
          <div>
            <!-- <input type="text" name="mid" id="mid" class="form-control" placeholder="아이디" v-model="user.id"/><br />
            <input type="password" name="mpassword" id="mpassword" class="form-control" placeholder="비밀번호" v-model="user.password"/><br /> -->
            <input type="text" name="mid" id="mid" class="form-control" placeholder="아이디" /><br />
            <input type="password" name="mpassword" id="mpassword" class="form-control" placeholder="비밀번호" /><br />
            <!-- <c:if test="${error != null}">
              <small style="color: red" id="loginError">${error}</small>
            </c:if> -->
            <!-- <input type="submit" class="loginbutton" value="로그인" /> -->
            <button class="loginbutton" @click="handlelogin()">로그인</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
function handleLogin() {}
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
  /* border-radius: 0; */
  /* border-bottom: 0.08em solid rgb(72, 72, 72); */
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
