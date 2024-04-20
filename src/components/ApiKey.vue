<template>
  <div class="api-key">
    <p class="h1"><span class="pri">Test key</span><span class="i">Last used yesterday</span></p>
    <p class="italics">all, admin</p>
    <div class="decide">
      <p>Expiring <span class="b i">Friday, March 15 2024</span></p>
      <div>
        <button class="danger-outline button-outline">Revoke</button>
        <button class="danger-outline button-outline">Delete</button>
      </div>
    </div>
  </div>
</template>
<style scoped>

.api-key {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 1px 0.5px 1px #ccc;
  border-radius: 4px;
  /* margin: 10px 30px; */
  font-size: 13px;
  width: 100%;
  max-width: 700px;
  align-items: flex-start;
  /* height: 80px; */
}
.h1 {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.decide {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: inherit;
}
.decide > div {
  display: flex;
  flex-flow: row;
  gap: 30px;
}
.decide button {
  font-size: 12px;
  padding: 0px 8px;
  font-weight: 600;
}
.decide button:hover {
  font-weight: 600;
}

</style>
