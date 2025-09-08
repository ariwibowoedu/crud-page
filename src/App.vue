<script setup>
import { ref } from 'vue'
import UiToast from './components/ui/UiToast.vue'
import HeaderCo from './components/layouts/HeaderCo.vue'
import NavlinkCo from './components/layouts/NavlinkCo.vue'
import FooterCo from './components/layouts/FooterCo.vue'

const openNav = ref(false)

function toggleNav() {
  openNav.value = !openNav.value
}
</script>

<template>
  <header-co @close="toggleNav" />
  <div class="flex flex-1">
    <aside
      class="fixed top-0 left-0 h-screen w-64 bg-light border-r-4 border-primary shadow-lg p-6 transform transition-transform duration-300 z-30 md:translate-x-0 mt-20"
      :class="openNav ? 'translate-x-0' : '-translate-x-full'"
    >
      <nav>
        <ul class="space-y-3">
          <navlink-co @close="toggleNav" />
        </ul>
      </nav>
    </aside>
  </div>
  <main class="flex-1 p-6 md:ml-64">
    <router-view />
  </main>
  <footer-co />
  <ui-toast />
</template>