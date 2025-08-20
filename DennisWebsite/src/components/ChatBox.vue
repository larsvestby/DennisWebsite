<script setup>
import { ref, watch, nextTick, onMounted } from 'vue'
import ChatMessage from './ChatMessage.vue'
import StreamingPreview from './StreamingPreview.vue'

const bottomAnchor = ref(null)

const props = defineProps({
  messages: Array,
  sessionId: String,
  loading: Boolean,
  streamingText: String
})

const scrollToBottom = () => {
  nextTick(() => {
    if (bottomAnchor.value) {
      bottomAnchor.value.scrollIntoView({ behavior: 'smooth' })
    }
  })
}

// Scroll on mount (first load)
onMounted(() => {
  scrollToBottom()
})

// Scroll when new messages or streaming text changes
watch(
  () => [props.messages.length, props.streamingText],
  () => {
    scrollToBottom()
  }
)
</script>

<template>
  <div class="chat-box">
    <ChatMessage
      v-for="(msg, index) in messages"
      :key="index"
      :message="msg"
      :sessionId="sessionId"
      :showSessionId="index === messages.length - 1"
    />
    <StreamingPreview :loading="loading" :streamingText="streamingText" />
    <div ref="bottomAnchor"></div>
  </div>
</template>

<style scoped>
.chat-box {
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
  padding: 3.8rem 8rem 0rem 8rem;
}
</style>
