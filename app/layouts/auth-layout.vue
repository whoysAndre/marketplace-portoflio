<script setup lang="ts">

</script>
<template>

  <NuxtLink to="/" class="absolute right-7 top-5 flex items-center gap-2">
    <Icon name="lucide:chevron-left" class="w-5 h-7" />
    <span class="text-sm">Regresar</span>
  </NuxtLink>

  <main class="min-h-screen w-full flex justify-center items-center">
    <slot />
  </main>

</template>
