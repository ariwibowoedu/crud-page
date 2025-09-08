import { ref } from "vue";
import { useProductStore } from "@/stores/productStore";
import { useModal } from '@/composables/useModal'
import { useToast } from "@/composables/useToast";

export function useProductHandler() {
    const store = useProductStore()
    const { showToast } = useToast()

    // add
    const newProduct = ref({ name: '', price: null })
    const addModal = useModal()

    const openAddModal = () => {
        addModal.open()
    }

    const saveProduct = async () => {
        await store.createItem(newProduct.value)
        newProduct.value = { name: '', price: null }
        addModal.close()
        showToast("Succesfully added new product", "success")
    }

    // edit
    const editProduct = ref({ id: null, name: "", price: null })
    const editModal = useModal()

    const openEditModal = (product) => {
        editProduct.value = { ...product }
        editModal.open()
    }

    const confirmEdit = async () => {
        await store.updateItem(editProduct.value.id, editProduct.value)
        editModal.close()
        showToast("Product has been updated", "success")
    }

    const detailProduct = ref({ id: null, name: "", price: null })
    const detailModal = useModal()

    const openDetailModal = (detailPro) => {
        detailProduct.value = { ...detailPro }
        detailModal.open()
    }

    // delete
    const deleteId = ref(null)
    const deleteModal = useModal()

    const openDeleteModal = (id) => {
        deleteId.value = id
        console.log("fungsi open delete di panggil")
        deleteModal.open()
    }

    const confirmDelete = async () => {
        console.log("confirm delete dipanggil")
        try {
            await store.deleteItem(deleteId.value)
            deleteId.value = null
            deleteModal.close()
            showToast("Deleted product successfully!", "success")
        } catch (err) {
            console.log("Delete Failed", err.message)
            showToast("Failed to delete data", "error")
        }
    }

    return {
        // see detail
        detailModal,
        detailProduct,
        openDetailModal,
        // add
        newProduct,
        addModal,
        openAddModal,
        saveProduct,
        //update
        editModal,
        editProduct,
        openEditModal,
        confirmEdit,
        // delete
        deleteId,
        deleteModal,
        confirmDelete,
        openDeleteModal
    }
}