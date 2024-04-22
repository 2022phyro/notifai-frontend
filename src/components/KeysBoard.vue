<script setup>
import ApiKey from './ApiKey.vue'
import NewKey from './NewKey.vue'
import CardLoader from './CardLoader.vue'
import { ref, watch } from 'vue'
import { useKeysStore } from '@/stores/keys'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import { inst, BASE_URL } from '@/utils/auth'

const kS = useKeysStore()
const { currApp } = storeToRefs(useAppStore())
const { keys } = storeToRefs(kS)
const { setKeys } = kS
const emit = defineEmits(['revokeKey', 'deleteKey', 'revokeKeys'])
const newKey = ref(null)
const isLoading = ref(false)
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
const fetchKeys = async () => {
  try {
    const instance = await inst(true)
    const response = await instance.get(`${BASE_URL}/apps/${currApp.value._id}/keys`)
    const { data } = response.data
    setKeys(data)
  } catch (error) {
    console.error(error)
  }

}
watch(currApp, async (newApp) => {
  isLoading.value = true
  setTimeout(async () => {
    if (newApp && newApp._id) {
      await fetchKeys()
    }
    isLoading.value = false
  }, 1000)
}, {immediate: true})
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
      <div class="loader" v-if="isLoading">
        <CardLoader
          v-for="num in [1, 2, 3]"
          :key="num"
        />
      </div>
			<ApiKey v-else v-for="(key, idx) in keys" :key="idx" v-bind="key" @delete="handleDelete" @revoke="handleRevoke" />
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
.loader {
  width: 100%;
  max-width: 700px;
}
</style>
