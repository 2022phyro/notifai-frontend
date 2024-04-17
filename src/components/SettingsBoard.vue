<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { inst, BASE_URL } from '@/utils/auth'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'
import { ref, watch } from 'vue'
import AppItem from '@/components/AppItem.vue'
const emit = defineEmits(['deleteApp'])
const props = defineProps({
    appDel: String
})
const route = useRoute()
const appState = useAppStore()

const { currApp, apps } = storeToRefs(appState)
const { setApps, setCurrApp } = appState

const handleDeleteApp = (id, name) => {
    emit('deleteApp', id, name)
}

</script>
<template>
  <div class="app-settings-wrapper">
    <AppItem v-for="(app, index) in apps" v-bind="app" :key="index" @deleteApp="handleDeleteApp"/>
  </div>
</template>
<style scoped>
.app-settings-wrapper {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    align-items: flex-start;
    gap: 20px;
    padding: 30px;
}
</style>
