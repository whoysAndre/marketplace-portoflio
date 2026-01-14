<script setup lang="ts">
const products = [
  {
    id: 1,
    name: 'MacBook Pro M2',
    description: 'MacBook Pro en excelente estado, ideal para desarrollo y diseño.',
    price: 6200,
    rating: 4.8,
    reviews: 18,
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200',
    seller: {
      name: 'Carlos Mendoza',
      location: 'Lima, Perú'
    }
  },
  {
    id: 2,
    name: 'iPhone 14 Pro',
    description: 'Equipo liberado, batería al 90%, incluye cargador original.',
    price: 4200,
    rating: 4.6,
    reviews: 24,
    image:
      'https://images.unsplash.com/photo-1677144646095-ecd95d06cd71?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    seller: {
      name: 'Ana Torres',
      location: 'Arequipa, Perú'
    }
  },
  {
    id: 3,
    name: 'Monitor LG UltraWide',
    description: 'Monitor 34 pulgadas, perfecto para productividad y multitarea.',
    price: 1800,
    rating: 4.9,
    reviews: 12,
    image:
      'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    seller: {
      name: 'Luis Ramírez',
      location: 'Trujillo, Perú'
    }
  }
]

</script>

<template>
  <div class="min-h-screen bg-background pt-24 pb-32 px-6">
    <div class="container mx-auto space-y-12">

      <!-- Header -->
      <div class="text-center space-y-3">
        <h1 class="text-4xl font-bold text-neutral-900 dark:text-white">
          Productos de la Comunidad
        </h1>
        <p class="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Descubre productos publicados por otros usuarios, interactúa con ellos
          y contacta directamente al vendedor.
        </p>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard v-for="product in products" :key="product.id" class="hover:shadow-lg transition-all">
          <!-- Image -->
          <NuxtImg :src="product.image" class="w-full h-44 object-cover rounded-lg mb-4" />

          <!-- Content -->
          <div class="space-y-3">
            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">
              {{ product.name }}
            </h3>

            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              {{ product.description }}
            </p>

            <!-- Rating -->
            <div class="flex items-center gap-2">
              <UBadge color="primary" variant="soft">
                ⭐ {{ product.rating }}
              </UBadge>
              <span class="text-xs text-neutral-500">
                ({{ product.reviews }} opiniones)
              </span>
            </div>

            <!-- Seller -->
            <div class="text-sm text-neutral-500">
              Vendido por
              <span class="font-medium text-neutral-900 dark:text-white">
                {{ product.seller.name }}
              </span>
              · {{ product.seller.location }}
            </div>


          </div>
        </UCard>
      </div>

      <!-- CTA -->
      <UCard class="text-center py-12">
        <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
          ¿Quieres vender tus productos?
        </h2>
        <p class="text-neutral-600 dark:text-neutral-400 mb-6">
          Publica tus productos y empieza a interactuar con otros usuarios.
        </p>
        <UButton color="primary" size="lg" to="/auth/login">
          Publicar producto
        </UButton>
      </UCard>

    </div>
  </div>
</template>
