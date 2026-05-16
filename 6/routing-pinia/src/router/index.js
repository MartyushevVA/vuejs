import { createRouter, createWebHistory } from 'vue-router'
import HomeView          from '../views/HomeView.vue'
import AddView           from '../views/AddView.vue'
import TaskView          from '../views/TaskView.vue'
import TaskDeleteView    from '../views/TaskDeleteView.vue'
import TaskCompleteView  from '../views/TaskCompleteView.vue'
import AboutView         from '../views/AboutView.vue'

const routes = [
  { path: '/',                    component: HomeView },
  { path: '/add',                 component: AddView },
  { path: '/task/:id',            component: TaskView },
  { path: '/task/:id/delete',     component: TaskDeleteView },
  { path: '/task/:id/complete',   component: TaskCompleteView },
  { path: '/about',               component: AboutView },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})