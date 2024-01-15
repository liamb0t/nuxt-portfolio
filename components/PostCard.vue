<script setup>

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
});

</script>

<template>
<div class="container">
    <NuxtLink :to="post._path">
        <h2 class="title">{{ post.title }}</h2>
    </NuxtLink>
    <div class="content">{{ post.description }}</div>
    <NuxtLink class="open-post-btn" :to="post._path">
        Continue Reading
    </NuxtLink>
</div>
</template>

<style scoped>
.container {
  height: 100%; /* Set a fixed height for each card */
  transition: transform 0.3s ease;
  border-bottom: 2px solid gainsboro;
  padding-bottom: 2rem;
  margin-bottom: 2rem;
}
.title:hover {
    color: maroon;
}
img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
.title {
    font-weight: 600;
    color: var(--color-text);
    margin-bottom: 1rem;
}
.content {
    color: var(--color-text);
    margin-bottom: 2rem
}
.open-post-btn {
    font-weight: 500;
    font-size: smaller;
    color: var(--color-text);
    padding: 0.5rem 1.5rem;
    border: 1px solid maroon;
}
.open-post-btn:hover {
    color: white;
    background-color: maroon;
}
</style>