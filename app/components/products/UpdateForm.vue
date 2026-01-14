<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'

const props = defineProps<{
  product: ProductDashboard
}>();

const emits = defineEmits<{
  (e: 'success'): void
}>();

const state = reactive({
  name: props.product.name,
  price: props.product.price,
  description: props.product.description,
  images: [] as File[],
  existingImages: [...props.product.images],
  tags: props.product.tags.join(','),
  is_active: props.product.isActive,
})

const isUploading = ref(false);

type Schema = typeof state

function validate(state: Partial<Schema>): FormError[] {
  const errors = []
  if (!state.name) errors.push({ name: 'name', message: 'Requerido' })
  if (!state.price || state.price < 0) errors.push({ name: 'price', message: 'Precio inválido' })
  if (!state.existingImages || state.existingImages.length === 0 && (!state.images || state.images.length === 0)) {
    errors.push({ name: 'images', message: 'Debe tener al menos una imagen' })
  }
  if (!state.tags) errors.push({ name: 'tags', message: 'Requerido' })
  if (!state.description) errors.push({ name: 'description', message: 'Requerido' })
  return errors
}

const toast = useToast()

const removeExistingImage = (index: number) => {
  state.existingImages.splice(index, 1);
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    isUploading.value = true;
    const { images, price, name, description, tags, existingImages, is_active } = event.data;

    let allImageUrls = [...existingImages];

    if (images && images.length > 0) {
      const formData = new FormData();
      images.forEach((file: File) => {
        formData.append('images', file);
      });

      const { imageUrls } = await $fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      allImageUrls = [...allImageUrls, ...imageUrls];
    }

    const { message } = await $fetch(`/api/admin/products/${props.product.id}`, {
      method: 'PATCH',
      body: {
        name,
        description,
        price: Number(price),
        images: allImageUrls,
        tags,
        is_active // 👈 Cambiado
      }
    });

    toast.add({ title: 'Éxito', description: message, color: 'success' })
    emits("success");

    await refreshNuxtData('products');

  } catch (error: any) {
    console.error('Error updating product:', error);
    toast.add({
      title: 'Error',
      description: error.data?.message || 'Error al actualizar el producto',
      color: 'error'
    })
  } finally {
    isUploading.value = false;
  }
}
</script>

<template>
  <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
    <div class="flex gap-4">
      <UFormField label="Nombre" name="name" class="flex-1">
        <UInput v-model="state.name" placeholder="Pantalón" />
      </UFormField>
      <UFormField label="Precio" name="price" class="flex-1">
        <UInput v-model="state.price" type="number" placeholder="0" step="0.01" />
      </UFormField>
    </div>

    <div class="flex gap-4">
      <UFormField label="Descripción" name="description" class="flex-1">
        <UTextarea v-model="state.description" placeholder="Producto elaborado con material duradero" />
      </UFormField>
      <UFormField label="Tags" name="tags" class="flex-1">
        <UInput v-model="state.tags" placeholder="old,rojo,2025" />
      </UFormField>
    </div>

    <!-- Estado del producto con UCheckbox -->
    <UFormField label="Estado" name="is_active">
      <UCheckbox v-model="state.is_active" label="Producto activo" />
    </UFormField>

    <!-- Imágenes existentes -->
    <div v-if="state.existingImages.length > 0">
      <h3 class="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
        Imágenes actuales ({{ state.existingImages.length }})
      </h3>
      <div class="grid grid-cols-3 gap-3">
        <div v-for="(image, i) in state.existingImages" :key="i" class="relative group">
          <img :src="image" :alt="`Imagen ${i + 1}`"
            class="aspect-square object-cover rounded-lg border border-neutral-200 dark:border-neutral-800" />
          <button type="button" @click="removeExistingImage(i)"
            class="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            title="Eliminar imagen">
            <UIcon name="i-lucide-x" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Nuevas imágenes -->
    <UFormField label="Agregar nuevas imágenes" name="images" class="w-full">
      <UFileUpload v-model="state.images" multiple accept="image/*" class="w-full min-h-32" />
      <template #hint>
        <span class="text-xs text-neutral-500">
          Las nuevas imágenes se agregarán a las existentes
        </span>
      </template>
    </UFormField>

    <div class="flex gap-2 pt-2">
      <UButton type="submit" class="flex-1 flex justify-center py-3" :loading="isUploading" :disabled="isUploading">
        {{ isUploading ? 'Actualizando...' : 'Actualizar Producto' }}
      </UButton>
    </div>
  </UForm>
</template>