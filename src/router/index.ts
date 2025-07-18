import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/sign'
    },
    {
      path: '/sign',
      name: 'sign',
      redirect: '/sign/in',
      component: () => import("@/views/auth/SignPage.vue"),
      children: [
        {
          path: '/sign/in',
          name: 'sign-in',
          component: () => import("@/views/auth/SignIn.vue")
        },
        {
          path: '/sign/up',
          name: 'sign-up',
          component: () => import("@/views/auth/SignUp.vue")
        }
      ]
    },
    {
      path: '/edit',
      name: 'edit',
      component: () => import("@/views/edit/EditView.vue")
    }
  ],
})

export default router
