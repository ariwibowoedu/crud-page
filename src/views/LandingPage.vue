<template>
  <ui-button @onClick="btnClick" variant="danger">Click</ui-button>
</template>

<script setup>
import UiButton from '@/components/ui/UiButton.vue'

function btnClick() {
  console.log('btn click')
}
</script>

