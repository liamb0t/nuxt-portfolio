<script setup>

defineProps({
   project: {
    type: Object,
    required: true
   }
})

</script>

<template>
    <a :href="project.projectUrl">
        <div class="container">
            <img :src="project.img" alt="">
            <p class="title">{{ project.title }}</p>
            <p class="content">{{ project.description }}</p>
        </div>
    </a>
</template>

<style scoped>
.container {
  height: 100%; /* Set a fixed height for each card */
  transition: transform 0.3s ease;
  
}
.container:hover {
    transform: scale(1.05);
}
img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
.title {
    font-weight: 600;
    color: var(--color-text)
}
.content {
    color: var(--color-text)
}
</style>