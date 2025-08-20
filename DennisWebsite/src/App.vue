<script setup>
import background from './assets/background.png'
</script>

<template>
  <header>
  </header>

  <main>
    <div class="background" :style="{ backgroundImage: `url(${background})` }"></div>
    <div class="blur-overlay"></div>
    <div class="wrapper">
      <router-view />
    </div>
  </main>
</template>

<style scoped>
main {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  /* REMOVED padding-top */
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  z-index: 0;

  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.blur-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(4px);
  background: rgba(255, 250, 250, 0.6);
  z-index: 0.5;
}

/* CHANGED wrapper */
.wrapper {
  position: relative;
  z-index: 1;
  height: 100vh;
  /* Full viewport height */
}

.wrapper.sidebar-open {
  margin: 260px;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
