import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home/home.vue'

const files = import.meta.globEager('../views/**/route.js')
const routes = [
  { path: '/', component: Home },
]

Reflect.ownKeys(files).forEach((key) => {
  import(/* @vite-ignore */ key).then(res => {
    const route = res.default
    router.addRoute({ path: route.path, name: route.name, component: route.component, children: route.children })
  })
})

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
