<template>
  <div class="flex h-screen bg-gray-50">
    <aside
      :class="[
        'fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 z-40 ease-in-out',
        { '-translate-x-full': !isSidebarOpen, 'translate-x-0': isSidebarOpen },
      ]"
    >
      <div class="h-16 flex items-center px-4 border-b">
        <logo-brand />
        <button @click="toggleSidebar" class="md:hidden">X</button>
      </div>
      <nav class="p-4 space-y-2">
        <navlink-co />
      </nav>
    </aside>
    <div
      v-if="isSidebarOpen"
      @click="toggleSidebar"
      class="fixed inset-0 bg-black bg-opacity-0 z-40 md:hidden"
    >
      <div class="flex-1 flex-col ml-0 md:ml-64">
        <header class="flex items-center justify-between bg-white shadow px-4 py-2">
          <button @click="toggleSidebar" class="md:hidden">☰</button>
          <logo-brand />
        </header>
        <main class="flex-1 p-6">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import LogoBrand from './LogoBrand.vue'
import NavlinkCo from './NavlinkCo.vue'

const isSidebarOpen = ref(false)

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>