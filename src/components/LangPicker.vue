<template>
  <v-select density="compact" :items="SUPPORT_LOCALES" v-model="currentLocale"></v-select>
</template>

<script setup lang="ts">
import { SUPPORT_LOCALES, currentLocale } from '@/i18n'

</script>
