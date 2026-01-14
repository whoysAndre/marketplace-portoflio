<script setup lang="ts">


definePageMeta({
  layout: 'auth-layout',
  middleware: ['not-authenticated']
})

</script>
<template>
  <NuxtPage />
</template>
