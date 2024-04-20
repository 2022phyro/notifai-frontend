<script setup>
import ApiKey from './ApiKey.vue';
</script>
<template>
    <div class="api-keys">
        <div class="header">
            <h2>API Keys</h2>
            <div class="decision">
                <button class="button-outline">Generate new key</button>
                <button class="button-outline danger-outline">Revoke all keys</button>
            </div>
        </div>
        <p>Keys that you create here will allow you to access the SDK and the NotifAI API</p>
        <ApiKey  />
        <ApiKey />
        <ApiKey class="grey" />
        <ApiKey/>
        <ApiKey class="red"/>
    </div>
</template>
<style scoped>
.header {
    width: 100%;
    border-bottom: 1px solid #ccc;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 10px 30px;
    position: sticky;
    top: 0;
    background: var(--color-background);
}
.decision {
    display: flex;
    gap: 20px;
}
.api-keys {
    padding: 30px;
    display: flex;
    flex-flow: column;
    gap: 20px;
    align-items: center;
}
.grey {
    background: #ececec;
}
.red {
    background: #e98888;
}
</style>