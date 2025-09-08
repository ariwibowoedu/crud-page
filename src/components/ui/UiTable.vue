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
        <tr v-for="item in items" :key="item.id" class="hover:bg-gray-300 text-left">
          <td v-for="field in fields" :key="field" class="p-1">{{ item[field] }}</td>
          <td class="p-1 text-left">
            <slot name="options" :item="item" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  headers: Array,
  fields: Array,
  items: Array,
})
</script>

<style>
</style>