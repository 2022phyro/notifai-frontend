<script setup>
import ApiKey from './ApiKey.vue'
import NewKey from './NewKey.vue'
import { ref } from 'vue'
const emit = defineEmits(['revokeKey', 'deleteKey', 'revokeKeys'])
const newKey = ref(null)
const showNewKey = () => {
  newKey.value = true
}
const handleRevoke = (id) => {
  emit('revokeKey', id)
}
const handleDelete = (id) => {
  emit('deleteKey', id)
}
const handleRevokeKeys = () => {
  emit('revokeKeys')
}
</script>
<template>
	<div>
		<div class="api-keys" v-if="newKey === null">
			<div class="header">
				<h2>API Keys</h2>
				<div class="decision">
					<button class="b-pri" @click="showNewKey">Generate new key</button>
					<button class="b-danger" @click="handleRevokeKeys">Revoke all keys</button>
				</div>
			</div>
			<p>Keys that you create here will allow you to access the SDK and the NotifAI API</p>
			<ApiKey @delete="handleDelete" @revoke="handleRevoke" />
			<ApiKey />
			<ApiKey class="grey" />
			<ApiKey />
			<ApiKey class="red" />
		</div>
		<NewKey v-else-if="newKey === true" @return="newKey = null" />
	</div>
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
</style>
