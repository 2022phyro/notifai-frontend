<script setup>
import { ref, reactive, watch, computed } from 'vue'
import MessageItem from './MessageItem.vue'
import FilterBoard from './FilterBoard.vue'
import { inst, BASE_URL } from '@/utils/auth'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'
const props = defineProps({
  del: String
})
const del = computed(() => props.del)
const { currApp } = storeToRefs(useAppStore())
const messages = ref([])
const isActive = ref(false)
const emit = defineEmits(['showMsg', 'deleteMsg'])
const filters = reactive({
  status: '',
  userId: '',
  retries: 0,
  read: null
})
const page = ref(1)
const next = ref(null)
const prev = ref(null)

const fetchMessages = async (pageNo, going) => {
  if (!pageNo || pageNo < 1) return
  const queryString = Object.keys(filters)
    .filter((key) => filters[key] !== '' && filters[key] !== null)
    .map((key) => `${key}=${filters[key]}`)
    .join('&')
  try {
    const instance = await inst(true)
    const res = await instance.get(
      `${BASE_URL}/apps/${currApp.value._id}/notifications?page=${pageNo}&${queryString}`
    )
    const { data } = res.data
    console.log(data)
    if (going === 'next' && data.messages.length <= 0) {
      next.value = null
      return
    }
    messages.value = data.messages
    next.value = data.next
    prev.value = data.prev
    page.value = pageNo
  } catch (error) {
    console.error(error)
  }
}
const handleFilter = async (filterValues) => {
  filters.status = ''
  filters.read = null
  filters.userId = ''
  filters.retries = 0
  Object.assign(filters, filterValues)
  await fetchMessages(page.value)
}
const goNext = async () => {
  await fetchMessages(next.value, 'next')
}
const goPrev = async () => {
  await fetchMessages(prev.value)
}

watch(
  currApp,
  async (newApp) => {
    if (newApp && newApp._id) {
      await fetchMessages(page.value)
    }
  },
  { immediate: true }
)
watch(del, async (newVal, oldVal) => {
  if (newVal && newVal !== oldVal && newVal !== '') {
    messages.value = messages.value.filter((message) => message._id !== newVal)
  }
})

const deleteMsg = (id) => {
  emit('deleteMsg', id)
}
const viewMsg = (id) => {
  emit('showMsg', id)
}

const toggleActive = () => {
  isActive.value = !isActive.value
}
</script>
<template>
  <div>
    <div class="message-filter" :class="{ active: !isActive }">
      <button class="b-pri filter" v-if="!isActive" @click="toggleActive">Filters</button>
      <fa-icon class="btn filter" :icon="['fa', 'xmark']" v-else @click="toggleActive" />
      <FilterBoard @filter="handleFilter" />
    </div>
    <div class="message-wrapper">
      <MessageItem
        v-for="(message, index) in messages"
        v-bind="message"
        :key="index"
        @deleteMsg="deleteMsg"
        @viewMsg="viewMsg"
      />
    </div>
    <footer>
      <fa-icon
        type="button"
        :disabled="prev"
        class="btn"
        :icon="['fas', 'chevron-left']"
        @click="goPrev"
      />
      {{ page }}
      <fa-icon
        type="button"
        :disabled="next"
        class="btn"
        :icon="['fas', 'chevron-right']"
        @click="goNext"
      />
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
  font-size: 13px;
  top: 20px;
  left: -30px;
}
.message-filter.active > .filter {
  left: -150px;
}
</style>
