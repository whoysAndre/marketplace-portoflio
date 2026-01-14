<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'

const emits = defineEmits<{
  (e: 'success'): void
}>();

const state = reactive({
  name: undefined,
  price: undefined,
  description: undefined,
  images: [] as File[],
  tags: undefined,
})

const isUploading = ref(false);

type Schema = typeof state

function validate(state: Partial<Schema>): FormError[] {
  const errors = []
  if (!state.name) errors.push({ name: 'name', message: 'Requerido' })
  if (!state.price) errors.push({ name: 'price', message: 'Requerido' })
  if (!state.images || state.images.length === 0) errors.push({ name: 'images', message: 'Requerido' })
  if (!state.tags) errors.push({ name: 'tags', message: 'Requerido' })
  if (!state.description) errors.push({ name: 'description', message: 'Requerido' })
  return errors
}

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    isUploading.value = true;
    const { images, price, name, description, tags } = event.data;

    const formData = new FormData();
    images.forEach((file: File) => {
      formData.append('images', file);
    });

    const { imageUrls } = await $fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });


    const { message } = await $fetch('/api/admin/products', {
      method: 'POST',
      body: {
        name,
        description,
        price: Number(price),
        images: imageUrls,
        tags
      }
    });

    toast.add({ title: 'Éxito', description: message, color: 'success' })
    emits("success");

    // Resetear formulario
    state.name = undefined;
    state.price = undefined;
    state.description = undefined;
    state.images = [];
    state.tags = undefined;

    await refreshNuxtData('products');

  } catch (error: any) {
    toast.add({
      title: 'Error',
      description: error.data?.message || 'Error al crear el producto',
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
        <UInput v-model="state.price" type="number" placeholder="0" />
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

    <div class="flex justify-center gap-4">
      <UFormField label="Imágenes" name="images" class="w-full">
        <UFileUpload v-model="state.images" multiple accept="image/*" class="w-full min-h-32" />
      </UFormField>
    </div>

    <UButton type="submit" class="w-full flex justify-center py-3" :loading="isUploading" :disabled="isUploading">
      {{ isUploading ? 'Subiendo...' : 'Registrar' }}
    </UButton>
  </UForm>
</template>