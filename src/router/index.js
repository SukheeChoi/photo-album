import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import board from '@/router/board'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/board',
    name: 'board',
    component: () => import(/* webpackChunkName: "board" */ '../views/BoardView.vue'),
    children: [
      ...board
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
