<script setup>
import { ref, watchEffect, reactive } from 'vue'
const emit = defineEmits(['filter'])
const status = ref(null)
const retries = ref(0)
const userId = ref('')
const read = ref(null)

const filterValues = reactive({
  status: status.value,
  retries: retries.value,
  userId: userId.value,
  read: read.value
})

watchEffect(() => {
  filterValues.status = status.value
  filterValues.retries = retries.value
  filterValues.userId = userId.value
  filterValues.read = read.value
})

const resetAll = () => {
  status.value = null
  retries.value = 0
  userId.value = ''
  read.value = null
}
const search = () => {
  const nonEmptyValues = Object.fromEntries(
    Object.entries(filterValues).filter(([key, value]) => value !== null && value !== '')
  )
  emit('filter', nonEmptyValues)
}
</script>
<template>
  <div class="filter-bar">
    <div class="reset-main">
      <div class="reset b-pri" @click="resetAll">
        <fa-icon :icon="['fa', 'rotate-right']" /> Reset all
      </div>
      <div class="reset b-pri" @click="search"><fa-icon :icon="['fa', 'search']" /></div>
    </div>
    <div class="status option">
      <h2>STATUS</h2>
      <form>
        <div>
          <input type="radio" id="pending" value="PENDING" v-model="status" />
          <label for="pending">PENDING</label>
        </div>

        <div>
          <input type="radio" id="success" value="SUCCESS" v-model="status" />
          <label for="success">SUCCESS</label>
        </div>
        <div>
          <input type="radio" id="fail" value="FAIL" v-model="status" />
          <label for="fail">FAIL</label>
        </div>
      </form>
    </div>
    <div class="retries option">
      <h2>RETRIES</h2>
      <input type="number" v-model.number="retries" min="0" max="5" />
    </div>
    <div class="user option">
      <h2>User Id</h2>
      <input type="text" v-model.lazy="userId" placeholder="Enter user ID" />
    </div>
    <div class="read option">
      <h2>READ</h2>
      <form>
        <div>
          <input type="radio" id="true" value="true" v-model="read" />
          <label for="true">True</label>
        </div>
        <div>
          <input type="radio" id="false" value="false" v-model="read" />
          <label for="false">False</label>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped>
.filter-bar {
  padding: 20px;
  padding-top: 60px;
}
.reset {
  font-size: 12px;
  display: flex;
  gap: 10px;
  align-items: center;
}
.reset-main {
	display: flex;
  justify-content: space-between;
}
.option {
  padding: 10px;
  margin: 20px 0;
  border: 1px solid #ccc;
}
.option h2 {
  color: var(--primary);
  font-size: 13px;
  font-weight: 600;
}
.option.status {
  display: flex;
  font-size: 13px;
  flex-flow: column nowrap;
}
.option div {
  display: flex;
  align-items: center;
  gap: 4px;
}
input[type='text'],
input[type='number'] {
  font-family: var(--body-font2);
  outline: none;
  border: 1px solid #ccc;
  padding: 4px 10px;
}
input[type='text'] {
  width: 100%;
}
input[type='radio'] {
  display: none;
  padding: 0;
}

input[type='radio'] + label {
  position: relative;
  padding-left: 20px;
  cursor: pointer;
}

input[type='radio'] + label::before {
  content: '';
  position: absolute;
  left: 0;
  top: 20%;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 2px solid #ccc;
}

input[type='radio']:checked + label::after {
  content: '';
  position: absolute;
  left: 4px;
  top: calc(20% + 3.25px);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--primary);
}
input[type='radio']:checked + label::before {
  border: 2px solid var(--primary);
}
</style>
