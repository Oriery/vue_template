<template>
  <header class="flex flex-col align-center gap-2">
    <p class="underline">This text is styled with underline by Tailwind</p>
    <v-btn>Vuetify button</v-btn>
    <LangPicker class="min-w-[10rem]"/>

    <nav class="flex flex-row gap-2 justify-center">
      <RouterLink
        v-for="link in links"
        :key="link.name"
        :to="link.path"
        class="text-blue-500 hover:text-blue-700"
      >
        {{ link.name }}
      </RouterLink>
    </nav>
  </header>

  <RouterView class="grow" />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import LangPicker from './components/LangPicker.vue'

const links = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
]
</script>
