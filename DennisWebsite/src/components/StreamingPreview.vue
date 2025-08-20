<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  loading: Boolean,
  streamingText: String
})

const animatedChunks = ref([]) // array of character spans

let lastText = '' // stores the last processed state

watch(
  () => props.streamingText,
  (newVal) => {
    if (!props.loading || !newVal) {
      // Reset when not loading
      animatedChunks.value = []
      lastText = ''
      return
    }

    const newChars = newVal.slice(lastText.length).split('')

    newChars.forEach((char, i) => {
      animatedChunks.value.push({
        char,
        id: `${Date.now()}-${i}`,
        delay: (animatedChunks.value.length + i) * 15
      })
    })

    lastText = newVal
  }
)


</script>

<template>
  <div v-if="loading && animatedChunks.length" class="chat-bubble chat-container">
    <p class="typewriter">
      <span v-for="chunk in animatedChunks" :key="chunk.id" class="fade-in"
        :style="{ animationDelay: chunk.delay + 'ms' }">
        {{ chunk.char }}
      </span>
    </p>
  </div>
</template>

<style scoped>
.chat-bubble {
  align-self: flex-start;
  color: black;
  padding: 2rem 0rem 2rem 0rem;
}

.chat-container {
  align-self: flex-start;
}

.typewriter {
  font-family: monospace;
  white-space: pre-wrap;
}

.fade-in {
  opacity: 0;
  display: inline-block;
  animation: fadeIn 0.1s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(3px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
