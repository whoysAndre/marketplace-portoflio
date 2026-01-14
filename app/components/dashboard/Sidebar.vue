<script setup lang="ts">
// https://ui.nuxt.com/docs/components/dashboard-sidebar
import type {
  CommandPaletteGroup,
  CommandPaletteItem,
  NavigationMenuItem
} from '#ui/types'

const items: NavigationMenuItem[][] = [
  [
    {
      label: 'Inicio',
      icon: 'i-lucide-house',
      to: '/dashboard',
      exact: true,
    },
    {
      label: 'Productos',
      icon: 'i-lucide-inbox',
      badge: '4',
      to: '/dashboard/products',
      exact: false,
    },
    {
      label: 'Contactos',
      icon: 'i-lucide-users',
      to: '/dashboard/contacts',
    }
  ],
]

const searchGroups = ref<CommandPaletteGroup<CommandPaletteItem>[]>([
  {
    label: 'Productos',
    id: 'products',
    highlightedIcon: 'i-lucide-box',
    items: [
      {
        label: 'Nuevo Producto',
        id: 'new-product',
        icon: 'i-lucide-plus',
        to: '/dashboard/products/new',
      },
    ],
  },
])
</script>

<template>
  <UDashboardSidebar collapsible resizable :ui="{ footer: 'border-t border-default' }">
    <template #header="{ collapsed }" class="flex items-center gap-2">
      <UDashboardSidebarCollapse variant="subtle" />

    </template>

    <template #default="{ collapsed }">
      <UDashboardSearchButton />
      <UDashboardSearch title="Buscar" :groups="searchGroups" />

      <UNavigationMenu :collapsed="collapsed" :items="items[0]" orientation="vertical" />
      <UNavigationMenu :collapsed="collapsed" :items="items[1]" orientation="vertical" class="mt-auto" />

      <div class="">
        <UDashboardSidebarCollapse color="neutral" variant="ghost" square class="w-full"
          :title="collapsed ? 'Expandir' : 'Contraer'" />
      </div>
    </template>
  </UDashboardSidebar>
</template>