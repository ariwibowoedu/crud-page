import { ref } from "vue";
import { useCustomerStore } from "@/stores/customerStore";
import { useModal } from "../useModal";
import { useToast } from '@/composables/useToast'

export function useCustomerHandler() {

    const { showToast } = useToast()
    const store = useCustomerStore()


    // add cust
    const newCust = ref({ name: '', email: '' })
    const addModal = useModal()

    const openAddModal = () => {
        addModal.open()
    }

    const saveCust = async () => {
        await store.createItem(newCust.value)
        newCust.value = { name: '', email: '' }
        addModal.close()
        showToast("New member has beed added.", "success")
    }

    // edit
    const editCust = ref({ id: null, name: '', email: '' })
    const editModal = useModal()

    const openEditModal = (customer) => {
        editCust.value = { ...customer }
        editModal.open()
    }

    const confirmEdit = async () => {
        await store.updateItem(editCust.value.id, editCust.value)
        editModal.close()
        showToast("Customer has been updated!", "success")
    }

    // see detail
    const detailCustomer = ref({ id: null, name: '', email: '' })
    const detailModal = useModal()

    const openDetailModal = (detailCust) => {
        detailCustomer.value = { ...detailCust }
        detailModal.open()
    }
    // delete
    const deleteId = ref(null)
    const deleteModal = useModal()

    const openDeleteModal = (id) => {
        deleteId.value = id
        deleteModal.open()
    }

    const confirmDelete = async () => {
        await store.deleteItem(deleteId.value)
        deleteId.value = null
        deleteModal.close()
        showToast("Customer has been deleted pemanetly!.", "success")
    }

    return {
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
        deleteId,
        deleteModal,
        openDeleteModal,
        confirmDelete

    }
}