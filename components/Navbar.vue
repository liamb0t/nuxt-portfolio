
<template>
  <header>
    <div class="flex">
      <h1 class="name">LIAM MCLAUGHLIN</h1>
      <nav>
        <NuxtLink to="/">Projects</NuxtLink>
        <NuxtLink :to="{ name: 'blog' }">Blog</NuxtLink>
        <a href="https://github.com/liamb0t" target="_blank">Github</a>
        <NuxtLink to="/contact">About</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
.img-container {
  position: relative;
  width: 10rem;
  height: 10rem;
  overflow: hidden;
  border-radius: 50%;
    
}
img {
  display: block;
  position: relative;
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 4rem;
  transform: scale(1.33);
  top: -3rem;
}
nav {
  display: flex;
  align-items: center;
  width: 100%;
  text-align: center;
  margin-top: 2rem;
}
.flex {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.name {
  font-weight: 600;
  width: fit-content;
  border-bottom: 4px solid rgb(225 35 35);
}

nav a.router-link-exact-active {
  color: maroon;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: flex;
  padding: 0 1rem;
  font-weight: 500;
  font-size: 1.5rem;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
  }

  nav {
    text-align: left;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
