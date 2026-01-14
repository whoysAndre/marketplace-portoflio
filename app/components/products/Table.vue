<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';
import { h, resolveComponent } from 'vue';
import type { Row } from '@tanstack/vue-table'

const props = defineProps<{
  products: ProductDashboard[]
}>();

const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const isViewModalOpen = ref(false);
const isUpdateModalOpen = ref(false);
const selectedProduct = ref<ProductDashboard | null>(null);

const columns: TableColumn<ProductDashboard>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => row.original.name,
  },
  {
    accessorKey: 'price',
    header: 'Precio',
    cell: ({ row }) => `s/. ${row.original.price}`,
  },
  {
    accessorKey: 'description',
    header: 'Descripción',
    cell: ({ row }) => `${row.original.description}`,
  },
  {
    accessorKey: 'isActive',
    header: 'Estado',
    cell: ({ row }) => {

      const status = row.original.isActive;

      return h('span', {
        class: `capitalize px-3 py-1 rounded-full text-xs font-medium ${status
          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
          : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`
      }, status ? 'Activo' : 'Inactivo');
    },
  },
  {
    id: 'actions',
    meta: {
      class: {
        td: 'text-right'
      }
    },
    cell: ({ row }) => {
      return h(
        UDropdownMenu,
        {
          content: {
            align: 'end'
          },
          items: getRowItems(row),
          'aria-label': 'Actions dropdown'
        },
        () =>
          h(UButton, {
            icon: 'i-lucide-ellipsis-vertical',
            color: 'neutral',
            variant: 'ghost',
            'aria-label': 'Actions dropdown'
          })
      )
    }
  }
];

function getRowItems(row: Row<ProductDashboard>) {
  return [
    {
      type: 'label',
      label: 'Acciones'
    },
    {
      label: 'Editar',
      onSelect() {

        isUpdateModalOpen.value = true;
        selectedProduct.value = row.original;

      }
    },
    {
      label: 'Ver detalle',
      onSelect() {
        isViewModalOpen.value = true;
        selectedProduct.value = row.original;
      }
    },
    // {
    //   label: 'Eliminar',
    //   async onSelect() {
    //     const id = row.original.id;
    //     await $fetch(`/api/products/${id}`, {
    //       method: 'DELETE'
    //     });
    //     await refreshNuxtData('products');
    //   }
    // },
  ]
}

const table = useTemplateRef('table')
const columnFilters = ref([
  {
    id: 'name',
    value: ''
  }
])
</script>
<template>

  <div class="flex flex-col flex-1 w-full">
    <div class="flex py-3.5 ">
      <UInput :model-value="table?.tableApi?.getColumn('name')?.getFilterValue() as string" class="max-w-sm"
        placeholder="Filtrar por nombre..."
        @update:model-value="table?.tableApi?.getColumn('name')?.setFilterValue($event)" />
    </div>
    <UTable ref="table" :data="products" v-model:column-filters="columnFilters" :columns="columns"
      class="flex-1 border border-neutral-700 rounded" />
  </div>


  <!-- Details  -->
  <UModal :open="isViewModalOpen" @update:open="isViewModalOpen = $event" title="Detalle del Producto"
    description="Ve los detalles de tu producto">
    <template #body>
      <ProductsViewDetails v-if="selectedProduct" :product="selectedProduct" />
    </template>
  </UModal>

  <!-- Update Modal -->
  <UModal :open="isUpdateModalOpen" @update:open="isUpdateModalOpen = $event" title="Actualizar Producto"
    description="Edita la información de tu producto">
    <template #body>
      <ProductsUpdateForm v-if="selectedProduct" :product="selectedProduct" @success="isUpdateModalOpen = false" />
    </template>
  </UModal>


</template>
