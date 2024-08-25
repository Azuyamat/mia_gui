<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const pages = [
  {
    display: 'Home',
    href: '/',
    icon: 'fa-home'
  },
  {
    display: 'Files',
    href: '/files',
    icon: 'fa-folder'
  },
  {
    display: 'Settings',
    href: '/settings',
    icon: 'fa-cog'
  }
];

const route = useRoute();
const currentPage = computed(() => {
  return pages.find(page => page.href === route.path) || {
    display: '404',
    href: '/404',
    icon: 'fa-exclamation-circle'
  };
});
</script>

<template>
  <nav>
    <div class="title">
      <h1>Mia</h1>
    </div>
    <ul>
      <li v-for="page in pages" :key="page.display" :data-selected="page.href === currentPage.href">
        <router-link :to="page.href">
          <v-icon :name="page.icon" />
          <span class="page-display">{{ page.display }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  height: 100vh;
  min-width: 200px;
  padding: 2rem 1rem;

  font-family: monospace;
  color: black;
  background-color: var(--color-background);
  border-right: 1px solid var(--color-border);
}

nav h1 {
  color: var(--color-primary);
}

.title {
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
  letter-spacing: 3px;
}

nav ul {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

nav li * {
  color: rgb(128, 128, 128);
}

nav li[data-selected="true"] * {
  color: var(--color-primary);
}

.page-display {
  margin-left: 0.5rem;

  font-weight: 500;
  font-size: 1rem;
}
</style>