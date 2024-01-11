<script setup>
useHead({
  title: 'Liam Mclaughlin',
})

const currentYear = new Date().getFullYear()
</script>


<template>
  <div class="wrapper">
    <Navbar />
    <div>
      <NuxtPage />
    </div>
    <!-- <footer>
      <p>&copy; Liam Mclaughlin <span id="currentYear">{{ currentYear }}</span></p>
    </footer> -->
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
