<script setup>
const { path } = useRoute()

const { data: blogPost } = await useAsyncData(`content-${path}`, () => {
  return queryContent().where({_path: path}).findOne()
})
</script>

<template>
  <div class="loader-container" v-show="!blogPost">
    <span class="loader"></span>
    <span class="loader-text">Loading</span>
  </div>
 
  <div class="post-container">
    <h1>{{ blogPost.title }}</h1>
  <span>{{ blogPost.dates.published }}</span>
  <transition name="fade">
    <ContentDoc />
  </transition>
  </div>
  
</template>

<style scoped>
.post-container {
  max-width: 50rem;
  margin: 0 auto;
  padding: 2rem;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h1 {
  font-weight: 700;
  font-size: 2.5rem;
  color: var(--color-heading);
  margin-bottom: 1rem;
}

span {
  color: var(--color-text);
  font-size: 0.9rem;
  margin-bottom: 2rem;
  display: block;
  opacity: 0.8;
}

.loader-container {
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.loader {
  width: 3rem;
  height: 3rem;
  border: 2px solid var(--color-border);
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  margin-bottom: 1rem;
}

.loader::after,
.loader::before {
  content: '';  
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  background: var(--color-accent);
  width: 4px;
  height: 4px;
  border-radius: 50%;
}

.loader::before {
  left: auto;
  top: auto;
  right: 0;
  bottom: 0;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 

.loader-text {
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text);
}

/* transition code */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>