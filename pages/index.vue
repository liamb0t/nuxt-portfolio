<script setup>

import bibimIcon from '~/assets/img/bibimhak.png'
import aocIcon from '~/assets/img/aoc.jpeg'
import gameTheoryIcon from '~/assets/img/game-theory.png'
import soccerIcon from '~/assets/img/soccer.png'
import mediaIcon from '~/assets/img/media-library.png'

const projects = [
    {
      "id": 1,
      "title": "Bibimhak",
      "description": "A filesharing and community platform for ESL teachers in South Korea",
      "projectUrl": "https://bibimhak.com",
      "img": bibimIcon
    },
    { 
      "id": 2,
      "title": "Vuelites",
      "description": "A Vue.js frontend for watching soccer highlights from Reddit using Flask",
      "projectUrl": "https://vuelites.onrender.com",
      "img": soccerIcon
    },
    {
      "id": 3,
      "title": "Evolutionary game theory simulator",
      "description": "A sandbox and visualizer in your browser to simulate games from game theory and economics",
      "projectUrl": "https://liamb0t.github.io",
      "img": gameTheoryIcon
    },
    {
      "id": 4,
      "title": "Advent of Code 2023",
      "description": "Solutions to AoC 2023",
      "projectUrl": "https://github.com/liamb0t/Advent-of-Code-2023",
      "img": aocIcon
    },
    {
      "id": 5,
      "title": "Advent of Code 2022",
      "description": "Solutions to AoC 2022",
      "projectUrl": "https://github.com/liamb0t/Advent-of-Code-2022",
      "img": aocIcon
    },
    {
      "id": 6,
      "title": "Multi-media library",
      "description": "A media library design concept with support for 3D files",
      "projectUrl": "https://media-platform-demo.onrender.com",
      "img": mediaIcon
    }
  ]

const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
});

onBeforeUnmount(() => {
  isMounted.value = false;
})

</script>

<template>
    <transition name="fade">
    <div v-show="isMounted" class="projects">

      <div class="project-grid">
        <ProjectCard v-for="project in projects" :key="project.id" :project="project"/>
      </div>
    </div>
  </transition>
</template>

<style scoped>
h1 {
  margin-bottom: 1rem;
}
.projects {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px; /* Adjust the gap according to your design */
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