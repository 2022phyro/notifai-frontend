<script setup>
import { RouterLink } from 'vue-router';

</script>
<template>
    <header>
        <RouterLink to="/" class="logo">
            <img alt="Vue logo" src="@/assets/logo.png" width="125" height="125" />
            <span>Notifai</span>
        </RouterLink>
        <div class="wrapper">
            <RouterLink to="/auth/login" class="a-button-outline">Login</RouterLink>
            <RouterLink to="/auth/signup" class="a-button-outline">Sign Up</RouterLink>
        </div>
    </header>
</template>
<style scoped>
header {
    width: 100%;
    height: 60px;
    background: var(--primary);
    position: fixed;
    top: 0;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
}
.logo {
    position: absolute;
    left: 30px;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 30px;
    font-weight: 500;
    font-family: var(--title-font);
    font-weight: 400;
    gap: 10px;
}
.logo img {
    width: 50px;
    height: 50px;
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