<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/BaseHeader.vue'
</script>
<template>
  <Header />
  <div class="auth">
    <RouterView />
  </div>
</template>
<style scoped>
.auth {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
  align-content: center;
  justify-items: center;
}
</style>
