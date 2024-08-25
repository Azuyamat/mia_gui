<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from './components/nav/NavBar.vue';
</script>

<template>
  <div class="horizontal-grid">
    <div>
      <NavBar />
    </div>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.horizontal-grid {
  display: grid;
  grid-template-columns: min-content 1fr;
}

main {
  padding: 2rem;
}
</style>
