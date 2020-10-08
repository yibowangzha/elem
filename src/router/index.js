import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home   // 城市列表页面
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ()=> {  // 路由懒加载
      return import(/* webpackChunkName: "about" */ '../views/Login.vue')
    }
  },
  {
    path: '/Search',
    name: 'Search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ()=> {  // 路由懒加载
      return import(/* webpackChunkName: "about" */ '../views/Search.vue')
    }
  },
  {
    path: '/Index',
    name: 'Index',
    component: ()=> {  // 路由懒加载
      return import(/* webpackChunkName: "about" */ '../views/Index.vue')
    },
    redirect: '/My',
    children:[
      {
        path: '/My',
        name: 'My',
        component: ()=> {  // 路由懒加载
          return import(/* webpackChunkName: "about" */ '../views/My.vue')
        },
      },
      {
        path: '/Dingdan',
        name: 'Dingdan',
        component: ()=> {  // 路由懒加载
          return import(/* webpackChunkName: "about" */ '../views/Dingdan.vue')
        },
      },
      {
        path: '/Sousuo',
        name: 'Sousuo',
        component: ()=> {  // 路由懒加载
          return import(/* webpackChunkName: "about" */ '../views/Sousuo.vue')
        },
      },
      {
        path: '/Waimai',
        name: 'Waimai',
        component: ()=> {  // 路由懒加载
          return import(/* webpackChunkName: "about" */ '../views/Waimai.vue')
        },
      }
    ]
  },
  {
    path: '/:id',
    name: 'Home',
    component: Home   // 城市列表页面
  },
]

const router = new VueRouter({
  routes
})

export default router
