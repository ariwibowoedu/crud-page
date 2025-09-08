<template>
  <div class="flex items-center justify-start gap-2 mt-4">
    <button
      class="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      :disabled="currentPage === 1"
      @click="$emit('change', currentPage - 1)"
    >
      Prev
    </button>
    <span class="px-3 py-1"> Page {{ currentPage }} of {{ totalPages }} </span>
    <button
      class="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      :disabled="currentPage === totalPages"
      @click="$emit('change', currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>

<script setup>
defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
})

defineEmits(['change'])
</script>