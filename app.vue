<script setup>
useHead({
  title: 'Liam Mclaughlin',
})
</script>


<template>
  <div class="wrapper">
    <Navbar />
    <div>
      <NuxtPage />
    </div>
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
