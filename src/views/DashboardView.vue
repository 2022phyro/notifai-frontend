<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import NavigationMenu from '@/components/NavigationMenu.vue'
import PopUp from '@/components/PopUp.vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import { inst, BASE_URL } from '@/utils/auth'
const appStore = useAppStore()
const { currApp, apps } = storeToRefs(appStore)
const { addToApps, setCurrApp, removeFromApps, setApps } = appStore
const popup = reactive({
  visible: false,
  type: null,
  callback: null,
  url: '',
  decision: false,
  args: []
  // Add other properties here...
})
onMounted(async () => {
  try {
    const instance = await inst(true)
    const response = await instance.get(`${BASE_URL}/apps`)
    setApps(response.data.data)
    setCurrApp(apps.value[0])
  } catch (error) {
    console.log(error)
  }
})

const showApps = ref(false) // New ref for showing the apps
const search = ref('')
const appList = computed(() => {
  return apps.value.filter(app => app.name.includes(search.value))
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
const setApp = (app) => {
  setCurrApp(app)
}
const closeApps = () => {
  showApps.value = !showApps.value
  search.value = ''
}
</script>
<template>
  <div class="dashboard">
    <NavigationMenu  @newApp="handleNewApp"/>
    <header>
      <RouterLink to="/" class="logo">
      <img alt="Vue logo" src="/logo.png" width="125" height="125" />
      <span>NotifAI</span>
    </RouterLink>
    <div class="apps">
    <p class="current" @click="closeApps">
      <span>{{ currApp.name }}</span>
      <fa-icon :icon="['fas', showApps? 'caret-up': 'caret-down']"/>
      </p>
    <ul v-if="showApps">
      <div class="search"><fa-icon :icon="['fas', 'magnifying-glass']"/><input v-model="search"></div>
      <li v-for="app in appList" :key="app._id" :class="{'btn': true, 'curr': currApp === app}" @click="setApp(app)">
        <fa-icon :icon="['fas', 'mobile-screen-button']" v-if="currApp === app" />{{ app.name }}
      </li>
    </ul>
  </div>
    </header>
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
.dashboard {
  overflow: hidden;
}
.body {
  position: absolute;
  left: 150px;
  top: 50px;
  width: calc(100vw - 150px);
  height: calc(100vh - 50px);
  /* border: 1px solid red; */
  overflow: auto;
}
header {
  position: fixed;
  left: 0px;
  top: 0;
  width: calc(100vw - 0px);
  height: 50px;
  background: var(--color-background);
  box-shadow: 2px 1px 2px black;
  z-index: 1;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: visible;
}
.logo {
  /* margin-top: 20px; */
  align-self: center;
  color: var(--primary);
  font-size: 24px;
  font-weight: 600px;
  gap: 10px;
  padding-left: 20px;
}
.logo img {
  width: 30px;
  height: 30px;
  border: 1px solid var(--primary);
  border-radius: 50%;
}
.apps {
  border: 1px solid var(--primary);
  width: 170px;
  background: var(--color-background);
  position: absolute;
  left: 180px;
  top: 10px;
  border-radius: 4px;

}
.apps li {
  list-style-type: none;
}
.apps .current {
  color: var(--primary);
  width: 100%;
  border-radius: 4px;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: flex-start;
  padding: 2px 10px;
  gap: 10px;
  cursor: pointer;
}
.apps .current span {
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.apps .current:hover {
  box-shadow: 0 0 5px var(--primary);
}
.apps ul {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-items: flex-start;
  margin-top: 10px;
}
.apps ul input{
  width: 90%;
  font-size: 13px;
  font-weight: 300;
  border: none;
  padding: 0;
}
.search {
  width: 90%;
  color: var(--primary);
  padding: 4px 8px;
  border: 1px solid var(--primary);
  display: flex;
  flex-flow: row nowrap;
  gap: 5px;
  border-radius: 4px;
  align-items: center;
  align-self: center;
  margin-bottom: 5px;
}
.search svg {
  font-size: 13px;
}
.apps ul li {
  margin-left: 25px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  font-size: 13px;
  font-weight: 300;
  gap: 5px;
}
.apps ul li:hover {
  transform: scale(1.1);
  font-weight: 600;
  color: var(--primary);
}
.apps ul li.curr {
  margin-left: 10px;
  transform: scale(1.1);
  font-weight: 500;
  color: var(--primary);
}
</style>
