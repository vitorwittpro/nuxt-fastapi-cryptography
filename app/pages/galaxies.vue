<template>
    <main>
      <h1>Galaxies</h1>
  
      <section v-if="status == 'pending'">Loading ...</section>
  
      <section v-else>
        <article v-for="g in data" :key="g.name">
          {{ g.name }}
        </article>
      </section>
    </main>
  </template>
  
  <script setup>
  import { onBeforeMount } from 'vue';
  
  const { status, data, refresh } = useLazyFetch('/api/galaxies', { immediate: false });
  
  onBeforeMount(async () => {
    await refresh();
  });
  </script>
  