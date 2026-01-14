<script setup lang="ts">
const { products, total, currentPage, perPage } = await usePaginatedProducts();

</script>

<template>
  <UPageCTA orientation="horizontal" title="Productos" description="Descubre nuestros productos y servicios.">
    <template #default>
      <div class="flex items-center justify-center">
        <UIcon name="i-lucide-box" :size="150" />
      </div>
    </template>
  </UPageCTA>
  <div class="mt-10" />

  <LandingProductsGrid :products="products" />

  <SharedPagination :total="total" :model-value="currentPage" :per-page="perPage" />

</template>
