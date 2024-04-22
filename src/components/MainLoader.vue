<template>
<div class="loading-wrapper">
  <div class="loading">
  <svg width="64px" height="48px">
      <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="back"></polyline>
    <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="front"></polyline>
  </svg>
</div>
</div>
</template>
<style scoped>
.loading-wrapper {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading svg polyline {
  fill: none;
  stroke-width: 7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.loading svg polyline#back {
  fill: none;
  stroke: rgb(155, 155, 201);
}

.loading svg polyline#front {
  fill: none;
  stroke: rgb(3, 3, 209);
  stroke-dasharray: 48, 144;
  stroke-dashoffset: 192;
  animation: dash_682 1.4s linear infinite;
}

@keyframes dash_682 {
  72.5% {
    opacity: 0;
  }

  to {
    stroke-dashoffset: 0;
  }
}
</style>
