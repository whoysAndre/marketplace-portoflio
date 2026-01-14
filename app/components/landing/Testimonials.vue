<script setup lang="ts">
const testimonials = ref([
  {
    user: {
      name: 'Carlos Mendoza',
      description: 'Vendedor independiente',
      avatar: {
        src: 'https://images.unsplash.com/photo-1603415526960-f7e0328d8d2b?q=80&w=200',
        alt: 'Carlos Mendoza',
      },
    },
    quote:
      'Publicar mis productos fue muy sencillo. Me encanta poder hablar directamente con los compradores sin intermediarios.',
  },
  {
    user: {
      name: 'Lucía Fernández',
      description: 'Compradora frecuente',
      avatar: {
        src: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=200',
        alt: 'Lucía Fernández',
      },
    },
    quote:
      'Poder ver opiniones reales y contactar al vendedor antes de comprar me dio mucha más confianza.',
  },
  {
    user: {
      name: 'Andrés Rojas',
      description: 'Emprendedor',
      avatar: {
        src: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200',
        alt: 'Andrés Rojas',
      },
    },
    quote:
      'Esta plataforma me permitió validar mis productos rápidamente y recibir feedback real de los usuarios.',
  },
  {
    user: {
      name: 'María Torres',
      description: 'Artesana',
      avatar: {
        src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200',
        alt: 'María Torres',
      },
    },
    quote:
      'Es justo lo que necesitaba: un espacio donde mostrar mi trabajo y conectar con personas interesadas.',
  },
  {
    user: {
      name: 'Javier Salinas',
      description: 'Comprador',
      avatar: {
        src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200',
        alt: 'Javier Salinas',
      },
    },
    quote:
      'La experiencia es clara y directa. Ves el producto, preguntas y decides sin complicaciones.',
  },
  {
    user: {
      name: 'Ana Beltrán',
      description: 'Vendedora digital',
      avatar: {
        src: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=200',
        alt: 'Ana Beltrán',
      },
    },
    quote:
      'Me gustó mucho el enfoque comunitario. No es solo vender, es interactuar y construir confianza.',
  },
]);
</script>

<template>
  <div>
    <UPageSection title="Testimonios" description="Nuestros testimonios de clientes satisfechos"
      headline="Testimonios" />

    <UPageColumns>
      <UPageCard v-for="(testimonial, index) in testimonials" :key="index" variant="subtle"
        :description="testimonial.quote" :ui="{
          description:
            'before:content-[open-quote] after:content-[close-quote]',
        }">
        <template #footer>
          <UUser v-bind="testimonial.user" size="xl" />
        </template>
      </UPageCard>
    </UPageColumns>
  </div>
</template>