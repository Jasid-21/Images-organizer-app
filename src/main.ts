import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft, faChevronRight, faUpload } from '@fortawesome/free-solid-svg-icons';

library.add(faChevronLeft, faChevronRight, faUpload);

const pinia = createPinia();
const app = createApp(App)
app.use(pinia);
app.component('fai', FontAwesomeIcon);
app.use(router);
app.mount('#app');
