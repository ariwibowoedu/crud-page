<template>
  <header
    class="w-full bg-light text-dark shadow flex items-center justify-between px-6 py-4 sticky top-0 z-40"
  >
    <LogoBrand />
    <div class="flex items-center gap-4">
      <img
        src="https://i.pravatar.cc/40"
        alt="profile"
        class="hidden md:block w-10 h-10 rounded-full border"
      />
      <button class="md:hidden" @click="toggleMenu">
        <feather-icon classes="w-6 h-6" icon="menu" />
      </button>
    </div>
  </header>
</template>

<script setup>
import FeatherIcon from '@/components/util/FeatherIcon.vue'
import LogoBrand from '@/components/layouts/LogoBrand.vue'

const emit = defineEmits(['close'])

const toggleMenu = () => {
  emit('close')
}
</script>

<style>
</style>