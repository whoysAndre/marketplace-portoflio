<script setup lang="ts">
const cards = ref([
  {
    title: 'Explora productos reales',
    description:
      'Descubre productos publicados por otros usuarios. Cada publicación incluye imágenes reales, descripción detallada y opiniones de la comunidad.',
    class: 'lg:col-span-2',
    image: {
      path: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db',
      width: 600,
      height: 400,
    },
    orientation: 'horizontal' as const,
  },
  {
    title: 'Califica y opina',
    description:
      'Deja tu puntuación y comparte tu experiencia para ayudar a otros usuarios a tomar mejores decisiones.',
    variant: 'soft' as const,
  },
  {
    title: 'Contacta al propietario',
    description:
      'Comunícate directamente con la persona que publicó el producto para resolver dudas o coordinar detalles.',
    variant: 'soft' as const,
  },
  {
    title: 'Construido por la comunidad',
    description:
      'Una plataforma basada en confianza, transparencia y participación activa entre usuarios.',
    image: {
      path: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
      width: 600,
      height: 400,
    },
    class: 'lg:col-span-2',
    orientation: 'horizontal' as const,
    reverse: true,
  },
])
</script>
<template>
  <div class="mt-16">
    <UPageSection headline="Plataforma" title="Todo lo que puedes hacer"
      description="Explora productos, interactúa con otros usuarios y forma parte de una comunidad activa." />

    <UPageGrid>
      <UPageCard v-for="(card, index) in cards" :key="index" v-bind="card">
        <NuxtImg v-if="card.image" :src="card.image.path" :width="card.image.width" :height="card.image.height"
          :alt="card.title" loading="lazy" class="w-full rounded-lg object-cover" />
      </UPageCard>
    </UPageGrid>
  </div>
</template>
