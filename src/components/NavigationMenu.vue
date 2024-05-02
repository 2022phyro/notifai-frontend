<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { inst, BASE_URL } from '@/utils/auth'
import { lLogout } from '@/utils/ls';

const emit = defineEmits(['newApp'])
const route = useRoute()

const newApp = () => {
  emit('newApp')
}
const handleLogout = () => {
  inst(true)
  .then(instance => {
    instance.post(`${BASE_URL}/logout`)
    .then(() => {
      window.location.href = '/'
      lLogout()
    })
  })
}
</script>
<template>
  <div class="navigation">
    <ul class="nav-wrapper">
      <li :class="['nav-item', { active: route.path === '/dashboard' }]">
        <RouterLink to="/dashboard"><fa-icon :icon="['fas', 'house']" /></RouterLink>
        <span class="tooltip"> Messages </span>
      </li>
      <li :class="['nav-item', { active: route.path === '/dashboard/compose' }]">
        <RouterLink to="/dashboard/compose"><fa-icon :icon="['fas', 'feather']" /></RouterLink>
        <span class="tooltip"> Compose </span>
      </li>
      <li :class="['nav-item', { active: route.path === '/dashboard/settings' }]">
        <RouterLink to="/dashboard/settings"><fa-icon :icon="['fas', 'gear']" /></RouterLink>
        <span class="tooltip"> Settings </span>
      </li>
      <li :class="['nav-item', { active: route.path === '/dashboard/keys' }]">
        <RouterLink to="/dashboard/keys"><fa-icon :icon="['fas', 'key']" /></RouterLink>
        <span class="tooltip">API Keys</span>
      </li>
      <li :class="['nav-item', { active: route.path === '/dashboard/docs' }]">
        <RouterLink to="/dashboard/docs"><fa-icon :icon="['fas', 'book-open']" /></RouterLink>
        <span class="tooltip">Docs </span>
      </li>
      <li class="nav-item">
        <span class="new-app" @click="newApp">
          <fa-icon :icon="['far', 'square-plus']" />
        </span>
        <span class="tooltip">New App</span>
      </li>
    </ul>
    <ul class="footer">
      <li :class="['nav-item', { active: route.path === '/dashboard/me' }]">
        <RouterLink to="/dashboard/me"><fa-icon :icon="['far', 'user']" /></RouterLink>
        <span class="tooltip">Me </span>
      </li>
      <li :class="['nav-item']">
        <span  class="new-app" @click="handleLogout"><fa-icon :icon="['fas', 'arrow-right-from-bracket']" /></span>
        <span class="tooltip">Logout </span>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.navigation {
  position: fixed;
  top: 50px;
  left: 0;
  width: 70px;
  height: calc(100vh - 50px);
  background: var(--color-background);
  display: flex;
  flex-flow: column wrap;
  border-right: 1px solid #ccc;
  justify-content: flex-start;
  box-shadow: 10px 0 15px -10px rgba(0, 0, 0, 0.1); /* Add this line */
}
.nav-wrapper, .footer {
  display: flex;
  width: inherit;
  flex-flow: column nowrap;
  /* align-items: center; */
  height: calc(100% -210px);
  justify-content: flex-start;
  list-style-type: none;
  padding: 20px 0;
  gap: 15px;
}

.nav-item {
  width: 100%;
  height: 35px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  color: black;
  position: relative;
  padding: 0 10px;
  transition: all 0.4s ease;
}

.nav-item a,
.new-app {
  width: inherit;
  height: 100%;
  display: flex;
  text-align: left;
  justify-content: flex-start;
  /* border: 1px solid red; */
  padding: 0 10px;
  width: 40px;
  gap: 10px;
  align-items: center;
  font-size: 16px;
  color: var(--primary);
}
.nav-wrapper .new-app svg {
  font-size: 20px;
}
.nav-item:hover a,
.nav-item:hover .new-app,
.active .router-link-active {
  background: var(--bg-pri);
  color: white;
  font-weight: 600;
  /* border-radius: 4px; */
  transition: all 0.4s ease;
  cursor: pointer;
}
.nav-item a:active,
.nav-item .new-app:active {
  transform: scale(0.9);
}
.active {
  position: relative;
  /* border-radius: 20px; */
}
.active::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 4px;
  height: 35px;
  background: var(--bg-pri); /* Replace #color with the color you want */
  /* border-radius: 20px; */
  transform: translateY(-50%);
}
.tooltip {
  position: relative;
  visibility: hidden;
  font-size: 12px;
  background-color: #555;
  color: white;
  flex-shrink: 0;
  text-align: center;
  padding: 5px;
  border-radius: 6px;
  margin-left: 10px;
  opacity: 0;
  transition: opacity 0.3s;
}

.nav-item:hover .tooltip {
  visibility: visible;
  opacity: 1;
}

.tooltip::after {
  content: '';
  position: absolute;
  right: 100%;
  top: 50%;
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent #555555 transparent transparent;
}

.footer {
  position: absolute;
  bottom: 30px;
  height: 180px;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  border-top: 1px solid var(--primary);
  border-bottom: 1px solid var(--primary);
}
</style>
