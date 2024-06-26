<script setup>
import { ref, reactive } from 'vue'
import { useKeysStore } from '@/stores/keys'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import { inst, BASE_URL } from '@/utils/auth'
const emit = defineEmits(['return', 'created'])
const keyName = ref('')
const isActive = ref(false)
const expiryDate = ref(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString())
const scopes = reactive({
  all: false,
  admin: false,
  read: false
})
const kS = useKeysStore()
const { currApp } = storeToRefs(useAppStore())
const { addToKeys } = kS
const showForm = ref(false)
const dD = ref(false)
const msg = ref('')
const chosen = ref('7 days')
const generateKey = async () => {
  try {
    isActive.value = true
    const selectedScopes = Object.keys(scopes).filter((scope) => scopes[scope])
    const body = {
      alias: keyName.value,
      expiry: expiryDate.value,
      scopes: selectedScopes
    }
    const instance = await inst(true)
    const response = await instance.post(`${BASE_URL}/apps/${currApp.value._id}/keys`, body)
    const { data } = response.data
    msg.value = data.key
    delete data.key
    addToKeys(data)
  } catch (error) {
    console.error(error)
  } finally {
    isActive.value = false
  }
}
const changeDate = (days, value) => {
  expiryDate.value = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString()
  chosen.value = value
  showForm.value = false
  dD.value = false
}
const customV = () => {
  showForm.value = true
  chosen.value = 'Custom'
  expiryDate.value = ''
  dD.value = false
}
const success = () => {
  msg.value = ''
  emit('return')
}
</script>
<template>
  <div class="newKey">
    <div class="header">
      <p class="pri b u"><span @click="emit('return')">Keys/</span><span>new</span></p>
    </div>
    <form @submit.prevent="generateKey">
      <div class="form-group">
        <label for="alias">Name</label>
        <input v-model="keyName" id="alias" type="text" required />
      </div>
      <div class="form-group exp">
        <label for="exp"> Expiration</label>
        <div class="val">
          <div class="dropdown">
            <p class="select" @click="dD = !dD">
              {{ chosen }}<fa-icon :icon="['fas', dD ? 'caret-down' : 'caret-up']" />
            </p>
            <ul v-if="dD">
              <li @click="changeDate(1, '1 day')">1 day</li>
              <li @click="changeDate(7, '7 days')">7 days</li>
              <li @click="changeDate(30, '30 days')">30 days</li>
              <li @click="customV">Custom</li>
            </ul>
          </div>
          <input v-if="showForm" v-model="expiryDate" id="exp" type="date" required />
        </div>
      </div>
      <div class="form-group">
        <label for="scopes">Scope</label>
        <div class="checkbox-group">
          <input v-model="scopes.all" type="checkbox" id="all" />
          <label for="all"><span class="pri">all</span> - Full access to all resources</label>
        </div>
        <div class="checkbox-group">
          <input v-model="scopes.admin" type="checkbox" id="adm" />
          <label for="adm"
            ><span class="pri">admin</span> - Access to administrative resources</label
          >
        </div>
        <div class="checkbox-group">
          <input v-model="scopes.read" type="checkbox" id="read" />
          <label for="read"><span class="pri">read</span> - Read-only access to resources</label>
        </div>
      </div>
      <div class="decide">
        <button  :disabled="isActive" class="b-pri" type="submit">Generate</button>
        <button  :disabled="isActive" type="button" @click="emit('return')" class="b-sec">Cancel</button>
      </div>
    </form>
  </div>
  <div class="key-wrapper" v-if="msg !== ''">
    <div class="key">
      <p>
        Please copy your key and store in a secure location as you will not see this after you close
        this popup
      </p>
      <p class="pri bi">{{ msg }}</p>
      <button class="b-sec" @click="success">Ok</button>
    </div>
  </div>
</template>

<style scoped>
.newKey {
  padding: 30px;
  border-radius: 5px;
  width: 80%;
}
.newKey .header span {
  cursor: pointer;
  font-weight: 600;
}
.newKey .header span {
  text-decoration: underline;
}

.header {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 10px;
  display: flex;
  flex-flow: column;
}
.form-group input[type='text'] {
  width: 300px;
}
.checkbox-group {
  margin-bottom: 5px;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
}

/* .form-group label {
  display: block;
} */
.decide {
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  margin-top: 20px;
}
.exp .val {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  gap: 10px;
}
.exp input {
  padding: 5px 10px;
  font-size: 13px;
  font-family: var(--title-font);
}
.select {
  width: 100%;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  padding: 2px 10px;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
.dropdown {
  border: 1px solid #ccc;
  width: 120px;
  display: flex;
  flex-flow: column;
}
.dropdown ul {
  list-style-type: none;
  padding: 10px;
  cursor: pointer;
}
.dropdown ul li:hover {
  background: var(--primary);
  color: white;
  padding: 0 5px;
}
.select {
  cursor: pointer;
}

.key-wrapper {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  backdrop-filter: blur(5px);
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}
.key {
  border: 1px solid #ccc;
  padding: 20px;
  display: flex;
  flex-flow: column;
  gap: 10px;
  background: var(--color-background);
  width: 600px;
  word-break: break-all; /* Add this line */

}
.key button {
  width: 60px;
}
</style>
