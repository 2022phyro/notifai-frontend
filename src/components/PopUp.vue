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
const isActive = ref(false)
const message = computed(() =>
  props.type === 'deleteApp'
    ? `Type in the name <span class="red">${props.args[0]}</span>. Note this action is irreversible and you will lose all data associated with <span class="red">${props.args[0]}</span>`
    : 'Enter the name of the new app your want'
)
const appName = ref('') // New ref for the app name
const appNameError = ref('') // New ref for the app name error message

const validateAppName = () => {
  const pattern = /^[a-zA-Z][a-zA-Z0-9-]*$/
  if (!appName.value) {
    appNameError.value = 'App name is required'
  } else if (!pattern.test(appName.value)) {
    appNameError.value =
      'App name must start with a letter and can only contain letters, numbers, and hyphens'
  } else {
    appNameError.value = ''
  }
}

const handleCallback = async () => {
  isActive.value = true
  try {
    if (props.type == 'deleteApp') {
      if (props.args[0] && appName.value !== props.args[0]) {
        appNameError.value = "The value you entered isn't the name of the app"
      }
    }
    if (!appNameError.value) {
      await props.callback(appName.value)
    }
  } catch (error) {
    console.error(error)
  } finally {
    appName.value = ''
    isActive.value = false
  }
}
const handleCb = () => {
  setTimeout( async () => {
    try {
      isActive.value = true
      await props.callback()
    } catch (error) {
      console.error(error)
    } finally {
      isActive.value = false
    }
  }, 1000)

}
const emit = defineEmits(['closePopUp', 'pFormSuccess', 'nFormSuccess', 'dFormSuccess'])
const allMessages = {
  deleteMsg: ['Are you sure you want to delete this message', 'Delete'],
  logout: ['Are you sure you want to logout?', 'Delete'],
  deleteAccount: ['Are you sure you want to delete your account?', 'Delete'],
  deleteApp: [
    `Type in the name ${props.args[0]}. Note this action is irreversible and you will lose all data associated with it`,
    'Delete'
  ],
  newApp: ['Enter the name of the new app you want', 'Create'],
  revokeKey: ['Are you sure you want to revoke this key? Note that it is irreversible and you will not be able to use it to access any data again', "Revoke"],
  deleteKey: ['Are you sure you want to delete this key?', "Delete"],
	deleteRevokeKeys: ['Are you sure you want to revoke all your keys? You will not be able to access any data till you create a new one', 'Revoke']
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
      } catch (error) {
        console.error(error)
      }
      break
    }
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
        <h3><img :src="notification.icon" alt="notification" />{{ notification.title }}</h3>
        <p>
          <span class="label">Click action: </span>{{ notification.clickUrl || 'None present' }}
        </p>
        <p>
          {{ notification.body }}
        </p>
        <p><span class="label">Data: </span>{{ JSON.stringify(notification.data, null, 2) }}</p>
      </div>
      <div class="manage-app" v-else-if="['newApp', 'deleteApp'].includes(props.type)">
        <p v-html="message"></p>
        <input
          :class="{ error: appNameError }"
          type="text"
          v-model="appName"
          @input="validateAppName"
        />
        <p class="error-msg" v-if="appNameError">{{ appNameError }}</p>
        <div class="buttons">
          <button :disabled="isActive" class="b-sec" @click="close">Cancel</button>
          <button :disabled="isActive" :class="props.type.startsWith('delete')? 'b-danger': 'b-pri'" @click="handleCallback">
            {{ allMessages[props.type][1] }}
          </button>
        </div>
      </div>
      <div class="decision" v-else>
        <p>{{ allMessages[props.type][0] }}</p>
        <div class="buttons">
          <button :disabled="isActive" class="b-sec" @click="close">Cancel</button>
          <button :disabled="isActive" :class="props.type.startsWith('delete')? 'b-danger': 'b-pri'" @click="handleCb">
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
