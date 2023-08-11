// import './assets/main.css'
//
// import { createApp } from 'vue'
// import App from './App.vue'
//
// createApp(App).mount('#app')
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles.css';


const app = createApp(App);
app.use(router);
app.mount('#app');

