<script setup lang="ts">

const props = defineProps<{
  message: Message
}>()

const { data: user, pending } = useFetch(() =>
  `/api/user/${props.message.buyer_id}`
)
</script>

<template>
  <UCard class="border border-neutral-200 dark:border-neutral-800" :ui="{ body: 'p-4' }">
    <div class="flex items-start justify-between gap-4">
      <!-- Info -->
      <div class="space-y-2">
        <!-- Nombre del interesado -->
        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">
          Mensaje de:
          <span class="text-primary">
            <template v-if="!pending && user">
              {{ user.user.firstname }} {{ user.user.lastname }}
            </template>
            <template v-else>
              Cargando...
            </template>
          </span>
        </h3>

        <p class="text-sm text-neutral-600 dark:text-neutral-400">
          Interés en:
          <span class="font-medium text-neutral-900 dark:text-white">
            {{ message.name_product }}
          </span>
        </p>

        <p class="text-sm text-neutral-600 dark:text-neutral-400">
          Cantidad solicitada:
          <span class="font-medium text-neutral-900 dark:text-white">
            {{ message.quantity }}
          </span>
        </p>

        <p class="text-sm text-neutral-600 dark:text-neutral-400">
          Total estimado:
          <span class="font-semibold text-primary">
            S/. {{ message.price.toFixed(2) }}
          </span>
        </p>
      </div>

      <!-- Badge -->
      <div class="flex flex-col gap-2">
        <UBadge color="primary" variant="soft">
          Nuevo mensaje
        </UBadge>
      </div>
    </div>
  </UCard>
</template>
