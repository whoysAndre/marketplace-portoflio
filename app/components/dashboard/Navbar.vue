<script setup lang="ts">

const { logout } = useAuthentication();

const breadcrumbItems = [
  {
    label: 'Dashboard',
    icon: 'i-lucide-layout-dashboard',
  },
  {
    label: 'Inicio',
    icon: 'i-lucide-house',
  },
];



</script>

<template>
  <div class="border-b border-default bg-primary/10 sticky top-0 z-10">
    <div class="flex items-center justify-between px-6 py-4">
      <!-- Left Side: Breadcrumb or Title -->
      <div class="flex-1">
        <UBreadcrumb :items="breadcrumbItems" :ui="{ list: 'text-sm font-medium' }" />
      </div>

      <!-- Right Side: Actions and User Menu -->
      <div class="flex items-center gap-4 ms-auto">
        <!-- Notification Bell -->
        <UButton icon="i-lucide-bell" color="neutral" variant="ghost" square class="h-8 w-8" to="/dashboard/messages"/>
        <!-- Divider -->
        <USeparator orientation="vertical" class="h-6" />
        <UButton color="primary" variant="ghost" label="Cerrar Sessión" @click="logout" />
      </div>
    </div>
  </div>
</template>