<script setup>
import { RouterLink, useRoute } from 'vue-router'

const emit = defineEmits(['newApp'])
const route = useRoute()

const newApp = () => {
  emit('newApp')
}

</script>
<template>
  <div class="navigation">
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
      <li :class="['nav-item', { active: route.path === '/dashboard/keys' }]">
        <RouterLink to="/dashboard/keys"><fa-icon :icon="['fas', 'key']" />API Keys</RouterLink>
      </li>
      <li :class="['nav-item', { active: route.path === '/dashboard/docs' }]">
        <RouterLink to="/dashboard/docs"><fa-icon :icon="['fas', 'book-open']" />Docs</RouterLink>
      </li>
      <li class="nav-item">
        <div class="new-app" @click="newApp"><fa-icon :icon="['far', 'square-plus']"/> New App</div>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.navigation {
  position: fixed;
  top: 50px;
  left: 0;
  width: 150px;
  height: calc(100vh - 50px);
  background: var(--color-background);
  display: flex;
  flex-flow: column wrap;
  border-right: 1px solid #ccc;
  justify-content: flex-start;
  box-shadow: 10px 0 15px -10px rgba(0, 0, 0, 0.1); /* Add this line */
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
  width: 100%;
  height: 35px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  color: black;
  padding-left: 15px;
  transition: all 0.4s ease;
}

.nav-item a, .new-app {
  width: 80%;
  height: 100%;
  display: flex;
  text-align: left;
  justify-content: flex-start;
  padding-left: 8px;
  gap: 10px;
  align-items: center;
  font-size: 13px;
  color: black;
}
.new-app svg {
  font-size: 16px;
}
.nav-item a:hover,
.new-app:hover,
.active .router-link-active {
  background: var(--primary);
  color: white;
  font-weight: 600;
  border-radius: 4px;
  transition: all 0.4s ease;
  cursor: pointer;
}
.nav-item a:active,
.nav-item .new-app:active {
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
  width: 4px;
  height: 35px;
  background-color: var(--primary); /* Replace #color with the color you want */
  border-radius: 10px;
  transform: translateY(-50%);
}
</style>
