<script setup lang="ts">
const { data, pending } = await useFetch('/api/admin/messages', {
  key: 'messages'
})
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold text-neutral-900 dark:text-white">
        Mensajes recibidos
      </h1>
      <p class="text-neutral-600 dark:text-neutral-400 mt-2">
        Personas interesadas en tus productos se han puesto en contacto contigo.
      </p>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="space-y-4">
      <USkeleton class="h-24 w-full" />
      <USkeleton class="h-24 w-full" />
    </div>

    <!-- Empty -->
    <UAlert v-else-if="!data?.messages?.length" color="neutral" variant="soft" title="No tienes mensajes"
      description="Cuando alguien se interese en tus productos, los verás aquí." />

    <!-- Messages -->
    <div v-else class="grid grid-cols-1 gap-4">
      <DashboardMessageCard v-for="message in data.messages" :key="message.id" :message="message" />
    </div>
  </div>
</template>
