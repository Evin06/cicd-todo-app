<script setup lang="ts">
import { useUser } from './shared/stores';

import AppHeader from '@/components/AppHeader.vue';
import { computed } from 'vue';

const userStore = useUser();

async function logout() {
  await userStore.logout();
}

const menu = computed(() => [
  { name: 'Mes Tâches', path: '/', display: !!userStore.isAuthenticated },
  { name: 'À Propos', path: '/about', display: true }
]);

const isAuthenticated = computed(() => userStore.isAuthenticated);
</script>

<template>
  <div class="antialiased bg-red-500 dark:bg-gray-900 h-screen">
    <AppHeader :isAuthenticated="isAuthenticated ?? false" @logout="logout" :menu="menu" />
    <main
      class="flex-1 relative z-0 bg-gray-200 focus:outline-none dark:bg-gray-700 rounded-md m-4"
    >
      <div class="py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <RouterView />
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss">
@use './assets/base.scss';
</style>
