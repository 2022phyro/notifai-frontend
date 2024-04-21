<script setup>
import ApiKey from './ApiKey.vue'
import NewKey from './NewKey.vue'
import { ref } from 'vue'

const newKey = ref(null)
const showNewKey = () => {
  newKey.value = true
}
</script>
<template>
  <div class="api-keys" v-if="newKey === null">
    <div class="header">
      <h2>API Keys</h2>
      <div class="decision">
        <button class="b-pri" @click="showNewKey">Generate new key</button>
        <button class="b-danger">Revoke all keys</button>
      </div>
    </div>
    <p>Keys that you create here will allow you to access the SDK and the NotifAI API</p>
    <ApiKey />
    <ApiKey />
    <ApiKey class="grey" />
    <ApiKey />
    <ApiKey class="red" />
  </div>
<NewKey v-else-if="newKey === true"/>
</template>
<style scoped>
.header {
  width: 100%;
  border-bottom: 1px solid #ccc;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  position: sticky;
  top: 0;
  background: var(--color-background);
}
.decision {
  display: flex;
  gap: 20px;
}
.api-keys {
  padding: 30px;
  display: flex;
  flex-flow: column;
  gap: 20px;
  align-items: center;
}
.grey {
  background: #ececec;
}
.red {
  background: #eea6a6;
}
.newKey .header span {
	cursor: pointer;
	font-weight: 600;
}
.newKey .header span {
	text-decoration: underline;
}
.newKey {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 5px;
}

.header {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 10px;
}

.checkbox-group {
  margin-bottom: 5px;
}

.decide {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
