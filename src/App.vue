<template>
  <nav>
    <div class="row">
      <div class="col-2"></div>
      <div class="col-8" style="text-align: center">
        <router-link to="/" class="main">Photo Album</router-link>
      </div>
      <div class="col-2" style="text-align: end">
        <router-link to="/auth/join" class="headerbtn">회원가입</router-link>
        <router-link to="/auth/login" class="headerbtn">로그인</router-link>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<style>
.main {
  text-decoration: none;
  color: black;
  font-size: 3em;
}

.main:hover {
  text-decoration: none;
  color: black;
}

.headerbtn {
  color: black;
  font-weight: 500;
  font-size: 1em;
  margin: auto 1em;
  text-align: right;
}

.headerbtn:hover {
  color: black;
  font-weight: 700;
  text-decoration: underline;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 0;
  padding: 2em 1em 1em 1em;
  border-bottom: 0.1em solid black;
}

/* nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
