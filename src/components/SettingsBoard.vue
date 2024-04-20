<script setup>
import { storeToRefs } from 'pinia'
import ClipboardJS from 'clipboard'
import { useAppStore } from '@/stores/app'
import { ref, onMounted, computed } from 'vue'
const emit = defineEmits(['deleteApp'])
const appState = useAppStore()
const copyMessage = ref('')

const { currApp } = storeToRefs(appState)

const deleteApp = () => {
    emit('deleteApp', currApp.value._id, currApp.value.name)
}
const textToCopy = computed(() => {
  const { created, ...rest } = currApp.value
  return rest
})
onMounted(() => {
  new ClipboardJS('.copy', {
    text: () => JSON.stringify(textToCopy.value, null, 4)
  }).on('success', () => {
    copyMessage.value = 'Copied!'
    setTimeout(() => {
      copyMessage.value = ''
    }, 1000)
  })
})

</script>
<template>
  <div class="app-settings-wrapper">
    <h3 class="pri b">Client Credentials</h3>
    <div class="cpy-area">
    <div class="copyAlert">
      <fa-icon :class="['copy']" :icon="['far', 'copy']" title="Copy your client info" />
      <p v-if="copyMessage">{{ copyMessage }}</p>
      </div>
      <textarea class="copy-area" :value="JSON.stringify(textToCopy, null, 4)" id="clientCred" readonly>
      </textarea>
    </div>
    <div class="delete">
      <button class="button-outline danger-outline" @click="deleteApp">Delete this app</button> 
    </div>

  </div>
  <!-- <div class="app-settings-wrapper">
    <AppItem v-for="(app, index) in apps" v-bind="app" :key="index" @deleteApp="handleDeleteApp"/>
  </div> -->
</template>
<style scoped>
.app-settings-wrapper {
    display: flex;
    flex-flow: column wrap;
    justify-content: space-evenly;
    align-items: flex-start;
    gap: 20px;
    padding: 30px;
}
.cpy-area {
  background-color: #f5f5f5; 
  border: 1px solid #ccc; 
  padding: 20px;
  overflow-x: auto; 
  border-radius: 5px; 
  position: relative;

}
.copy-area {
  display: block;
  height: 150px;
  width: 400px;
  font-family: 'Consolas', monospace; 
  white-space: pre; 
  position: relative;
  border: none;
  background: inherit;
  resize: none;
  outline: none;

}
.copyAlert {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  align-items: flex-end;
}
.copyAlert p {
  position: absolute; 
  top: -20px; 
  right: 0;
  background: grey;
  color: white;
  font-size: 13px;
  padding: 3px;
}
.copy {
  font-size: 20px;
  color: var(--primary);
  cursor: pointer;
  transition: all 0.2s ease;
}
.copy:active {
  opacity: 0.1;
  transform: scale(0.9);
  cursor: pointer;
}

.delete {
  margin: 30px 0;
}
</style>
