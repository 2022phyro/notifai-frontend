<script setup>
import { RouterLink } from 'vue-router'
import Header from '@/components/BaseHeader.vue'
</script>

<template>
  <main>
    <Header />
    <div class="hero">
      <p>
        Hey there, Notification Maverick! Ready to revolutionize how your sites and applications
        connect with your audience? Say hello to Notifai, your ultimate notification sidekick.
        Whether you're launching a new product, sharing exciting updates, or just want to spice up
        your messaging game, we've got the tools you need to stand out. Join the notification
        revolution and let's turn up the engagement together!"
      </p>
      <RouterLink to="/auth/signup" class="b-pri cta">Get started</RouterLink>
    </div>
    <img class="images" src="/dashboard.jpg" />
  </main>
</template>
<style scoped>
main {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  align-self: center;
  justify-content: space-evenly;
  gap: 20px;
  font-family: 'Mulish', sans-serif;
  margin: 0 40px;
  margin-top: 60px;
  padding-top: 40px;
}
.hero {
  width: 500px;
  margin: 30px;
  /* border: 1px solid green; */
  font-size: 20px;
  display: flex;
  flex-flow: column wrap;
  gap: 20px;
}
.hero .cta {
  width: 180px;
  font-size: 24px;
  height: 50px;
}
.images {
  display: grid;
  width: 400px;
  /* height: 500px; */
  /* border: 1px solid red; */
  flex-flow: row wrap;
  box-shadow: 5px 5px 5px rgb(143, 143, 207);
  border-radius: 10px;
  gap: 20px;
  justify-content: center;
}
.img:nth-child(1) {
  grid-row: 1 / span 1;
  grid-column: 2 / span 1;
  background-color: red;
  width: 100px;
  height: 150px;
}
.img:nth-child(2) {
  grid-row: 2 / span 1;
  grid-column: 1 / span 1;
  background-color: red;
  width: 100px;
  height: 150px;
}
.img:nth-child(3) {
  grid-row: 2 / span 1;
  grid-column: 3 / span 1;
  background-color: red;
  width: 100px;
  height: 150px;
}
.img:nth-child(4) {
  grid-row: 3 / span 1;
  grid-column: 2 / span 1;
  background-color: red;
  width: 100px;
  height: 150px;
}
</style>
