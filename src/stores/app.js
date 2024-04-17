import { ref } from 'vue'
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
  function addToApps(value, reason) {
    if (reason && reason === 'remove') {
      const newApps = apps.value.filter((app) => app.id !== value)
      if (currApp.value.id === value) {
        currApp.value = newApps[0] || {}
      }
      apps.value = newApps
    } else {
      apps.value.push(value)
    }
  }
  return { apps, currApp, setApps, setCurrApp, addToApps }
})
