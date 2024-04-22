<script setup>
import { formatDate } from '@/utils/formats'
const emit = defineEmits(['revoke', 'delete'])
const props = defineProps({
  name: String,
  _id: String,
	alias: String,
	created: String,
	expires: String,
	revoked: Boolean,
	appId: String,
	scopes: Array,
  lastUsed: String
})
const deleteKey = () => {
  emit('delete', props.name)
}
const revoke = () => {
  emit('revoke', props.name)
}

const isExpired = () => {
  return new Date(props.expires) < new Date()
}

  </script>
<template>
  <div :class="{'api-key': true, 'red': props.revoked, 'grey': isExpired()}">
		<p class="h1"><span class="pri">{{ props.alias }}</span><span class="i">{{props.revoked? 'Revoked ':'Last used ' }}{{formatDate(props.lastUsed, 'human')}}</span></p>
		<p class="italics">{{ props.scopes.join(", ") }}</p>
    <div class="decide">
      <p>{{isExpired()? 'Expired':'Expiring'}} <span class="b i">{{formatDate(props.expires, 'abs-date')}}</span></p>
      <div >
        <button v-if="!isExpired() && !props.revoked" class="b-sec" @click="revoke">Revoke</button>
        <button class="b-danger" @click="deleteKey">Delete</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.api-key {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 1px 0.5px 1px #ccc;
  border-radius: 4px;
  /* margin: 10px 30px; */
  font-size: 13px;
  width: 100%;
  max-width: 700px;
  align-items: flex-start;
  /* height: 80px; */
}
.h1 {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.decide {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: inherit;
}
.decide > div {
  display: flex;
  flex-flow: row;
  gap: 30px;
}
.decide button {
  font-size: 12px;
  padding: 8px 10px;
  font-weight: 300;
}
.grey {
  background: #ececec;
}
.red {
  background: #fccdcd;
}
</style>
