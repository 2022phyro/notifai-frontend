<script setup>
import MainLoader from '@/components/MainLoader.vue'
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(false)
onBeforeMount(() => {
  router.beforeEach((to, from, next) => {
    isLoading.value = to.matched.length === 1 && to.matched[0].path === to.path
    next()
  })

  router.afterEach(() => {
    setTimeout(() => {
      isLoading.value = false
    }, 2000) // Delay of 3 seconds
  })
})
</script>

<template>
  <MainLoader v-if="isLoading" />
  <RouterView v-else />
</template>

<style scoped></style>
