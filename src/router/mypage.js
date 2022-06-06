export default [
  {
    path: "/mypage",
    component: () => import(/* webpackChunkName: "auth" */ "../views/mypage/MyPage.vue"),
  }
]