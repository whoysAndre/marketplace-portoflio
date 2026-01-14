<script setup lang="ts">
const props = defineProps<{
  product: ProductDashboard
}>()
</script>

<template>
  <div class="space-y-6">

    <!-- Header -->
    <div class="flex items-start justify-between gap-4">
      <div>
        <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {{ product.name }}
        </h2>
        <p class="text-sm text-neutral-500">
          {{ product.slug }}
        </p>
      </div>

      <UBadge :color="product.isActive ? 'primary' : 'neutral'" variant="subtle">
        {{ product.isActive ? 'Activo' : 'Inactivo' }}
      </UBadge>
    </div>

    <!-- Precio -->
    <div class="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
      <p class="text-sm text-neutral-500">Precio</p>
      <p class="text-2xl font-bold text-primary">
        s/. {{ product.price }}
      </p>
    </div>

    <!-- Descripción -->
    <div>
      <h3 class="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
        Descripción
      </h3>
      <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
        {{ product.description }}
      </p>
    </div>

    <!-- Tags -->
    <div v-if="product.tags.length">
      <h3 class="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
        Etiquetas
      </h3>
      <div class="flex flex-wrap gap-2">
        <UBadge v-for="tag in product.tags" :key="tag" color="neutral" variant="soft">
          {{ tag }}
        </UBadge>
      </div>
    </div>

    <!-- Imágenes -->
    <div v-if="product.images.length">
      <h3 class="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
        Imágenes
      </h3>

      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <img v-for="(image, i) in product.images" :key="i" :src="image" alt="Product image"
          class="aspect-square rounded-lg object-cover border border-neutral-200 dark:border-neutral-800" />
      </div>
    </div>

  </div>
</template>
