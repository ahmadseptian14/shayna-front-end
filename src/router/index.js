import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import Register from  '../views/auth/Register.vue'
import Login from '../views/auth/Login.vue'
import Product from '../views/Product.vue'
import ShoppingCart from '../views/ShoppingCart.vue'
import Success from '../views/Success.vue'
// import { createWebHistory } from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: () => import( /* webpackChunkName: "register" */ '@/views/auth/Register.vue')
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/product/:id',
    props:true,
    name: 'product',
    component: Product
  },
  {
    path: '/cart',
    name: 'cart',
    component: ShoppingCart
  },
  {
    path: '/success',
    name: 'success',
    component: Success
  }
]

const router = new VueRouter({
  // history: createWebHistory(),
  routes
})

export default router
