<script setup>
const isDark = ref(false)

// Check for saved theme preference or default to light
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
  } else {
    // Default to light theme instead of system preference
    isDark.value = false
  }
  updateTheme()
})

const toggleTheme = () => {
  isDark.value = !isDark.value
  updateTheme()
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

const updateTheme = () => {
  const html = document.documentElement
  if (isDark.value) {
    html.classList.add('dark')
    html.style.colorScheme = 'dark'
  } else {
    html.classList.remove('dark')
    html.style.colorScheme = 'light'
  }
}
</script>

<template>
  <header>
    <nav class="navbar-container">
      <div class="nav-center">
        <NuxtLink to="/" class="nav-link">Projects</NuxtLink>
        <NuxtLink :to="{ name: 'blog' }" class="nav-link">Blog</NuxtLink>
      </div>
      <div class="nav-right">
        <button @click="toggleTheme" class="theme-toggle"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
          <svg v-if="isDark" class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="4" />
            <path d="m12 2v2" />
            <path d="m12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
          <svg v-else class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>
        <a href="https://github.com/liamb0t" target="_blank" class="github-button">
          <svg class="github-icon" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
      </div>
    </nav>
  </header>
</template>

<style scoped>
header {
  padding: 1rem 2rem 0.5rem 2rem;
  background: transparent;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
}

.nav-center {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;
}

.nav-link {
  padding: 0.5rem 1rem;
  font-weight: 500;
  font-size: 1rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  color: var(--color-text);
  text-decoration: none;
}

.nav-link:hover {
  background-color: var(--color-background-soft);
  color: var(--color-accent);
}

.nav-link.router-link-exact-active {
  color: var(--color-accent);
  font-weight: 600;
  background-color: var(--color-background-mute);
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--color-text);
}

.theme-toggle:hover {
  background-color: var(--color-background-soft);
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.theme-icon {
  width: 18px;
  height: 18px;
  stroke-width: 2;
}

.github-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  color: var(--color-text);
  transition: all 0.2s ease;
  text-decoration: none;
}

.github-button:hover {
  background-color: var(--color-background-soft);
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.github-icon {
  width: 16px;
  height: 16px;
}

@media (max-width: 768px) {
  header {
    padding: 0.5rem 1rem;
  }

  .navbar-container {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-center {
    position: static;
    transform: none;
    order: 2;
  }

  .nav-right {
    order: 1;
    margin-left: 0;
  }

  .nav-link {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }

  .theme-toggle,
  .github-button {
    padding: 0.4rem;
  }

  .theme-icon,
  .github-icon {
    width: 15px;
    height: 15px;
  }
}
</style>
