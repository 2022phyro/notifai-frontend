
<script setup>
import { ref, reactive } from "vue"
const keyName = ref('')
const expiryDate = ref('')
const scopes = reactive({
    all: false,
    admin: false,
    read: false
})
const showForm = ref(false)
const dD = ref(false)
const chosen = ref('7 days')
const generateKey = () => {
}
const changeDate = (days, value) => {
  expiryDate.value = new Date() + (days * 24 *60 * 60 * 1000)
	chosen.value = value
	showForm.value = ref(false)
}
const customV = () => {
	showForm.value = true
	chosen.value = 'Custom'
}
</script>
<template>
    <div class="newKey">
        <div class="header">
            <p class="pri b "><span @click="newKey = null">Keys/</span><span>new</span></p>
        </div>
        <form @submit.prevent="generateKey">
            <div class="form-group">
                <label for="alias">Name</label>
                <input v-model="keyName" id="alias" type='text' required>
            </div>
            <div class="form-group exp">
                <label for="exp"> Expiring</label>
								<div class="dropdown">
									<p class="select">{{ chosen }}<fa-icon :icon="['fas', dD ? 'caret-down': 'caret-up']" @click="dD = !dD"/></p>
									<ul v-if="dD">
										<li @click="changeDate(1, '1 day')">1 day</li>
										<li @click="changeDate(7, '7 days')">7 days</li>
										<li @click="changeDate(30, '30 days')">30 days</li>
										<li>Custom</li>
									</ul>
								</div>
                <input v-if="showForm" v-model="expiryDate" id="exp" type="date" required>
            </div>
            <div class="form-group">
                <label for="scopes">Scope</label>
                <div class="checkbox-group">
                    <input v-model="scopes.all" type="checkbox" id="all">
                    <label for="all">All - Full access to all resources</label>
                </div>
                <div class="checkbox-group">
                    <input v-model="scopes.admin" type="checkbox" id="adm">
                    <label for="adm">Admin - Access to administrative resources</label>
                </div>
                <div class="checkbox-group">
                    <input v-model="scopes.read" type="checkbox" id="read">
                    <label for="read">Read - Read-only access to resources</label>
                </div>
            </div>
            <div class="decide">
                <button class="b-pri" type="submit">Generate</button>
                <button class="b-sec" @click="newKey = null">Cancel</button>
            </div>
        </form>
    </div>
</template>


<style scoped>
.newKey {
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 5px;
}

.header {
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 10px;
}

.checkbox-group {
    margin-bottom: 5px;
}

.form-group label {
	display: block;
}
.decide {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}
.exp {
	display: flex;
	flex-flow: row nowrap;
	align-items: flex-start;
}
.select {
	width: 100%;
	display: flex;
	flex-flow: row;
	justify-content: space-between;
	padding: 5px 10px;
	align-items: center;
	border-bottom: 1px solid red;
}
.dropdown {
	border: 1px solid #ccc;
	width: 120px;
	display: flex;
	flex-flow: column;
}
.dropdown ul {
	list-style-type: none;
	padding: 10px;
	cursor: pointer;
}
.dropdown ul li:hover {
	background: var(--primary);
	color: white;
	padding: 0 5px;
}

</style>
