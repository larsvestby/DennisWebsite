import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from '../components/WelcomePage.vue'
import ChatPage from '../components/ChatPage.vue'
import LearnMorePage from '../components/LearnMorePage.vue'
import LoginPage from '../components/LoginPage.vue'
import RegisterPage from '../components/RegisterPage.vue'

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
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router