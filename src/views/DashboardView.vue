<script setup>
import { ref, reactive } from 'vue'
import { RouterView } from 'vue-router'
import NavigationMenu from '@/components/NavigationMenu.vue'
import PopUp from '@/components/PopUp.vue'

const popup = reactive({
  visible: false,
  type: null,
  callback: null,
  url: '',
  decision: false,
  // Add other properties here...
});

const closePopUp = () => {
    popup.visible = false,
    popup.type = null
}

const handleShowMsg = (value) => {
  popup.visible = true;
  popup.type = "showMsg";
  popup.url = value
  // Update other properties here...
};
const handleDeleteMsg = (id) => {
    popup.visible = true;
    popup.type = "deleteMsg";
    popup.decision = true;
    popup.callback = () => {
        console.log('Id deleted:', id)
        closePopUp()
    }
}
</script>
<template>
    <div class="dashboard">
        <NavigationMenu/>
        <div class="body">
            <RouterView @showMsg="handleShowMsg" @deleteMsg="handleDeleteMsg"/>
        </div>
    </div>
    <PopUp
     v-bind="popup"
     @closePopUp="closePopUp"
    />
</template>
<style scoped>
.body {
    position: absolute;
    left: 150px;
    top: 0;
    width: calc(100vw - 150px);
    height: 100vh;
    /* border: 1px solid red; */
    overflow: scroll;
}
</style>