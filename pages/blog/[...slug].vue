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
}
.loader-container {
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column  ;
}
.loader {
  width: 10rem;
  height: 10rem;
  border: 2px solid #838383;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  margin-bottom: 2rem;
}
.loader::after,
.loader::before {
  content: '';  
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  background: #FF3D00;
  width: 6px;
  height: 6px;
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
  font-size: large;
  font-weight: 600;
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