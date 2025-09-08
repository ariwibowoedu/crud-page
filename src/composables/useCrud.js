import { computed, ref } from "vue";
import api from '@/services/api'
import { useToast } from '@/composables/useToast'

export function useCrud(endpoint) {

    const { showToast } = useToast()
    const items = ref([])
    const loading = ref(false)
    const error = ref(null)
    // state query
    const searchQuery = ref('')
    // state pagination
    const currentPage = ref(1)
    const itemsPerPage = ref(8)

    const fetchAll = async () => {
        loading.value = true
        try {
            const res = await api.get(`/${endpoint}`)
            items.value = res.data
            console.log("success fetch data");
        } catch (err) {
            error.value = err
            console.log("failed to fetch data")
            showToast("Failed to fetch data. Call the authority.", "error")
        } finally {
            loading.value = false
        }
    }

    const fetchById = async (id) => {
        try {
            const res = await api.get(`/${endpoint}/${id}`)
            return res.data
        } catch (err) {
            error.value = err
            showToast("error to fetch data", "error")
        }
    }

    const createItem = async (data) => {
        const newItem = {
            id: Date.now().toString(16),
            ...data,
        }
        const res = await api.post(`/${endpoint}`, newItem)
        items.value.push(res.data)
        console.log("success create data")
        return res.data
    }

    const updateItem = async (id, data) => {
        const res = await api.put(`/${endpoint}/${id}`, data)
        const idx = items.value.findIndex(i => i.id === id)
        if (idx !== -1) {
            items.value[idx] = res.data
        }
        console.log("success update data")
        return res.data
    }

    const deleteItem = async (id) => {
        try {
            await api.delete(`/${endpoint}/${id}`)
            items.value = items.value.filter(item => item.id !== id)
            console.log("success delete item")
        } catch (err) {
            console.error("Delete failed: ", err.message)
            throw err
        }
    }

    const filteredItems = computed(() => {
        if (!searchQuery.value) return items.value

        const result = items.value.filter(item => {
            const match = Object.values(item).some(value =>
                String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
            )
            return match
        })
        return result
    })

    const totalPages = computed(() =>
        Math.ceil(filteredItems.value.length / itemsPerPage.value)
    )

    const paginatedItems = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage.value
        const end = start + itemsPerPage.value
        return filteredItems.value.slice(start, end)
    })

    function goToPage(page) {
        if (page >= 1 && page <= totalPages.value) {
            currentPage.value = page
        }
    }


    return {
        items,
        loading,
        error,
        searchQuery,
        fetchAll,
        fetchById,
        updateItem,
        createItem,
        deleteItem,
        filteredItems,
        paginatedItems,
        totalPages,
        currentPage,
        itemsPerPage,
        goToPage
    }

}