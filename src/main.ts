import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import App from './App.vue';
import router from './router/index';
import { key, store } from './store';
import 'element-plus/dist/index.css';
import 'normalize.css';
import './style/index.less';

const app = createApp(App);
app.use(router);
app.use(store, key);
app.use(ElementPlus);

app.mount('#app');
