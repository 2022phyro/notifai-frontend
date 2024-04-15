<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
  visible: Boolean,
  type: String,
  decision: Boolean,
  callback: Function,
  args: Array
})
console.log(props)
const emit = defineEmits(['closePopUp', 'pFormSuccess', 'nFormSuccess', 'dFormSuccess'])
const allMessages = {
  deleteMsg: ['Are you sure you want to delete this message', 'Delete'],
  logout: ['Are you sure you want to logout?', 'Delete'],
  deleteAcc: ['Are you sure you want to delete your account?', 'Delete'],
  deleteApp: ['Are you sure you want to delete your account?', 'Delete']
}
const ma = 'no'
const handleViewMsg = () => {
  console.log('viewMsg')
}
const isLoading = ref(false)
// switch (props.type) {
//   case 'showMsg': {
//     console.log('showMsg')
//     break
//   }
//   case 'nForm':
//     console.log('nForm')
//     break
//   case 'dForm':
//     console.log('dForm')
//     break
//   default:
//     console.log('default')
// }
const close = () => {
  emit('closePopUp')
}
</script>
<template>
  <div class="popup-wrapper" v-if="props.visible">
    <div class="popup-body">
      <span class="close btn" @click="close" v-if="!isLoading">&times;</span>
      <div class="viewMsg" v-if="props.type === 'showMsg'">
        <h3>How on earth could I have missed this</h3>
        <p>
          Hello you have received this message. What you do with it next is wholly and truly your
          choice
        </p>
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
.viewMsg {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  align-content: center;
  gap: 20px;
  padding-top: 20px;
}
.decision .buttons {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-flow: row nowrap;
  width: 100%;
}
</style>
