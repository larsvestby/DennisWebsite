<script setup>
import { ref, onMounted } from 'vue'
import downArrow from '../assets/downArrow.svg'
import upArrow from '../assets/upArrow.svg'

const scrollContainer = ref(null)

onMounted(() => {
    scrollContainer.value.scrollTop = 0
})
</script>

<template>
    <div class="scroll-wrapper">
        <div class="scroll-content" ref="scrollContainer">
            <slot />
        </div>
    </div>
</template>

<style>
.scroll-wrapper {
    height: 100%;
    justify-content: center;
    overflow: hidden;
    position: relative;
    padding-left: 1rem;
    padding-right: 1rem;
}

.scroll-content {
    height: 100%;
    overflow-y: overlay;
}

.scroll-content::-webkit-scrollbar {
    width: 6px;
    height: 100%;
}

.scroll-content::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0); 
    border-radius: 4px;
}

.scroll-content::-webkit-scrollbar-thumb {
    background: linear-gradient(rgba(68, 213, 208, 0.54) 39%,
            rgba(0, 112, 240, 0.58) 72%,
            rgba(133, 67, 232, 0.67) 100%);
    border-radius: 4px;
}

.scroll-content::-webkit-scrollbar-button:vertical:decrement {
    background: url('../assets/upArrow.svg') no-repeat center;
}

.scroll-content::-webkit-scrollbar-button:vertical:increment {
    background: url('../assets/downArrow.svg') no-repeat center;
}

.scroll-content::-webkit-scrollbar-track-piece:start{
    background: transparent;
}

.scroll-content::-webkit-scrollbar-track-piece:end{
    background: transparent;
}
</style>