<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { inst, BASE_URL } from '@/utils/auth'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'

const route = useRoute()
const appState = useAppStore()

const { currApp, apps } = storeToRefs(appState)
const { setApps, setCurrApp } = appState

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

const setApp = (app) => {
  setCurrApp(app)
}
</script>
<template>
  <div class="navigation">
    <RouterLink to="/" class="logo">
      <img alt="Vue logo" src="@/assets/logo.png" width="125" height="125" />
      <span>Notifai</span>
    </RouterLink>
    <ul class="nav-wrapper">
      <li :class="['nav-item', { active: route.path === '/dashboard' }]">
        <RouterLink to="/dashboard"><fa-icon :icon="['fas', 'house']" />Home</RouterLink>
      </li>
      <li :class="['nav-item', { active: route.path === '/dashboard/compose' }]">
        <RouterLink to="/dashboard/compose"
          ><fa-icon :icon="['fas', 'feather']" />Compose</RouterLink
        >
      </li>
      <li :class="['nav-item', { active: route.path === '/dashboard/settings' }]">
        <RouterLink to="/dashboard/settings"
          ><fa-icon :icon="['fas', 'gear']" />Settings</RouterLink
        >
      </li>
      <li :class="['nav-item', { active: route.path === '/dashboard/docs' }]">
        <RouterLink to="/dashboard/docs"><fa-icon :icon="['fas', 'book-open']" />Docs</RouterLink>
      </li>
      <li :class="['nav-item', { active: route.path === '/dashboard/docs' }]">
        <RouterLink to="/dashboard/docs"><fa-icon :icon="['fas', 'key']" />API Keys</RouterLink>
      </li>
    </ul>
    <div class="footer">
      <h3>Your Apps</h3>
      <ul>
        <li v-for="app in apps" :key="app.id" class="btn" :class="{ current: app === currApp }" @click="setApp(app)">
          <fa-icon :icon="['fas', 'mobile-screen-button']" v-if="app === currApp"/>
        {{ app.name }}
      </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.navigation {
  position: fixed;
  top: 0;
  left: 0;
  width: 150px;
  height: 100vh;
  background: var(--primary);
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
}
.logo {
  margin-top: 20px;
  align-self: flex-start;
  color: white;
  font-size: 24px;
  font-weight: 600px;
  gap: 10px;
  padding-left: 20px;
}
.logo img {
  width: 30px;
  height: 30px;
}
.nav-wrapper {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
  list-style-type: none;
  margin-top: 20px;
  gap: 8px;
}

.nav-item {
  /* border: 1px solid red; */
  width: 100%;
  height: 40px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  cursor: pointer;
  color: white;
  padding-left: 20px;
  transition: all 0.4s ease;
}

.nav-item a {
  width: 80%;
  height: 100%;
  text-align: left;
  justify-content: flex-start;
  padding-left: 10px;
  gap: 10px;
  align-items: center;
  font-size: 16px;
  color: white;
}
.nav-item a:hover,
.active .router-link-active {
  background: #00e9d1;
  color: black;
  font-weight: 600;
  border-radius: 4px;
  transition: all 0.4s ease;
}
.nav-item a:active {
  transform: scale(0.9);
}
.active {
  position: relative;
}
.active::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 5px;
  height: 40px;
  background-color: #00e9d1; /* Replace #color with the color you want */
  border-radius: 10px;
  transform: translateY(-50%);
}
.footer {
  position: absolute;
  bottom: 30px;
  padding: 10px 0;
  width: 100%;
  height: 150px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  color: white;
  overflow-y: auto;
}
.footer h3 {
  color: white;
  margin-left: 10px;
  margin-bottom: 10px;
  font-weight: 800px;
}
.footer ul {
  list-style-type: none;
  font-weight: 800;

}
.footer li {
  width: 80%;
  padding: 0px 0px 0 10px;
  display: flex;
  flex-flow: row gap;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  margin-left: 15px;
  }
.footer li.current {
   background-color: #00e9d1;
   color: black;
   margin-left: 0;
}
</style>
