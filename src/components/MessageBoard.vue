<script setup>
import { ref } from 'vue'
import MessageItem from './MessageItem.vue'
import FilterBoard from './FilterBoard.vue'
const messages = Array.from({ length: 20 })
const isActive = ref(false)
const emit = defineEmits(['showMsg', 'deleteMsg'])

const deleteMsg = () => {
  emit('deleteMsg')
}
const viewMsg = () => {
  emit('showMsg')
}

const toggleActive = () => {
  isActive.value = !isActive.value
}
</script>
<template>
  <div>
    <div class="message-filter" :class="{ active: !isActive }">
      <button class="button-outline filter" v-if="!isActive" @click="toggleActive">Filters</button>
      <fa-icon class="btn filter" :icon="['fa', 'xmark']" v-else @click="toggleActive" />
      <FilterBoard />
    </div>
    <div class="message-wrapper">
      <MessageItem
        v-for="(message, index) in messages"
        :key="index"
        @deleteMsg="deleteMsg"
        @viewMsg="viewMsg"
      />
    </div>
    <footer>
      <fa-icon class="btn" :icon="['fas', 'chevron-left']" />
      1
      <fa-icon class="btn" :icon="['fas', 'chevron-right']" />
    </footer>
  </div>
</template>
<style scoped>
.message-wrapper {
  width: 700px;
  flex-grow: 0;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-evenly;
  gap: 30px;
  padding: 30px 30px 50px 30px;
}
div.message-filter {
  transition: right 0.5s ease;
  background-color: var(--color-background);
  z-index: 1;
  right: 0;
  width: 250px;
}

.message-filter.active {
  right: -250px;
}

footer {
  position: fixed;
  bottom: 0;
  width: 700px;
  /* border: 1px solid red; */
  font-weight: 800;
  background-color: var(--color-background);
  display: flex;
  flex-flow: row;
  justify-content: space-evenly;
  align-items: center;
  height: 40px;
}
footer > svg {
  cursor: pointer;
  font-weight: 900;
}
.message-filter {
  position: fixed;
  right: 20px;
  height: 100%;
  border: 1px solid var(--primary);
}
.filter {
  position: absolute;
  font-size: 20px;
  top: 20px;
  left: -30px;
}
.message-filter.active > .filter {
  left: -150px;
}
</style>
