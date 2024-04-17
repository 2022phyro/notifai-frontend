<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import ClipboardJS from 'clipboard'
import { formatDate } from '@/utils/auth'

const emit = defineEmits(['deleteApp'])
const copyMessage = ref('')
const props = defineProps({
  _id: String,
  orgId: String,
  created: String,
  name: String,
  VAPIDKEY: String
})

const textToCopy = reactive({
  _id: props._id,
  name: props.name,
  orgId: props.orgId,
  vapidkey: props.VAPIDKEY
})
const tValue = ref("helo")
onMounted(() => {
  new ClipboardJS(`#copy-button-${props._id}`, {
    target: () => document.querySelector(`#copy-textarea-${props._id}`)
  }).on('success', () => {
    copyMessage.value = 'Copied!'
    setTimeout(() => {
      copyMessage.value = ''
    }, 2000)
  })
})

const deleteApp = () => {
  emit('deleteApp', props._id, props.name)
}
</script>
<template>
  <article class="app-item">
    <div class="copyAlert">
      <fa-icon :class="['copy']" :icon="['far', 'copy']" title="Copy your client info" />
      <textarea id="copy-textarea-{{props._id}}" style="display: none" :value="tValue"></textarea>
      <p v-if="copyMessage">{{ copyMessage }}</p>
    </div>
    <h2>{{ props.name }}</h2>
    <p><span class="label">Id</span>{{ props._id }}</p>
    <p><span class="label">Created</span>{{ formatDate(props.created) }}</p>
    <p>
      <span class="label">Public Key</span>
      {{ props.VAPIDKEY }}
    </p>
    <p><span class="label">Organization Id</span>{{ props.orgId }}</p>
    <button type="button" class="button-outline danger-outline" @click='deleteApp'>Delete this app</button>
  </article>
</template>
<style scoped>
.copyAlert {
  position: absolute;
  right: 30px;
  top: 30px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  align-items: flex-end;
}
.copyAlert p {
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
.app-item {
  border: 1px solid var(--primary);
  padding: 30px;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  max-width: 350px;
  word-wrap: break-word; /* Add this line */
  overflow-wrap: break-word; 
}
.app-item p {
  width: 100%;
}
</style>
