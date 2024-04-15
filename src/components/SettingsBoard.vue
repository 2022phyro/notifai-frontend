<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { inst, BASE_URL } from '@/utils/auth'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'
import AppItem from '@/components/AppItem.vue'

const route = useRoute()
const appState = useAppStore()

const { currApp, apps } = storeToRefs(appState)
const { setApps, setCurrApp } = appState
console.log("yay", apps.value)

</script>
<template>
    <div class="app-settings-wrapper">
        <ul>
            <AppItem/>
        </ul>
    </div>
</template>
<style scoped>

</style>