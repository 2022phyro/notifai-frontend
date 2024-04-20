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
    </ul>
    <div class="footer">
      <h3 class="btn"  @click="newApp" >
        Add a new app <fa-icon class="new-app" :icon="['far', 'circle-xmark']"/>
      </h3>
    </div>
  </div>
</template>
<style scoped>
.navigation {
  position: fixed;
  top: 50px;
  left: 0;
  width: 150px;
  height: calc(100vh - 50px);
  background: var(--primary);
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
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
  cursor: pointer;
  color: white;
  padding-left: 15px;
  transition: all 0.4s ease;
}

.nav-item a {
  width: 80%;
  height: 100%;
  text-align: left;
  justify-content: flex-start;
  padding-left: 8px;
  gap: 10px;
  align-items: center;
  font-size: 13px;
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
  width: 4px;
  height: 35px;
  background-color: #00e9d1; /* Replace #color with the color you want */
  border-radius: 10px;
  transform: translateY(-50%);
}
.footer {
  position: absolute;
  bottom: 30px;
  padding: 10px 0;
  width: 100%;
  overflow-y: auto;
}
.footer h3 {
  color: white;
  font-weight: 800px;
  background: var(--primary);
  display: flex;
  position: sticky;
  width: 80%;
  margin-left: 15px;
  top: 0;
  flex-flow: row;
  font-size: 15px;
  justify-content: space-between;
  align-items: center;
  border: 1px solid white;
  cursor: pointer;
  padding: 5px 5px;
}
.footer h3 .new-app {
  transform: rotate(135deg);
  transition: all 0.3s ease;
}

.footer h3:active {
  opacity: 0.1;
}
.footer h3:hover {
  transform: scale(1.1);
}
</style>
