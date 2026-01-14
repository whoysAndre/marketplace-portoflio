<script setup lang="ts">

</script>

<template>
  <div class="container mx-auto px-4 py-16 space-y-24">

    <!-- HERO -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div class="space-y-6">
        <h1 class="text-4xl font-bold text-neutral-900 dark:text-white">
          Conectamos personas a través de productos reales
        </h1>

        <p class="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Somos una plataforma comunitaria donde cualquier persona puede
          publicar sus productos, compartir su experiencia y conectar
          directamente con compradores interesados.
        </p>

        <p class="text-neutral-600 dark:text-neutral-400">
          Creemos en la transparencia, la confianza y en dar visibilidad
          a productos creados o seleccionados por personas reales.
        </p>

        <UBadge color="primary" variant="soft">
          Marketplace comunitario
        </UBadge>
      </div>

      <div class="rounded-xl overflow-hidden shadow-lg">
        <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200" alt="Community marketplace"
          class="w-full h-[420px] object-cover" loading="lazy" />
      </div>
    </section>

    <!-- MISSION / VISION -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <UCard>
        <template #header>
          <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white">
            Nuestra misión
          </h2>
        </template>

        <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Crear un espacio donde los usuarios puedan vender, descubrir y
          valorar productos de manera sencilla, segura y directa,
          eliminando intermediarios innecesarios.
        </p>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white">
            Nuestra visión
          </h2>
        </template>

        <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Convertirnos en una referencia de ecommerce comunitario,
          donde la confianza, las opiniones reales y la interacción
          humana sean el centro de la experiencia.
        </p>
      </UCard>
    </section>

    <!-- HOW IT WORKS -->
    <section class="space-y-12">
      <div class="text-center max-w-2xl mx-auto">
        <h2 class="text-3xl font-bold text-neutral-900 dark:text-white">
          ¿Cómo funciona?
        </h2>
        <p class="mt-4 text-neutral-600 dark:text-neutral-400">
          Publicar, interactuar y conectar nunca fue tan fácil.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <UCard class="text-center">
          <NuxtImg src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800" alt="Publish product"
            class="w-full h-40 object-cover rounded-lg mb-4" />
          <h3 class="font-semibold text-lg">Publica tu producto</h3>
          <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
            Comparte lo que vendes con fotos, precio y descripción clara.
          </p>
        </UCard>

        <UCard class="text-center">
          <img src="https://images.unsplash.com/photo-1525182008055-f88b95ff7980?q=80&w=800" alt="Rate products"
            class="w-full h-40 object-cover rounded-lg mb-4" />
          <h3 class="font-semibold text-lg">Recibe opiniones</h3>
          <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
            Los usuarios pueden calificar y opinar sobre tu producto.
          </p>
        </UCard>

        <UCard class="text-center">
          <img src="https://images.unsplash.com/photo-1525186402429-b4ff38bedbec?q=80&w=800" alt="Connect people"
            class="w-full h-40 object-cover rounded-lg mb-4" />
          <h3 class="font-semibold text-lg">Conecta directamente</h3>
          <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
            Contacto directo entre comprador y vendedor, sin intermediarios.
          </p>
        </UCard>
      </div>
    </section>

    <!-- CTA -->
    <section class="text-center space-y-6">
      <h2 class="text-3xl font-bold text-neutral-900 dark:text-white">
        Sé parte de la comunidad
      </h2>

      <p class="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
        Únete, publica tus productos y conecta con personas interesadas
        en lo que ofreces.
      </p>
    </section>
  </div>
</template>
