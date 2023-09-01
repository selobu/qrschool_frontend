import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import {vuetify} from './plugins/vuetify.js';
import router from './router';
import {pinia} from './plugins/pinia.js';

createApp(App).use(vuetify).use(router).use(pinia).mount('#app')
