import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faHouse,
  faPen,
  faFeather,
  faGear,
  faBookOpen,
  faChevronRight,
  faChevronLeft,
  faFilter,
  faRotateRight,
  faXmark,
  faSearch,
  faMobileScreenButton,
  faKey,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons'
import { faEye, faTrashCan, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
library.add({
  faHouse,
  faGear,
  faFeather,
  faPen,
  faBookOpen,
  faTrashCan,
  faEye,
  faEyeSlash,
  faChevronRight,
  faChevronLeft,
  faFilter,
  faRotateRight,
  faXmark,
  faSearch,
  faKey,
  faChevronDown,
  faMobileScreenButton
})
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('fa-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')
