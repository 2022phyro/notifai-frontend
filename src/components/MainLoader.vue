<template>
  <div class="loader">
    <div class="dots">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>
<style scoped>
.loader {
  z-index: 10;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  position: relative;
  background: var(--color-background);
}

@keyframes spin-and-move {
  0% {
    transform: rotate(0deg) translateX(0);
  }
  50% {
    transform: rotate(180deg) translateX(100px);
  }
  100% {
    transform: rotate(360deg) translateX(200px);
  }
}

@keyframes dot {
  0% {
    opacity: 0;
    transform: translateX(0);
  }
  50% {
    opacity: 1;
    transform: translateX(100px);
  }
  100% {
    opacity: 0;
    transform: translateX(200px);
  }
}
.spinning-logo {
  animation: spin-and-move 4s linear infinite;
  transform-origin: 50% 100%; /* Rotate around the bottom edge */
  width: 50px;
  height: 50px;
}
.dots {
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 200px;
  left: calc(50% - 100px);
}

.dot {
  background: black;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  animation: dot 1s ease-in-out infinite;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}
</style>
