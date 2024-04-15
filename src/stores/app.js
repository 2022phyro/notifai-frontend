import { ref,  } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('apps', () => {
    const currApp = ref({})
    const apps = ref([])

    function setApps(value) {
        apps.value = value
    }
    function setCurrApp(value) {
        currApp.value = value
    }
    return { apps, currApp, setApps, setCurrApp }
  })