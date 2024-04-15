<script setup>
import { onMounted, ref } from 'vue'
import ClipboardJS from 'clipboard'

const copyMessage = ref('')
const textToCopy = ref({
  id: '35454545',
  name: '34343434',
  VAPIDKey: '34343434',
  orgId: '3s45w34t45'
})

onMounted(() => {
  new ClipboardJS('.copy', {
    text: (trigger) => {
      copyMessage.value = 'Text copied to clipboard'
      setTimeout(() => {
        copyMessage.value = ''
      }, 300)
      return JSON.stringify(textToCopy.value, null, 2)
    }
  })
})
</script>
<template>
  <article class="app-item">
    <div class="copyAlert">
      <fa-icon class="copy" :icon="['far', 'copy']" title="Copy your client info" />
      <p>{{ copyMessage }}</p>
    </div>
    <h2>Duplo</h2>
    <p><span class="label">Id</span>661d31c60b7c6939922dc50a</p>
    <p><span class="label">Created</span> March 23 2024</p>
    <p>
      <span class="label">Public Key</span>
      BHsU8FO_dmU3YF48TS1gSOCU-kFBOx0ZSLsi7dAgX2ztDjLD7sO0insz45he-4FKLjeNYbWfzyp6FoIvOZ83imk
    </p>
    <p><span class="label">Organization Id</span>661be2e39ec92ba8cae15929</p>
    <button type="button" class="button-outline danger-outline">Delete</button>
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
  padding: 1px 2px;
  font-size: 13px;
}
.copy {
  font-size: 20px;
  color: var(--primary);
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
}
</style>
