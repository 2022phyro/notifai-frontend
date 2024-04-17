<script setup>
import { ref, computed, watch, reactive } from 'vue'
const props = defineProps({
  visible: Boolean,
  type: String,
  decision: Boolean,
  callback: Function,
  args: Array
})
const type = computed(() => props.type)

const appName = ref('') // New ref for the app name
const appNameError = ref('') // New ref for the app name error message

const validateAppName = (val) => {
  const pattern = /^[a-zA-Z][a-zA-Z0-9-]*$/
  if (val && appName.value !== val) {
    appNameError.value = "The value you entered isn't the name of the app"
  }
  else if (!appName.value) {
    appNameError.value = 'App name is required'
  } else if (!pattern.test(appName.value)) {
    appNameError.value =
      'App name must start with a letter and can only contain letters, numbers, and hyphens'
  } else {
    appNameError.value = ''
  }
}

const handleCallback = () => {
  let value;
  if (props.type == "deleteApp") value = props.args[0]
  validateAppName(value)
  if (!appNameError.value) {
    props.callback(appName.value)
  }
}
const emit = defineEmits(['closePopUp', 'pFormSuccess', 'nFormSuccess', 'dFormSuccess'])
const allMessages = {
  deleteMsg: ['Are you sure you want to delete this message', 'Delete'],
  logout: ['Are you sure you want to logout?', 'Delete'],
  deleteAcc: ['Are you sure you want to delete your account?', 'Delete'],
  deleteApp: [
    `Type in the name ${props.args[0]}. Note this action is irreversible and you will lose all data associated with it`,
    'Delete'
  ],
  newApp: ['Enter the name of the new app you want', 'Create']
}
const notification = reactive({
  title: '',
  body: '',
  icon: '',
  data: {},
  clickUrl: ''
})

const isLoading = ref(false)
watch(type, async () => {
  switch (props.type) {
    case 'showMsg': {
      try {
        notification.title = ''
        notification.body = ''
        notification.icon = ''
        notification.clickUrl = ''
        notification.data = {}
        const data = await props.callback()
        Object.assign(notification, data.value)
        console.log(notification)
      } catch (error) {
        console.log(error)
      }
      break
    }
    case 'nForm':
      console.log('nForm')
      break
    case 'dForm':
      console.log('dForm')
      break
    default:
      console.log('default')
  }
})
const close = () => {
  notification.title = ''
  notification.body = ''
  notification.icon = ''
  notification.clickUrl = ''
  notification.data = {}
  emit('closePopUp')
}
</script>
<template>
  <div class="popup-wrapper" v-if="props.visible">
    <div class="popup-body">
      <span class="close btn" @click="close" v-if="!isLoading">&times;</span>
      <div class="viewMsg" v-if="props.type === 'showMsg'">
        <h3><img :src="notification.icon" />{{ notification.title }}</h3>
        <p>
          <span class="label">Click action: </span>{{ notification.clickUrl || 'None present' }}
        </p>
        <p>
          {{ notification.body }}
        </p>
        <p><span class="label">Data: </span>{{ JSON.stringify(notification.data, null, 2) }}</p>
      </div>
      <div class="manage-app" v-else-if="['newApp', 'deleteApp'].includes(props.type)">
        <p>{{ props.type === "deleteApp" ? `Type in the name ${props.args[0]}. Note this action is irreversible and you will lose all data associated with it`: "Enter the name of the new app your want"}}</p>
        <input :class="{error: appNameError }" type="text" v-model="appName" @input="validateAppName" />
        <p class="error-msg" v-if="appNameError">{{ appNameError }}</p>
        <div class="buttons">
          <button class="button-outline" @click="close">Cancel</button>
          <button class="button-outline danger-outline" @click="handleCallback">
            {{ allMessages[props.type][1] }}
          </button>
        </div>
      </div>
      <div class="decision" v-else>
        <p>{{ allMessages[props.type][0] }}</p>
        <div class="buttons">
          <button class="button-outline" @click="close">Cancel</button>
          <button class="button-outline danger-outline" @click="props.callback">
            {{ allMessages[props.type][1] }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.popup-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
.red {
  font-weight: 800;
  color: red;
  font-size: 18px;
}
.popup-body {
  max-width: 500px;
  max-height: 500px;
  min-width: 300px;
  min-height: 300px;
  /* border: 1px solid red; */
  padding: 30px;
  background: var(--color-background);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 20px;
  position: relative;
}

.close {
  font-size: 30px;
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 20px;
}
.decision,
.manage-app,
.viewMsg {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-flow: column nowrap;
  align-content: flex-start;
  gap: 10px;
  padding-top: 20px;
}
.manage-app {
  max-width: 350px;
}
.manage-app input {
  width: 100%;
}
.viewMsg h3 {
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  gap: 20px;
  align-items: center;
}
.viewMsg img {
  width: 50px;
  height: 50px;
  background: grey;
  border-radius: 50%;
  border: 1px solid var(--primary);
}
.buttons {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-flow: row nowrap;
  width: 100%;
}
</style>
