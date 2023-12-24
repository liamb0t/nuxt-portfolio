<script setup>

import bibimIcon from '~/assets/img/bibimhak.png'
import aocIcon from '~/assets/img/aoc.jpeg'
import gameTheoryIcon from '~/assets/img/game-theory.png'
import soccerIcon from '~/assets/img/soccer.png'

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
      "title": "Reddit Soccer Highlights",
      "description": "A Vue.js frontend for watching soccer highlights from Reddit",
      "projectUrl": "https://soccer-highlights-frontend.onrender.com",
      "img": soccerIcon
    },
    {
      "id": 3,
      "title": "Evolutionary game theory simulator",
      "description": "A sandbox and visualizer in your browser to simulate various games from game theory and economics",
      "projectUrl": "https://liamb0t.github.io",
      "img": gameTheoryIcon
    },
    {
      "id": 4,
      "title": "Advent of Code 2023",
      "description": "Solutions to AoC 2023 in Typescript",
      "projectUrl": "https://github.com/liamb0t/Advent-of-Code-2023",
      "img": aocIcon
    },
    {
      "id": 5,
      "title": "Advent of Code 2022",
      "description": "Solutions to AoC 2022 in Python",
      "projectUrl": "https://github.com/liamb0t/Advent-of-Code-2022",
      "img": aocIcon
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
      <h1>Some projects and stuff I've made</h1>
      <div class="project-grid">
        <ProjectCard v-for="project in projects" :key="project.id" :project="project"/>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.projects {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px; /* Adjust the gap according to your design */
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