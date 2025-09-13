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
  height: 100%;
  transition: all 0.3s ease;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  border-radius: 8px;
  padding: 1.5rem;
  background: var(--color-background);
  border: 1px solid var(--color-border);
}

.container:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

.title {
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--color-heading);
  margin-bottom: 1rem;
  transition: color 0.2s ease;
}

.title:hover {
  color: var(--color-accent);
}

.content {
  color: var(--color-text);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.open-post-btn {
  font-weight: 500;
  font-size: 0.9rem;
  color: var(--color-text);
  padding: 0.5rem 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  transition: all 0.2s ease;
  display: inline-block;
}

.open-post-btn:hover {
  color: var(--color-background);
  background-color: var(--color-accent);
  border-color: var(--color-accent);
}
</style>