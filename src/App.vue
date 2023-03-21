<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useForumStore } from './stores/forumStore'
import { onMounted } from 'vue'
const { fetchForen } = useForumStore()
onMounted(() => {
  fetchForen()
})
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.png" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Forum</RouterLink>
        <RouterLink to="/about">About MVVM</RouterLink>
      </nav>
    </div>
  </header>
  <div class="content">
    <RouterView />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  height: 80px;
  display: flex;
  align-items: center;
  background-color: gray;
  padding-left: 20px;
}
header img {
  height: 50px;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
.content {
  width: 100%;
  padding: 20px;
  margin: 0 auto;
}
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    display: flex;
    flex-direction: row;
  }
  nav a {
    font-size: 1.2rem !important;
    font-weight: bold !important;
  }
  .content {
    width: 80%;
  }
}
</style>
