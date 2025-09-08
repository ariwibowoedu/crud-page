<template>
  <div class="p-4" v-if="customer">
    <h3 class="text-lg font-bold mb-4">Detail Customer</h3>
    <p class="text-md">Id: {{ customer.id }}</p>
    <p class="text-md">Name: {{ customer.name }}</p>
    <p class="text-md">Email: {{ customer.email }}</p>
    <hr class="py-4" />
    <router-link to="/customers">
      <ui-button variant="outline" size="sm">Back</ui-button>
    </router-link>
    <ui-button @click="openDeleteCust(customer.id)" variant="danger" size="sm">Delete</ui-button>
    <ui-button @click="openEditCustModal(customer)" variant="outline" size="sm">Edit</ui-button>
  </div>
  <div v-else class="p-4">
    <p class="text-cennter text-gray-400">Data Not Found</p>
  </div>

  <!-- delete model -->

  <ui-modal :isOpen="deleteModal.isOpen.value" title="Confirm delete" @close="deleteModal.close">
    <p class="text-lg font-thin mb-4">
      Are you sure want to delete <strong>{{ customer.name }}</strong> ?
    </p>
    <div class="flex items-center justify-end gap-2">
      <ui-button @click="deleteModal.close" variant="outline">Cancel</ui-button>
      <ui-button @click="confirmDeleteCust" variant="danger">Delete</ui-button>
    </div>
  </ui-modal>

  <!-- edit modal -->

  <ui-modal
    :isOpen="editCustModal.isOpen.value"
    title="Edit data customer"
    @close="editCustModal.close"
  >
    <form @submit.prevent="confirmUpdate" class="flex flex-col">
      <div class="flex flex-col gap-2 mb-4">
        <input
          class="border rounded-lg px-3 py-2 transition focus:outline-none focus:ring-offset-1"
          type="text"
          v-model="editCust.name"
        />
        <input
          class="border rounded-lg px-3 py-2 transition focus:outline-none focus:ring-offset-1"
          type="email"
          v-model="editCust.email"
        />
      </div>
      <div class="flex items-center justify-end gap-2">
        <ui-button @click="editCustModal.close" variant="outline">Close</ui-button>
        <ui-button type="submit">Update</ui-button>
      </div>
    </form>
  </ui-modal>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCustomerStore } from '@/stores/customerStore'
import { useCustomerHandler } from '@/composables/customer/useCustomerHandler'

import UiButton from '@/components/ui/UiButton.vue'
import UiModal from '@/components/ui/UiModal.vue'

// const customer = ref({})
const store = useCustomerStore()
const route = useRoute()
const customer = ref([])

const {
  openDeleteCust,
  deleteModal,
  confirmDeleteCust,
  editCustModal,
  openEditCustModal,
  editCust,
  confirmUpdate,
} = useCustomerHandler()

onMounted(async () => {
  try {
    customer.value = await store.fetchById(route.params.id) // API langsung ambil 1 data
  } catch (err) {
    console.error(err)
  }
})
</script>

<style>
</style>