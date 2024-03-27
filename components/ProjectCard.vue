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
        </div>
        <div class="info-container">
            <p class="title">{{ project.title }}</p>
            <p class="content">{{ project.description }}</p>
        </div>
    </a>
</template>

<style scoped>
a {
    margin-bottom: 1rem;
}
.container {
  height: 14rem; /* Set a fixed height for each card */
  width: 100%;
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
p {
    text-align: start;
    margin: 0;
}
</style>