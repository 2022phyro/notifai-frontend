<script setup>
import { reactive } from 'vue'
import { RouterView } from 'vue-router'
import NavigationMenu from '@/components/NavigationMenu.vue'
import PopUp from '@/components/PopUp.vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import { inst, BASE_URL } from '@/utils/auth'
const appStore = useAppStore()
const { currApp } = storeToRefs(appStore)
const { addToApps, setCurrApp, removeFromApps } = appStore
const popup = reactive({
  visible: false,
  type: null,
  callback: null,
  url: '',
  decision: false,
  args: []
  // Add other properties here...
})

const msgB = reactive({
  del: ''
})
const set = reactive({
  del: ''
})
const closePopUp = () => {
  ;(popup.visible = false), (popup.type = null), (popup.callback = null), (popup.args = []), (popup.decision= false)
}

const handleShowMsg = (id) => {
  popup.visible = true
  popup.type = 'showMsg'
  popup.callback = async () => {
    try {
      const instance = await inst(true)
      const response = await instance.get(
        `${BASE_URL}/apps/${currApp.value._id}/notifications/${id}`
      )
      const { data } = response.data
      return data
    } catch (error) {
      console.error(error)
    }
  }
  // Update other properties here...
}
const handleDeleteMsg = (id) => {
  popup.visible = true
  popup.type = 'deleteMsg'
  popup.decision = true
  popup.callback = async () => {
    try {
      const instance = await inst(true)
      await instance.delete(`${BASE_URL}/apps/${currApp.value._id}/notifications/${id}`)
      msgB.del = id
    } catch (error) {
      console.error(error)
    } finally {
      closePopUp()
    }
  }
}
const handleNewApp = () => {
  popup.visible = true
  popup.type = 'newApp'
  popup.decision = true
  popup.callback = async (name) => {
    try {
      console.log(name)
      const instance = await inst(true)
      const response = await instance.post(`${BASE_URL}/apps/`, { name })
      const { data } = response.data
      setCurrApp(data)
      addToApps(data)
    } catch (error) {
      console.error(error)
    } finally {
      closePopUp()
    }
  }
}

const handleDeleteApp = (id, name) => {
  popup.visible = true
  popup.type = 'deleteApp'
  popup.decision = true
  popup.args = [name]
  popup.callback = async () => {
    try {
      const instance = await inst(true)
      await instance.delete(`${BASE_URL}/apps/${id}`)
      removeFromApps(id)
    } catch (error) {
      console.error(error)
    } finally {
      closePopUp()
    }
  }
}
</script>
<template>
  <div class="dashboard">
    <NavigationMenu  @newApp="handleNewApp"/>
    <header></header>
    <div class="body">
      <RouterView
        @showMsg="handleShowMsg"
        @deleteMsg="handleDeleteMsg"
        :del="msgB.del"
        @deleteApp="handleDeleteApp"
        :appDel="set.del"
      />
    </div>
  </div>
  <PopUp v-bind="popup" @closePopUp="closePopUp" />
</template>
<style scoped>
.body {
  position: absolute;
  left: 150px;
  top: 50px;
  width: calc(100vw - 150px);
  height: 100vh;
  /* border: 1px solid red; */
  overflow: scroll;
}
header {
  position: fixed;
  left: 150px;
  top: 0;
  width: calc(100vw - 150px);
  height: 50px;
  background: var(--color-background);
  box-shadow: 2px 1px 2px black;
  z-index: 1;
}
</style>
