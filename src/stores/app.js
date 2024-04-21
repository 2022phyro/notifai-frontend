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
  function addToApps(value) {
    apps.value.push(value)
  }
  function removeFromApps(id) {
    const newApps = apps.value.filter((app) => app._id !== id)
    if (currApp.value._id === id) {
      currApp.value = newApps[0] || {}
    }
    apps.value = newApps
  }
  return { apps, currApp, setApps, setCurrApp, addToApps, removeFromApps }
})
