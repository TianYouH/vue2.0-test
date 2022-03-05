import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/home-view'
import Welcome from '../views/home-view/page/Welcome.vue'
import TodoView from '../views/todo-view'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'welcome',
        component: Welcome
      },
      {
        path: '/vue/lifecycle',
        name: 'lifecycle',
        component: () => import(/* webpackChunkName: "home" */ '../views/home-view/page/lifecycle'),
      },
      {
        path: '/vue/custom-v-model',
        name: 'customVModel',
        component: () => import(/* webpackChunkName: "home" */ '../views/home-view/page/CustomVModel.vue'),
      },
      {
        path: '/webapi/drop',
        name: 'drop',
        component: () => import(/* webpackChunkName: "home" */ '../views/home-view/page/Drop.vue'),
      },
      {
        path: '/plug-in/clodop',
        name: 'clodop',
        component: () => import(/* webpackChunkName: "home" */ '../views/home-view/page/c-lodop'),
      },
    ]
  },
  {
    path: '/todo',
    name: 'todo',
    component: TodoView
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
