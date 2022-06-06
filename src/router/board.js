export default [
  {
    path: "/board/list",
    component: () => import(/* webpackChunkName: "board" */ "../views/board/List.vue"),
  },
  {
    path: "/board/writeform",
    component: () => import(/* webpackChunkName: "board" */ "../views/board/WriteForm.vue"),
  },
  {
    path: "/board/read",
    component: () => import(/* webpackChunkName: "board" */ "../views/board/Read.vue"),
  },
  {
    path: "/board/updateform",
    component: () => import(/* webpackChunkName: "board" */ "../views/board/UpdateForm.vue"),
  },
  {
    path: "/auth/join",
    component: () => import(/* webpackChunkName: "auth" */ "../views/auth/Join.vue"),
  },
  {
    path: "/auth/login",
    component: () => import(/* webpackChunkName: "auth" */ "../views/auth/Login.vue"),
  },
  {
    path: "/mypage/mypage",
    component: () => import(/* webpackChunkName: "auth" */ "../views/mypage/MyPage.vue"),
  },
]