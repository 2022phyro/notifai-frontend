<script setup>
import { RouterLink, useRoute } from 'vue-router'
const route = useRoute()
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
        <RouterLink to="/dashboard/docs"
          ><fa-icon :icon="['fas', 'book-open']" />Docs</RouterLink
        >
      </li>
    </ul>
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
    font-size: 20px;
    gap: 10px;
    padding-left: 20px;
}
.logo img {
    width: 40px;
    height: 40px;
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
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  width: 5px;
  height: 40px;
  background-color: #00e9d1; /* Replace #color with the color you want */
  border-radius: 10px;
  transform: translateY(-50%);
}
</style>
