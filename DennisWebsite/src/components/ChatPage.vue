<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ChatInput from './ChatInput.vue'
import ChatBox from './ChatBox.vue'
import SideBar from './SideBar.vue'
import ScrollBar from './ScrollBar.vue'

const route = useRoute()

const sessionId = ref('')
const userInput = ref('')
const streamingText = ref('')
const loading = ref(false)
const messages = ref([])
const sidebarOpen = ref(false)

const handleSidebarToggle = (state) => {
  sidebarOpen.value = state
}

const sendMessage = async () => {
  if (!userInput.value) {
    alert('You literally have to write something.')
    return
  }

  loading.value = true
  streamingText.value = ''

  messages.value.push({
    role: 'user',
    content: userInput.value,
    timestamp: new Date().toISOString()
  })

  try {
    const res = await fetch('https://localhost:7153/api/Chat/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: sessionId.value,
        userInput: userInput.value,
      }),
    })

    if (!res.ok) throw new Error('Of course it failed. Why wouldn’t it?')

    const reader = res.body.getReader()
    const decoder = new TextDecoder('utf-8')

    let fullResponse = ''
    let skipChunks = 2
    let isFirstChunk = true

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value, { stream: true })
      const lines = chunk.split('\n\n').filter(Boolean)

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const payload = line.slice(6)

          try {
            const parsed = JSON.parse(payload)
            if (parsed.sessionId) {
              sessionId.value = parsed.sessionId
              continue
            }
          } catch { }

          if (skipChunks > 0) {
            skipChunks--
            continue
          }

          let cleaned = payload.replace(/END/g, '')
          let extraCleaned = cleaned.replace(/::/g, '')

          if (isFirstChunk) {
            extraCleaned = extraCleaned.replace(/^ /, '')
            isFirstChunk = false
          }

          fullResponse += extraCleaned
          streamingText.value = fullResponse
        }
      }
    }

    messages.value.push({
      role: 'assistant',
      content: fullResponse,
      timestamp: new Date().toISOString()
    })

    userInput.value = ''
  } catch (error) {
    console.error('💥 Streaming call imploded:', error)
    alert('Something broke. Probably your stream. Or your dreams.')
  } finally {
    loading.value = false
  }
}

const handleSessionSelected = ({ sessionId: selectedId, messages: newMessages }) => {
  console.log(`✨ Loaded session: ${selectedId}`)
  sessionId.value = selectedId
  messages.value = newMessages
  userInput.value = ''
  streamingText.value = ''
}

onMounted(() => {
  const initialMsg = route.query.msg
  if (initialMsg) {
    userInput.value = initialMsg
    sendMessage()
  }
})
</script>

<template>
  <div class="chat-page">
    <SideBar @toggle="handleSidebarToggle" @session-selected="handleSessionSelected" />
    <div class="chat-container" :class="{ 'with-sidebar': sidebarOpen }">
      <!-- ADDED scroll-container div -->
      <div class="scroll-container">
        <ScrollBar>
          <ChatBox :messages="messages" :sessionId="sessionId" :loading="loading" :streamingText="streamingText" />
        </ScrollBar>
      </div>
      <ChatInput v-model="userInput" :loading="loading" @send="sendMessage" />
    </div>
  </div>
</template>

<style scoped>
.chat-page {
  display: flex;
  height: 100vh;
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s ease;
  margin-left: 0;
  height: 100%;
  padding-top: 3.75rem;
  padding-bottom: 3.45rem;
}

.chat-container.with-sidebar {
  margin-left: 260px;
}

.scroll-container {
  flex: 1;
  overflow: hidden;
}
</style>