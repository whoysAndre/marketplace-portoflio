<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const { isLoggedIn } = useAuthentication();


const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Productos',
    to: '/products',
    active: route.path.startsWith('/products')
  },
  {
    label: 'Comunidad',
    to: '/community',
    active: route.path.startsWith('/community')
  },
  {
    label: 'Conócenos',
    to: '/about',
    active: route.path.startsWith('/about')
  },

])
</script>

<template>
  <UHeader>
    <template #title>
      <h1 class="text-primary">Shop</h1>
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <UColorModeButton />


      <ClientOnly>
        <NuxtLink v-if="!isLoggedIn" to="/auth/login" class="flex ml-4">
          <Icon name="lucide:circle-user-round" class="w-5 h-5" />
        </NuxtLink>


        <NuxtLink v-else to="/dashboard" class="flex ml-4">
          <Icon name="lucide:layout-dashboard" class="w-5 h-5" />
        </NuxtLink>
      </ClientOnly>

    </template>
  </UHeader>
</template>
