import {createRouter, createWebHistory} from 'vue-router'

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
      path: '/home',
      name: 'home',
      redirect: '/home/edit',
      component: () => import("@/views/home/Home.vue"),
      children: [
        {
          path: '/home/edit',
          name: 'home-edit',
          component: () => import("@/views/edit/EditView.vue")
        }
      ]
    }
  ],
})

router.beforeEach((to, _from) => {
  if (to.name !== 'sign-in' && to.name !== 'sign-up' && !localStorage.getItem('token')) {
    return {name: 'sign-in'}
  }
  return true
})


export default router
