import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from '../components/WelcomePage.vue'
import ChatPage from '../components/ChatPage.vue'
import LearnMorePage from '../components/LearnMorePage.vue'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: WelcomePage
  },
  {
    path: '/chat',
    name: 'Chat',
    component: ChatPage
  },
  {
    path: '/learn-more',
    name: 'LearnMore',
    component: LearnMorePage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router