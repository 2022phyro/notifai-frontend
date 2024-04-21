<script setup>
import { formatDate } from '@/utils/auth.js'
const emit = defineEmits(['viewMsg', 'deleteMsg'])
const props = defineProps({
  _id: String,
  userId: String,
  appId: String,
  created: String,
  read: Boolean,
  retries: Number,
  status: String
})
const viewMsg = () => {
  emit('viewMsg', props._id)
}

const deleteMsg = () => {
  emit('deleteMsg', props._id)
}
</script>
<template>
  <article>
    <div class="menu">
      <fa-icon class="icon delete btn" :icon="['far', 'trash-can']" @click="deleteMsg" />
      <fa-icon class="icon view btn" :icon="['far', 'eye']" @click="viewMsg" />
    </div>
    <div class="part">
      <h3><span class="label">id</span>{{ props._id }}</h3>
      <p><span class="label">User's id</span>{{ props.userId }}</p>
      <p><span class="label">read</span>{{ props.read }}</p>
    </div>
    <div class="part">
      <p><span class="label">status</span>{{ props.status }}</p>
      <p><span class="label">retries</span>{{ props.retries }}</p>
      <p><span class="label">created</span>{{ formatDate(props.created) }}</p>
    </div>
  </article>
</template>
<style scoped>
article {
  border: 1px solid #ccc;
  padding: 30px;
  cursor: pointer;
  position: relative;
  width: 550px;
  display: flex;
  justify-content: flex-start;
  flex-flow: row nowrap;
  font-size: 13px;
}
article > .part {
  display: flex;
  flex-flow: column nowrap;
  width: 250px;
}

.menu {
  position: absolute;
  top: 30px;
  right: 20px;
  display: flex;
  flex-flow: column;
  gap: 20px;
}
.view {
  color: var(--primary);
  font-weight: 100;
}
.delete {
  color: red;
  font-weight: 900;
}
</style>
