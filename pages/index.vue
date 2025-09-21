<script setup>

import bibimIcon from '~/assets/img/bibimhak.png'
import aocIcon from '~/assets/img/aoc.jpeg'
import gameTheoryIcon from '~/assets/img/game-theory.png'
import soccerIcon from '~/assets/img/soccer.png'
import mediaIcon from '~/assets/img/media-library.png'
import bluffballIcon from '~/assets/img/bluffball.png'
import CerameterIcon from '~/assets/img/cerameter.png'
import FantaIcon from '~/assets/img/fanta.webp'
import Porz2Icon from '~/assets/img/porz-ii.webp'
import AkkiIcon from '~/assets/img/akki.png'
import thinkstIcon from '~/assets/img/thinkst.png'

const projects = [
  {
    "title": "Bluffball",
    "description": "Daily Premier League news & updates inspired by IT Crowd, powered by AI",
    "projectUrl": "https://bluffball.org",
    "img": bluffballIcon,
    "tags": ["TypeScript", "Nuxt.js", "Capacitor", "Android", "AI", "TailwindCSS"]
  },
  {
    "title": "Goalrush",
    "description": "Easier browsing of soccer highlights from Reddit",
    "projectUrl": "https://goalrush-six.vercel.app",
    "img": soccerIcon,
    "tags": ["Flask", "Nuxt.js", "PRAW", "Redis", "TypeScript", "TailwindCSS"]
  },
  {
    "title": "Thinkst Canary gift store",
    "description": "Rework of the gift store for Thinkst Canary's website",
    "projectUrl": "https://gift.canary.tools  ",
    "img": thinkstIcon,
    "tags": ["Vue.js", "Flask", "Docker", "SQLAlchemy", "TailwindCSS"]
  },
  {
    "title": "Evolutionary game theory simulator",
    "description": "A sandbox and visualizer in your browser to simulate games from game theory and economics",
    "projectUrl": "https://liamb0t.github.io",
    "img": gameTheoryIcon,
    "tags": ["JavaScript", "HTML", "CSS"]
  },
  {
    "title": "Porzellanikon: Mission Keramik",
    "description": "AR scavenger hunt game for a museum exhibition in Germany (Frontend)",
    "projectUrl": "https://www.tvo.de/mediathek/video/porzellanikon-familientag-auf-mission-keramik/",
    "img": CerameterIcon,
    "tags": ["Nuxt.js", "Typescript"]
  },
  {
    "title": "Fanta Fenix",
    "description": "Generative AI/AR experience for launch of Fanta Zero Orange (Frontend)",
    "projectUrl": "https://www.youtube.com/watch?v=tG_OvpvEKhk",
    "img": FantaIcon,
    "tags": ["Nuxt.js", "Typescript"]
  },
  {
    "title": "Akki EntdeckAR",
    "description": "Official app of the city of Hildesheim: Interactive AR scavenger hunt on the active playground (Frontend)",
    "projectUrl": "https://play.google.com/store/apps/details?id=com.zaubar.akki&hl=en",
    "img": AkkiIcon,
    "tags": ["Nuxt.js", "Typescript"]
  },
  {
    "title": "Porzellanikon: Fenster in die vergangenheit",
    "description": "Interactive AR experience and chatbot for porcelain museum in Germany (Frontend)",
    "projectUrl": "https://apps.apple.com/lu/app/porzellanikon/id6747825877?platform=ipad",
    "img": Porz2Icon,
    "tags": ["9-slicing", "Nuxt.js", "Typescript"]
  },
  {
    "title": "Bibimhak",
    "description": "A filesharing and community platform for ESL teachers in South Korea",
    "projectUrl": "https://bibimhak.com",
    "img": bibimIcon,
    "tags": ["Flask", "SQLAlchemy", "JavaScript", "CSS"]
  },
  {
    "title": "Multi-media library concept",
    "description": "A media library design concept with support for 3D files",
    "projectUrl": "https://media-platform-concept.vercel.app/",
    "img": mediaIcon,
    "tags": ["Nuxt.js"]
  },
  {
    "title": "Advent of Code 2023",
    "description": "Solutions to AoC 2023",
    "projectUrl": "https://github.com/liamb0t/Advent-of-Code-2023",
    "img": aocIcon,
    "tags": ["Python", "Algorithms"]
  },
  {
    "title": "Advent of Code 2022",
    "description": "Solutions to AoC 2022",
    "projectUrl": "https://github.com/liamb0t/Advent-of-Code-2022",
    "img": aocIcon,
    "tags": ["Python", "Algorithms"]
  },
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
      <div class="projects-header">
        <h1 class="section-title">Hi, I'm Liam</h1>
        <p class="section-subtitle">Here's some random stuff I've built and worked on</p>
      </div>
      <div class="project-grid">
        <ProjectCard v-for="(project, index) in projects" :key="index" :project="project" />
      </div>
    </div>
  </transition>
</template>

<style scoped>
.homepage {
  position: relative;
  min-height: 100vh;
}

.animated-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  background-image:
    radial-gradient(circle at 17% 23%, rgba(0, 0, 0, 0.25) 2px, transparent 2px),
    radial-gradient(circle at 73% 41%, rgba(0, 0, 0, 0.2) 1px, transparent 1px),
    radial-gradient(circle at 34% 67%, rgba(0, 0, 0, 0.18) 3px, transparent 3px),
    radial-gradient(circle at 89% 12%, rgba(0, 0, 0, 0.15) 1.5px, transparent 1.5px),
    radial-gradient(circle at 11% 78%, rgba(0, 0, 0, 0.22) 2.5px, transparent 2.5px),
    radial-gradient(circle at 67% 83%, rgba(0, 0, 0, 0.12) 2px, transparent 2px),
    radial-gradient(circle at 45% 34%, rgba(0, 0, 0, 0.16) 1px, transparent 1px),
    radial-gradient(circle at 92% 76%, rgba(0, 0, 0, 0.14) 2px, transparent 2px),
    radial-gradient(circle at 25% 91%, rgba(0, 0, 0, 0.19) 1.5px, transparent 1.5px),
    radial-gradient(circle at 58% 19%, rgba(0, 0, 0, 0.13) 2.5px, transparent 2.5px);
  background-size:
    127px 143px, 89px 167px, 203px 97px, 156px 231px, 178px 134px,
    145px 198px, 234px 176px, 112px 189px, 167px 145px, 198px 123px;
  animation: drift 60s linear infinite, pulse 15s ease-in-out infinite alternate;
}

