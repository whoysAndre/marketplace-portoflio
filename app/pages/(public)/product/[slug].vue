<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string;

const { product } = await useProduct(slug);
const { isLoggedIn, user } = useAuthentication();


useSeoMeta({
  title: () => product.value?.name || 'Producto',
  description: () => product.value?.description || '',
  ogTitle: () => product.value?.name || 'Producto',
  ogDescription: () => product.value?.description || 'Producto',
  ogImage: () => product.value?.images?.[0] || '',

  twitterCard: 'summary_large_image',
  twitterTitle: () => product.value?.name || 'Producto',
  twitterDescription: () => product.value?.description || '',
  twitterImage: () => product.value?.images?.[0] || '',
})


if (!product.value) {
  navigateTo('/404');
}

const selectedImageIndex = ref(0);
const quantity = ref(1);
const increaseQuantity = () => {
  quantity.value++;
};
const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};
const totalPrice = computed(() => {
  return (product.value?.price || 0) * quantity.value;
});

const toast = useToast();

const sendContactProduct = async () => {

  if (!isLoggedIn.value) {
    navigateTo('/auth/login');
    return;
  }

  const data = {
    nameProduct: product.value?.name,
    quantity: quantity.value,
    price: totalPrice.value,
    buyerId: user.value?.id,
    publicatorId: product.value?.userId
  }


  await $fetch('/api/admin/messages', {
    method: 'POST',
    body: data
  });


  await refreshNuxtData('messages');

  toast.add({
    title: 'Información Enviada correctamente',
    description: 'La informacion a sido enviada al publicador del producto'
  })

}

</script>

<template>
  <div v-if="product" class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <UBreadcrumb class="mb-8" :items="[
      { label: 'Productos', to: '/products' },
      { label: product.name, to: `/product/${product.slug}` },
    ]" />

    <!-- Product Detail -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Images Section -->
      <div class="space-y-4">
        <!-- Main Image -->
        <div class="rounded-lg overflow-hidden bg-gray-100">
          <img :src="product.images[selectedImageIndex]" :alt="product.name" class="w-full h-96 object-cover"
            loading="lazy" />
        </div>

        <!-- Thumbnail Images -->
        <div class="grid grid-cols-3 gap-4">
          <button v-for="(image, index) in product.images" :key="index" @click="selectedImageIndex = index"
            class="rounded-lg overflow-hidden border-2 transition-all cursor-pointer" :class="selectedImageIndex === index
              ? 'border-primary-500'
              : 'border-gray-200 hover:border-gray-300'
              ">
            <img :src="image" :alt="`${product.name} - Image ${index + 1}`" class="w-full h-24 object-cover" />
          </button>
        </div>
      </div>

      <!-- Product Info Section -->
      <div class="space-y-6">
        <!-- Title and Price -->
        <div class="">
          <h1 class="text-3xl font-bold mb-2 capitalize">
            {{ product.name }}
          </h1>

          <p class="text-sm font-bold">
            <span class="text-primary">Publicado Por: </span>
            {{ product.firstnameUser }} {{ product.lastnameUser }}
          </p>


        </div>
        <p class="text-2xl font-bold text-primary-600">
          {{ formatCurrency(product.price) }}
        </p>
        <!-- Tags -->
        <div class="flex flex-wrap gap-2">
          <UBadge v-for="tag in product.tags" :key="tag" color="primary" variant="subtle" class="capitalize">
            {{ tag }}
          </UBadge>
        </div>

        <!-- Description -->
        <div>
          <h2 class="text-lg font-semibold mb-2">Descripción</h2>
          <p class="leading-relaxed">
            {{ product.description }}
          </p>
        </div>

        <USeparator />

        <!-- Quantity Selector -->
        <div>
          <h3 class="text-sm font-medium text-gray-900 mb-3">Cantidad</h3>
          <div class="flex items-center space-x-4">
            <div class="flex items-center border border-gray-300 rounded-lg">
              <UButton icon="i-lucide-minus" color="neutral" variant="ghost" @click="decreaseQuantity"
                :disabled="quantity <= 1" />
              <span class="px-4 py-2 font-semibold">{{ quantity }}</span>
              <UButton icon="i-lucide-plus" color="neutral" variant="ghost" @click="increaseQuantity" />
            </div>
            <p class="text-sm text-gray-500">
              Total: {{ formatCurrency(totalPrice) }}
            </p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-3">
          <UButton @click="sendContactProduct" color="primary" size="xl" block icon="i-lucide-shopping-cart"
            label="Contactar con el publicador" />
          <UButton color="neutral" size="xl" block variant="outline" icon="i-lucide-heart"
            label="Agregar a favoritos" />
        </div>
      </div>
    </div>
  </div>
</template>