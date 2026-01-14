<script setup lang="ts">

</script>
<template>
  <!-- Sidebar -->
  <SharedHeader />

  <main class="container mx-auto flex-1 mt-2 px-10 md:px-0">
    <slot />
  </main>
  
  <SharedFooter/>

</template>
