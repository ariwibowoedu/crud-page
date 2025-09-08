<template>
  <div class="w-full overflow-x-auto">
    <table class="w-full mt-2 min-w-max">
      <thead>
        <tr class="bg-gray-100 text-left">
          <th v-for="head in headers" :key="head" class="p-2">{{ head }}</th>
          <th class="p-2 mb-2">Option</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="loading">
          <tr>
            <td :colspan="headers.length + 1" class="p-3 text-center text-yellow-600">
              <ui-loader />
            </td>
          </tr>
        </template>
        <template v-else-if="items.length > 0">
          <tr v-for="item in items" :key="item.id" class="hover:bg-gray-300 text-left">
            <td v-for="field in fields" :key="field" class="p-1">{{ item[field] }}</td>
            <td class="p-1 text-left">
              <slot name="options" :item="item" />
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td :colspan="headers.length + 1" class="p-3 text-center text-yellow-600">
              Data not found
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import UiLoader from '@/components/ui/UiLoader.vue'
defineProps({
  headers: Array,
  fields: Array,
  items: Array,
  loading: { type: Boolean, default: false },
})
</script>

<style>
</style>