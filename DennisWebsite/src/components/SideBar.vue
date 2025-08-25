<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios';
import bars from '../assets/sidebar.svg'
import note from '../assets/note.svg'
import whiteNote from '../assets/whiteNote.svg'

const isOpen = ref(false)
const noteVisible = ref(true)
const sessions = ref([])
const emit = defineEmits(['toggle', 'session-selected'])
const messages = ref([])
const selectedSessionId = ref(null)

const router = useRouter()

function toggleSidebar() {
    isOpen.value = !isOpen.value
    emit('toggle', isOpen.value)
    noteVisible.value = !noteVisible.value
}

function logout() {
    localStorage.removeItem("userId")
    router.push("/")
}

async function fetchSessions() {
    try {
        const token = localStorage.getItem("token")
        if (!token) {
            console.error("❌ No token found — are you logged in?")
            return
        }

        const response = await axios.get(`https://localhost:7153/api/Chat/sessions/${localStorage.getItem("userId")}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log('📦 API Response:', response.data)
        sessions.value = response.data.reverse()
    } catch (error) {
        console.error('❌ Failed to fetch sessions:', error)
    }
}

async function handleSessionClick(sessionId) {
    console.log(`Session #${sessionId} clicked`)
    selectedSessionId.value = sessionId
    try {
        const token = localStorage.getItem("token")
        if (!token) {
            console.error("❌ No token found — are you logged in?")
            return
        }

        const response = await axios.get(`https://localhost:7153/api/Chat/messages/${sessionId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log(`💬 Messages for session ${sessionId}:`, response.data)
        emit('session-selected', {
            sessionId,
            messages: response.data
        })
    } catch (error) {
        console.error(`❌ Failed to fetch messages for session ${sessionId}:`, error)
    }
}

function startNewChat() {
    selectedSessionId.value = null
    emit('session-selected', {
        sessionId: '',
        messages: []
    })
}
onMounted(fetchSessions)
</script>

<template>
    <div>
        <nav class="navbar">
            <div class="navbar-content">
                <ul class="navbar-left">
                    <li>
                        <div class="burger-menu" @click="toggleSidebar">
                            <img :src="bars" alt="Bars icon" />
                        </div>
                    </li>
                    <li>
                        <div v-if="noteVisible" class="new-chat" @click="startNewChat">
                            <img :src="whiteNote" alt="Note icon" />
                        </div>
                    </li>
                </ul>
                <ul class="navbar-right">
                    <li class="logout-btn" @click="logout">Logout</li>
                </ul>
            </div>
        </nav>

        <div :class="['sidebar', { open: isOpen }]">
            <div class="new-chat">
                <img :src="note" alt="Note icon" />
                <a @click.prevent="startNewChat">New Chat</a>
            </div>
            <h3>Chats</h3>
            <ul>
                <li v-for="session in sessions" :key="session.sessionId"
                    :class="{ active: selectedSessionId === session.sessionId }">
                    <a @click="handleSessionClick(session.sessionId)">
                        {{ session.title }}
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: linear-gradient(to right,
            rgba(133, 67, 232, 0.67),
            rgba(0, 112, 240, 0.58),
            rgba(68, 213, 208, 0.54));
    display: flex;
    align-items: center;
    z-index: 1003;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 0 16px;
}

.navbar-content ul {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.burger-menu {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.new-chat {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
}

img {
    width: 24px;
    height: 24px;
}

.burger-menu img {
    width: 24px;
    height: 24px;
}

.sidebar {
    position: fixed;
    top: 0;
    left: -260px;
    width: 260px;
    height: 100vh;
    color: black;
    padding: 5rem 20px 20px 20px;
    transition: left 0.3s ease;
    z-index: 1002;
    overflow-y: auto;
    border-right: 2px solid rgba(187, 188, 190, 25%);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    scrollbar-width: none;
}

.sidebar.open {
    left: 0;
}

.sidebar h2 {
    margin-top: 0;
    font-size: 1.25rem;
}

.sidebar ul,
.navbar ul {
    list-style: none;
    padding: 0;
}

.sidebar li {
    margin-bottom: 0.75rem;
    border-radius: 10px;
    background-color: rgba(187, 188, 190, 25%);
    padding: 0.5rem 1rem;
}

.sidebar li.active {
    background-color: rgba(133, 67, 232, 26%);
}

.sidebar a {
    color: #000000;
    text-decoration: none;
}

.sidebar a:hover {
    background-color: hsla(0, 0%, 0%, 0);
    text-decoration: underline;
    cursor: pointer;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
}

.navbar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.navbar-left,
.navbar-right {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.logout-btn {
    cursor: pointer;
    color: white;
    font-weight: 600;
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.15);
    transition: background 0.2s;
}

.logout-btn:hover {
    background: rgba(255, 255, 255, 0.3);
}
</style>