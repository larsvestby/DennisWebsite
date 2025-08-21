<script setup>
import ChatPage from '../components/ChatPage.vue'
import WelcomePage from './WelcomePage.vue'
import GradientText from '../components/GradientText.vue'
import arrow from '../assets/sendArrow.svg'

import { useRouter } from 'vue-router'
import { onMounted, onBeforeUnmount, ref } from 'vue'

const router = useRouter()

const goToChat = () => {
    router.push('/chat')
}

const goToHome = () => {
    router.push('/')
}

const goToLearnMore = () => {
    router.push('/learn-more')
}

const goToLogin = () => {
    router.push('/login')
}

const smallChatInput = ref('')
const loading = ref(false)

const handleSend = () => {
    if (!smallChatInput.value.trim()) return

    router.push({
        path: '/chat',
        query: { msg: smallChatInput.value }
    })
}

function adjustLetterSpacing() {
    const container = document.querySelector(".welcome-text h1")
    const text = document.querySelector("#dynamic-text")

    if (!container || !text) return

    text.style.letterSpacing = "0px"

    const containerWidth = container.clientWidth
    const textWidth = text.scrollWidth
    const charCount = text.textContent.length

    if (charCount <= 1) return

    const extraSpace = containerWidth - textWidth
    const spacing = extraSpace / (charCount - 1)

    text.style.letterSpacing = spacing + "px"
}

onMounted(() => {
    adjustLetterSpacing()
    window.addEventListener("resize", adjustLetterSpacing)
})

onBeforeUnmount(() => {
    window.removeEventListener("resize", adjustLetterSpacing)
})
</script>

<template>
    <div class="wrapper">
        <div class="welcome-text">
            <h1>
                Meet
                <GradientText text="Dennis AI" />,<br>
                An
                <GradientText text="AI" /> With<br>
                <GradientText text="Multiple" style="font-size: 8rem;" /><br>
                <span id="dynamic-text">Personalities</span>
            </h1>
            <p>Experience the AI that changes it's personality with<br> every response, creating a unique and
                unpredictable<br>conversation every time.</p>
            <div class="button-wrapper">
                <button @click="goToChat">Get started</button>
                <button class="grey" @click="goToLearnMore">Learn more</button>
                <button class="grey" @click="goToLogin">Login</button>
            </div>
        </div>
        <div class="small-chat">
            <div class="chat-title">Chat with Dennis</div>
            <div class="chat-message">
                Hello! I'm Dennis, my personality shifts with every response.<br />
                Ask me anything!
            </div>
            <div class="row-wrapper">
                <input v-model="smallChatInput" class="chat-input" placeholder="Send a message..." />
                <button @click="handleSend" :disabled="loading">
                    <img v-if="!loading" :src="arrow" alt="Send" class="send-icon" />
                    <span v-else>...</span>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
#dynamic-text {
    display: inline-block;
    white-space: nowrap;
}

.wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 5rem;
}

.button-wrapper {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    margin: auto;
    margin-top: 1rem;
}

button {
    padding: 1rem 3.5rem;
    background-color: rgb(132, 83, 232);
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    opacity: 50%;
}

button:hover {
    opacity: 80%;
}

Button.grey {
    background-color: rgb(137, 133, 150);
}

p {
    font-size: 1.2rem;
    margin-top: 0.5rem;
}

h1 {
    font-size: clamp(3rem, 10vmin, 8rem);
    line-height: 1;
    margin: 0;
}

.welcome-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
}

.small-chat {
    height: 100%;
    width: 100%;
    background-color: white;
    border-radius: 1rem;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.5);
    position: relative;
    overflow: hidden;
}

.chat-title {
    background: linear-gradient(to right,
            rgba(133, 67, 232, 0.67),
            rgba(0, 112, 240, 0.58),
            rgba(68, 213, 208, 0.54));
    padding: 0.75rem 1rem;
    font-weight: bold;
    color: white;
    font-size: 1.2rem;
}

.chat-message {
    display: inline-flex;
    padding: 1rem;
    margin: 1rem;
    font-size: 1rem;
    border-radius: 1rem;
    color: white;
    background: linear-gradient(to right,
            rgba(133, 67, 232, 0.67),
            rgba(0, 112, 240, 0.58),
            rgba(68, 213, 208, 0.54));
}

.row-wrapper {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.chat-input {
    flex: 1;
    padding: 1rem;
    border-radius: 1rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
}

.row-wrapper button {
    padding: 0.8rem 1.5rem;
    border-radius: 1rem;
    background: linear-gradient(to right,
            rgb(133, 67, 232),
            rgb(0, 112, 240),
            rgb(68, 213, 208));
    color: white;
    border: none;
    cursor: pointer;
}

.send-icon {
    width: 1.25rem;
    height: 1.25rem;
}
</style>