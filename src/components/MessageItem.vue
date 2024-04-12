<script setup>
const emit = defineEmits(['viewMsg', 'deleteMsg'])

const viewMsg = () => {
    emit('viewMsg')
}

const deleteMsg = () => {
    emit('deleteMsg', 'your-user-id')
}
</script>
<template>
    <article>
        <div class="menu">
            <fa-icon class="icon delete btn" :icon="['far', 'trash-can']" @click="deleteMsg"/>
            <fa-icon class="icon view btn" :icon="['far', 'eye']" @click="viewMsg"/>
        </div>
        <div class="part">
            <h3><span class="label">id</span>5697965060</h3>
            <p><span class="label">User's id</span>your-user-id</p>
            <p><span class="label">read</span>false</p>
        </div>
        <div class="part">
            <p><span class="label">status</span>FAILED</p>
            <p><span class="label">retries</span>0</p>
            <p><span class="label">created</span>March 2 2024</p>            
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
}
article > .part {
    display: flex;
    flex-flow: column nowrap;
    width: 250px;
}
.label {
    margin-right: 10px;
    color: var(--primary);
    font-weight: 600;
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