html.dark .animated-background {
  background-image:
    radial-gradient(circle at 17% 23%, rgba(255, 255, 255, 0.3) 2px, transparent 2px),
    radial-gradient(circle at 73% 41%, rgba(255, 255, 255, 0.25) 1px, transparent 1px),
    radial-gradient(circle at 34% 67%, rgba(255, 255, 255, 0.22) 3px, transparent 3px),
    radial-gradient(circle at 89% 12%, rgba(255, 255, 255, 0.18) 1.5px, transparent 1.5px),
    radial-gradient(circle at 11% 78%, rgba(255, 255, 255, 0.26) 2.5px, transparent 2.5px),
    radial-gradient(circle at 67% 83%, rgba(255, 255, 255, 0.15) 2px, transparent 2px),
    radial-gradient(circle at 45% 34%, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
    radial-gradient(circle at 92% 76%, rgba(255, 255, 255, 0.17) 2px, transparent 2px),
    radial-gradient(circle at 25% 91%, rgba(255, 255, 255, 0.23) 1.5px, transparent 1.5px),
    radial-gradient(circle at 58% 19%, rgba(255, 255, 255, 0.16) 2.5px, transparent 2.5px);
}

@keyframes drift {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(-50px, -30px);
  }
}

@keyframes pulse {
  0% {
    opacity: 0.7;
  }

  100% {
    opacity: 1;
  }
}

.projects {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  z-index: 1;
}

.projects-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-heading);
  margin: 0 0 1rem 0;
}

.section-subtitle {
  font-size: 1.2rem;
  color: var(--color-text);
  margin: 0;
  font-weight: 400;
  line-height: 1.6;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  align-items: stretch;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .projects {
    padding: 1rem;
  }

  .projects-header {
    margin-bottom: 2.5rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 1.1rem;
  }

  .project-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.75rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .project-grid {
    gap: 1rem;
  }
}

@media (min-width: 1200px) {
  .project-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Enhanced transition animations */
.fade-enter-active {
  transition: all 0.8s ease-out;
}

.fade-leave-active {
  transition: all 0.4s ease-in;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>