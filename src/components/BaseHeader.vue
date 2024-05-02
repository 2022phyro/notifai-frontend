<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <header>
    <RouterLink to="/" class="logo">
      <img alt="Vue logo" src="/logo.png" width="125" height="125" />
      <span>Notifai</span>
    </RouterLink>
    <div class="wrapper">
      <RouterLink to="/auth/" class="b-pri">Login</RouterLink>
      <RouterLink to="/auth/signup" class="b-pri">Sign Up</RouterLink>
    </div>
  </header>
</template>
<style scoped>
header {
  position: fixed;
  left: 0px;
  top: 0;
  font-family: var(--title-font);
  width: calc(100vw - 0px);
  height: 50px;
  background: var(--color-background);
  box-shadow: 2px 1px 2px black;
  z-index: 1;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
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
header a {
  height: 30px;
}
.logo img {
  width: 30px;
  height: 30px;
  border: 1px solid var(--primary);
  border-radius: 50%;
}
.wrapper {
  position: absolute;
  right: 30px;
  display: flex;
  flex-flow: row wrap;
  gap: 15px;
  align-items: center;
  justify-content: center;
}
</style>
