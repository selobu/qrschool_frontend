import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import {vuetify} from './plugins/vuetify.js';
import router from './router';
import {pinia} from './plugins/pinia.js';
import { plugin } from '@formkit/vue'
import { config } from './plugins/formkit.js'


createApp(App).
    use(vuetify).
    use(router).
    use(pinia).
    use(plugin, config).
    mount('#app')
