<template>
  <li v-for="route in routes" :key="route.path" class="list-none">
    <router-link
      :to="route.path"
      @click="closeMenu"
      class="flex items-center gap-2 p-2 rounded-lg text-lg font-light tracking-wider hover:outline transition"
      :class="{
        'bg-dark text-light': $route.path === route.path,
      }"
    >
      {{ route.name }}
    </router-link>
  </li>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const emit = defineEmits(['close'])
const router = useRouter()

const routes = computed(() => router.options.routes.filter((route) => route.name))

const closeMenu = () => {
  emit('close')
}
</script>

<style>
</style>