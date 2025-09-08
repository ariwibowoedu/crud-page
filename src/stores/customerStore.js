import { defineStore } from "pinia";
import { useCrud } from "@/composables/useCrud";

export const useCustomerStore = defineStore('customer', () => {
    return {
        ...useCrud("customers")
    }
})