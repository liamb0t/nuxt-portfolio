<script setup>

defineProps({
  project: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <a :href="project.projectUrl" class="project-card" target="_blank">
    <div class="image-container">
      <img :src="project.img" :alt="project.title + ' screenshot'">
      <div class="overlay">
        <svg class="external-link-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6m4-3h6v6m-11 5L21 3" />
        </svg>
      </div>
    </div>
    <div class="info-container">
      <h3 class="title">{{ project.title }}</h3>
      <p class="description">{{ project.description }}</p>
      <div class="tags" v-if="project.tags">
        <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
  </a>
</template>

<style scoped>
.project-card {
  display: block;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  text-decoration: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  height: 100%;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: var(--color-accent);
}

.image-container {
  position: relative;
  height: 200px;
  width: 100%;
  overflow: hidden;
  background: var(--color-background-soft);
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .image-container img {
  transform: scale(1.05);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .overlay {
  opacity: 1;
}

.external-link-icon {
  width: 32px;
  height: 32px;
  color: white;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

.info-container {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.title {
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--color-heading);
  margin: 0 0 0.75rem 0;
  line-height: 1.3;
}

.description {
  color: var(--color-text);
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0 0 0.75rem 0;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.tag {
  background: var(--color-background-soft);
  color: var(--color-text);
  padding: 0.2rem 0.6rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid var(--color-border);
  transition: all 0.2s ease;
  opacity: 0.8;
}

.project-card:hover .tag {
  opacity: 1;
}

@media (max-width: 768px) {
  .image-container {
    height: 160px;
  }

  .info-container {
    padding: 1.25rem;
  }

  .title {
    font-size: 1.1rem;
  }

  .description {
    font-size: 0.9rem;
  }
}
</style>