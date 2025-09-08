<script setup>
import { onMounted } from 'vue'
import { useProductStore } from '@/stores/productStore'
import { useProductHandler } from '@/composables/product/useProductHandler'

import UiSearch from '@/components/ui/UiSearch.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiModal from '@/components/ui/UiModal.vue'
import UiTable from '@/components/ui/UiTable.vue'
import UiPagination from '@/components/ui/UiPagination.vue'

const store = useProductStore()
const {
  detailModal,
  detailProduct,
  openDetailModal,
  addModal,
  saveProduct,
  openAddModal,
  newProduct,
  openDeleteModal,
  deleteModal,
  confirmDelete,
  editModal,
  editProduct,
  openEditModal,
  confirmEdit,
} = useProductHandler()

onMounted(() => {
  store.fetchAll()
})
</script>

<template>
  <div class="p-4 rounded-lg shadow-md">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-bold">Product List</h2>
      <ui-button @onClick="openAddModal">Add</ui-button>
    </div>
    <div class="mb-2">
      <!-- search -->
      <ui-search v-model="store.searchQuery" placeholder="Search products...." class="w-full" />
      <!-- table -->
      <ui-table
        :items="store.paginatedItems"
        :headers="['Id', 'Name', 'Price']"
        :fields="['id', 'name', 'price']"
        :loading="store.loading"
      >
        <template #options="{ item }">
          <div class="flex items-center gap-2">
            <ui-button @onClick="openDeleteModal(item.id)" size="sm" variant="danger">
              Delete
            </ui-button>
            <ui-button @onClick="openEditModal(item)" size="sm" variant="outline">Edit</ui-button>
            <ui-button @onClick="openDetailModal(item)" size="sm" variant="outline">View</ui-button>
          </div>
        </template>
      </ui-table>
      <!-- pagination -->
      <ui-pagination
        :currentPage="store.currentPage"
        :totalPages="store.totalPages"
        @change="store.goToPage"
      />
    </div>
  </div>

  <!-- see details -->
  <ui-modal :isOpen="detailModal.isOpen.value" title="Details Product" @close="detailModal.close">
    <p class="text-md">
      Id: <strong>{{ detailProduct.id }}</strong>
    </p>
    <p class="text-md">
      Name: <strong>{{ detailProduct.name }}</strong>
    </p>
    <p class="text-md">
      Price: <strong>{{ detailProduct.price }}</strong>
    </p>
    <div class="flex justify-end mt-4">
      <ui-button @onClick="detailModal.close" variant="outline">Close</ui-button>
    </div>
  </ui-modal>

  <!-- edit modal -->
  <ui-modal :isOpen="editModal.isOpen.value" title="Edit data product" @close="editModal.close">
    <form @submit.prevent="confirmEdit" class="flex flex-col">
      <input
        v-model="editProduct.name"
        type="text"
        class="border rounded-lg px-3 py-2 transition focus:outline-none focus:ring-indigo-500 mb-2"
      />
      <input
        v-model="editProduct.price"
        type="number"
        class="border rounded-lg px-3 py-2 transition focus:outline-none focus:ring-indigo-500 mb-2"
      />
      <div class="flex items-center justify-end gap-2 mt-4">
        <ui-button @onClick="editModal.close" variant="outline">Cancel</ui-button>
        <ui-button type="submit">Update</ui-button>
      </div>
    </form>
  </ui-modal>

  <!-- delete modal -->
  <ui-modal :isOpen="deleteModal.isOpen.value" title="Confirm Delete" @close="deleteModal.close">
    <p class="text-xl text-gray-500">Are you sure want to delete?</p>
    <div class="flex items-center justify-end mt-4 gap-2">
      <ui-button @onClick="deleteModal.close" variant="outline">Cancel</ui-button>
      <ui-button @onClick="confirmDelete" variant="danger">Delete</ui-button>
    </div>
  </ui-modal>

  <!-- add modal -->
  <ui-modal :isOpen="addModal.isOpen.value" title="Create new product" @close="addModal.close">
    <form @submit.prevent="saveProduct" class="flex flex-col gap-2">
      <input
        type="text"
        v-model="newProduct.name"
        class="border rounded-lg px-3 py-2 transition focus:outline-none focus:ring-2 focus:border-r-indigo-500"
        placeholder="Name"
        required
      />
      <input
        type="number"
        v-model="newProduct.price"
        class="border rounded-lg px-3 py-2 transition focus:outline-none focus:ring-2 focus:border-r-indigo-500"
        placeholder="Price"
        required
      />
      <div class="flex items-center justify-end gap-2 mt-4">
        <ui-button @onClick="addModal.close" variant="outline">Close</ui-button>
        <ui-button type="submit">Save</ui-button>
      </div>
    </form>
  </ui-modal>
</template>