<script setup>
import { defineProps, defineEmits } from 'vue'
import arrow from '../assets/sendArrow.svg'

const props = defineProps({
  modelValue: String,
  loading: Boolean
})

const emit = defineEmits(['update:modelValue', 'send'])

const updateInput = (event) => {
  emit('update:modelValue', event.target.value)
}

const handleSend = () => {
  emit('send')
}
</script>

<template>
  <div class="UserInput">
    <div class="input-wrapper">
      <input class="gradient-border" :value="modelValue" @input="updateInput" @keyup.enter="handleSend"
        placeholder="Send a message..." :disabled="loading" />
      <button @click="handleSend" :disabled="loading">
        <img v-if="!loading" :src="arrow" alt="Send" class="send-icon" />
        <span v-else>...</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.UserInput {
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
}

.gradient-border {
  background: linear-gradient(white, white) padding-box, linear-gradient(to right, rgba(133, 67, 232, 67%), rgba(0, 112, 240, 58%), rgba(68, 213, 208, 54%)) border-box;
  border-radius: 0.5rem;
  border: 3px solid transparent;
  width: 100%;
}

.input-wrapper {
  position: fixed;
  bottom: 1rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 85%;
  transition: width 0.3s ease, left 0.3s ease;
}

.with-sidebar .input-wrapper {
  width: calc(85% - 260px);
  left: 260px;
}

input {
  padding: 1rem 4rem 1rem 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
}

button {
  position: absolute;
  top: 50%;
  right: 0.75rem;
  transform: translateY(-50%);
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  background: linear-gradient(to right,
      rgba(133, 67, 232, 0.67),
      rgba(0, 112, 240, 0.58),
      rgba(68, 213, 208, 0.54));
}

button:disabled {
  background: #ddd;
  cursor: not-allowed;
  box-shadow: 0 0 0 3px white inset;
}

.send-icon {
  width: 1.25rem;
  height: 1.25rem;
}
</style>
