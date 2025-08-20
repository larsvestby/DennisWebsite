<script setup>
defineProps({
    text: {
        type: String,
        required: true
    }
});
</script>

<template>
  <span class="gradient-text">{{ text }}</span>
</template>

<style scoped>
.gradient-text {
    --bg-size: 400%;
    --color-one: rgba(133, 67, 232, 0.67);
    --color-two: rgba(0, 112, 240, 0.58);
    --color-three: rgba(68, 213, 208, 0.54);
    background: linear-gradient(90deg,
            var(--color-one),
            var(--color-two),
            var(--color-three),
            var(--color-one)) 0 0 / var(--bg-size) 100%;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    animation: move-bg 30s infinite linear;
    font-weight: bold;
}

@keyframes move-bg {
    to {
        background-position: var(--bg-size) 0;
    }
}
</style>