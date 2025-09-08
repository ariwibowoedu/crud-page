<script setup>
import UiButton from '@/components/ui/UiButton.vue'
import UiSearch from '@/components/ui/UiSearch.vue'
import UiTable from '@/components/ui/UiTable.vue'
import UiPagination from '@/components/ui/UiPagination.vue'
import UiModal from '@/components/ui/UiModal.vue'

import { useCustomerStore } from '@/stores/customerStore'
import { useCustomerHandler } from '@/composables/customer/useCustomerHandler'
import { onMounted } from 'vue'

const store = useCustomerStore()
const {
  // add
  newCust,
  addModal,
  openAddModal,
  saveCust,
  // edit
  editCust,
  editModal,
  openEditModal,
  confirmEdit,
  // detail
  detailCustomer,
  detailModal,
  openDetailModal,
  // delete
  deleteModal,
  openDeleteModal,
  confirmDelete,
} = useCustomerHandler()

onMounted(() => {
  store.fetchAll()
})
</script>

<template>
  <!-- add modal -->
  <ui-modal :isOpen="addModal.isOpen.value" title="Create new customer" @close="addModal.close">
    <form @submit.prevent="saveCust" class="flex flex-col">
      <input
        v-model="newCust.name"
        type="text"
        placeholder="Customer Name"
        class="border rounded-lg px-3 py-2 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
        required
      />
      <input
        v-model="newCust.email"
        type="email"
        placeholder="Customer Email"
        class="border rounded-lg px-3 py-2 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
        required
      />
      <div class="flex items-center justify-end mt-4 gap-2">
        <ui-button @onClick="addModal.close" variant="outline">Cancel</ui-button>
        <ui-button type="submit">Save</ui-button>
      </div>
    </form>
  </ui-modal>
  <!-- edit modal -->
  <ui-modal :isOpen="editModal.isOpen.value" title="Edit data customer" @close="editModal.close">
    <form @submit.prevent="confirmEdit" class="flex flex-col">
      <input
        v-model="editCust.name"
        type="text"
        class="border rounded-lg px-3 py-2 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
        required
      />
      <input
        v-model="editCust.email"
        type="email"
        class="border rounded-lg px-3 py-2 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
        required
      />
      <div class="flex items-center justify-end gap-2 mt-2">
        <ui-button @onClick="editModal.close" variant="outline">Close</ui-button>
        <ui-button type="submit">Update</ui-button>
      </div>
    </form>
  </ui-modal>
  <!-- detail -->
  <ui-modal :isOpen="detailModal.isOpen.value" title="Detail Customer" @close="detailModal.close">
    <div class="flex items-center justify-between">
      <p class="text-md font-bold">Id</p>
      <span class="text-md font-medium">{{ detailCustomer.id }}</span>
    </div>
    <div class="flex items-center justify-between">
      <p class="text-md font-bold">Name</p>
      <span class="text-md font-medium">{{ detailCustomer.name }}</span>
    </div>
    <div class="flex items-center justify-between mb-2 border-b-2">
      <p class="text-md font-bold">Email</p>
      <span class="text-md font-medium">{{ detailCustomer.email }}</span>
    </div>
    <div class="flex items-center justify-end mt-2">
      <ui-button @onClick="detailModal.close" variant="outline">Close</ui-button>
    </div>
  </ui-modal>
  <!-- delete -->
  <ui-modal
    :isOpen="deleteModal.isOpen.value"
    title="Confirm delete customer"
    @close="deleteModal.close"
  >
    <p class="text-lg font-medium">Are you sure want to delete?</p>
    <div class="flex items-center justify-end gap-2 mt-2">
      <ui-button @onClick="deleteModal.close" variant="outline">Cancel</ui-button>
      <ui-button @onClick="confirmDelete" variant="danger">Delete</ui-button>
    </div>
  </ui-modal>
  <div class="p-4 shadow-md rounded-lg">
    <div class="flex items-center justify-between my-2">
      <h2 class="text-lg font-bold">Customer List</h2>
      <ui-button @onClick="openAddModal">Add</ui-button>
    </div>
    <div class="mb-2">
      <!-- search -->
      <ui-search v-model="store.searchQuery" placeholder="Search customer..." class="w-full" />
      <!-- table -->
      <ui-table
        :items="store.paginatedItems"
        :headers="['Id', 'Name', 'Email']"
        :fields="['id', 'name', 'email']"
      >
        <template #options="{ item }">
          <div class="flex items-center gap-2">
            <ui-button @onClick="openEditModal(item)" size="sm" variant="outline">Edit</ui-button>
            <ui-button @onClick="openDetailModal(item)" size="sm" variant="outline">View</ui-button>
            <ui-button @onClick="openDeleteModal(item.id)" size="sm" variant="danger"
              >Delete</ui-button
            >
          </div>
        </template>
      </ui-table>
      <!-- paginate -->
      <ui-pagination
        :current-page="store.currentPage"
        :total-pages="store.totalPages"
        @change="store.goToPage"
      />
    </div>
  </div>
</template>