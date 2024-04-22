import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useKeysStore = defineStore('keys', () => {
  const keys = ref([])

  function setKeys(value) {
    keys.value = value
  }
  function addToKeys(value) {
    keys.value.unshift(value)
  }
  function removeFromKeys(name) {
    const newKeys = keys.value.filter((key) => key.name !== name)
    keys.value = newKeys
  }
  function modifyKey(name, value) {
    const newKeys = keys.value.map((key) => {
      if (key.name === name) {
        return value
      }
      return key
    })
    keys.value = newKeys
  }
  return { keys, setKeys, addToKeys, removeFromKeys, modifyKey }
})
