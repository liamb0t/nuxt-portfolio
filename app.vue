<script setup>
useHead({
  title: 'Liam Mclaughlin',
})

const currentYear = new Date().getFullYear()
</script>


<template>
  <div class="wrapper">
    <div class="gradient-background"></div>
    <Navbar />
    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
.wrapper {
  min-height: 100vh;
  background: var(--color-background);
  position: relative;
}

.gradient-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70vh;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.12) 0%,
    rgba(0, 0, 0, 0.08) 20%,
    rgba(0, 0, 0, 0.05) 40%,
    rgba(0, 0, 0, 0.02) 70%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 1;
}

html.dark .gradient-background {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0.10) 20%,
    rgba(255, 255, 255, 0.06) 40%,
    rgba(255, 255, 255, 0.03) 70%,
    transparent 100%
  );
}

main {
  min-height: calc(100vh - 200px);
  position: relative;
  z-index: 2;
}
</style>
