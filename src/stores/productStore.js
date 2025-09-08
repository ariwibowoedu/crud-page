import { defineStore } from "pinia";
import { useCrud } from "@/composables/useCrud";

export const useProductStore = defineStore('product', () => {
    return {
        ...useCrud("products")
    }

})