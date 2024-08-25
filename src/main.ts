import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import * as FaIcons from "oh-vue-icons/icons/fa";
import { addIcons, OhVueIcon } from 'oh-vue-icons'

const Fa = Object.values({ ...FaIcons });
addIcons(...Fa);

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component("v-icon", OhVueIcon);

app.mount('#app')
