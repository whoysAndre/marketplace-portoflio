<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

const links = ref<ButtonProps[]>([
  {
    label: 'Explorar productos',
    color: 'primary',
    to: '/products'
  },
  {
    label: 'Publicar un producto',
    color: 'neutral',
    variant: 'subtle',
    trailingIcon: 'i-lucide-arrow-right',
    to: '/auth/login'
  }
])
</script>

<template>
  <UPageCTA title="Descubre productos reales creados por la comunidad"
    description="Explora productos publicados por otros usuarios, califícalos, deja tu opinión y comunícate directamente con el propietario."
    orientation="horizontal" :links="links">
    <NuxtImg src="https://images.unsplash.com/photo-1607082349566-187342175e2f" width="320" height="364"
      alt="Explorar productos de la comunidad" loading="lazy" class="w-full rounded-xl object-cover shadow-lg" />
  </UPageCTA>
</template>
