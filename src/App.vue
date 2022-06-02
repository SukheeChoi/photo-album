<template>
  <nav class="d-flex justify-content-between">
    <div><router-link to="/">Home</router-link> | <router-link to="/board">Board</router-link></div>
    <div>
      <h1>포토 앨범</h1>
    </div>
    <div>
      <router-link to="/auth/join" class="btn btn-info btn-sm mr-2">회원가입</router-link>
      <router-link to="/auth/login" class="btn btn-info btn-sm mr-2">로그인</router-link>
    </div>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
