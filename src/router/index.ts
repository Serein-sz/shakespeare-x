import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/edit'
    },
    {
      path: '/edit',
      name: 'edit',
      component: () => import("@/views/edit/EditView.vue")
    }
  ],
})

export default router
