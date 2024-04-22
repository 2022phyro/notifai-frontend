import { ref } from 'vue'
import { defineStore } from 'pinia'
import { lset, ldel } from '@/utils/ls'

export const useAppStore = defineStore('apps', () => {
  const currApp = ref({})
  const apps = ref([])

  function setApps(value) {
    apps.value = value
  }
  function setCurrApp(value) {
    lset('currApp', value)
    currApp.value = value
  }
  function addToApps(value) {
    apps.value.unshift(value)
  }
  function removeFromApps(id) {
    const newApps = apps.value.filter((app) => app._id !== id)
    if (currApp.value._id === id) {
      ldel('currApp')
      if (newApps.length)
        lset('currApp', newApps[0])
      else {
        ldel('currApp')
        currApp.value = {}
      }
    }
    apps.value = newApps
  }
  return { apps, currApp, setApps, setCurrApp, addToApps, removeFromApps }
})
