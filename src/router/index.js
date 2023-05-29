import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        pageTitle: 'Home',
        breadcrumb: [
          {
            text: 'Home',
            active: true,
          },
        ],
        middleWare: ['superAdmin','humanResource']
      },
    },
    {
      path: '/second-page',
      name: 'second-page',
      component: () => import('@/views/SecondPage.vue'),
      meta: {
        pageTitle: 'Second Page',
        breadcrumb: [
          {
            text: 'Second Page',
            active: true,
          },
        ],
        middleWare: ['humanResource']
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/Login.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: 'unauthantication',
      name: 'unauthantication',
      component: () => import('@/views/error/UnAuthantication.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

router.beforeEach((to,from,next) => {
  let isLoginUser = store.state.app.token;
  console.log(isLoginUser);
  if(to.name !='login') {
    if(isLoginUser) {
      let currentUser = store.state.app.userData;
      console.log("Current User::",currentUser.role);
      if(to.meta && to.meta.middleWare && !to.meta.middleWare.includes(currentUser.role)) {
        next({name:'unauthantication'});
      }
      else {
       next();
      }
    }
    else {
      next({name:'login'});
    }
  }
  next();
})

export default router
