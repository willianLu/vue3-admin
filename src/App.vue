<template>
  <RouterView v-slot="{ Component }">
    <component :is="Component"></component>
  </RouterView>
</template>
<script setup lang="ts">
defineOptions({
  name: 'AppContainer'
})
</script>
<style>
#app {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  font-size: 24px;
  overflow-y: auto;
  box-shadow: 0 0 6px 2px #ddd;
}
</style>
