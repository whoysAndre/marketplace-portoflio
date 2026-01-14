<script setup lang="ts">

const { data } = await useFetch('/api/admin/products', {
  key: 'products'
});

const closeModalCreateProduct = ref(false);


</script>
<template>
  <div class="space-y-6">
    <!-- Header with Action Button -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Productos
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          Gestiona y organiza tu catálogo de productos
        </p>
      </div>

      <ClientOnly>
        <UModal title="Crear Producto" description="Crea tu producto y publícalo" :open="closeModalCreateProduct"
          @update:open="closeModalCreateProduct = $event">
          <UButton label="Agregar Producto" color="primary" variant="subtle" />
          <template #body>
            <!-- FORM -->
            <ProductsNewForm @success="closeModalCreateProduct = false" />
          </template>
        </UModal>

      </ClientOnly>


    </div>

    <!-- Table -->
    <ProductsTable :products="data?.products!" />

  </div>
</template>
