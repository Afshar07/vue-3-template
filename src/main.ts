import {createApp} from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
//@ts-ignore
import VueSelect from 'vue-select'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
import App from './App.vue'
import router from './router'
import './assets/main.css'
import "vue-select/dist/vue-select.css";
import repositories from './plugins/repositories.js'
import helper from "@/plugins/helper";
// @ts-ignore
import { LMap, LTileLayer, LMarker } from "leaflet";
import "leaflet/dist/leaflet.css";
const app = createApp(App)
app.component("l-map", LMap);
app.component("l-tile-layer", LTileLayer);
app.component("l-marker", LMarker);
app.component('v-select',VueSelect)
app.use(pinia)
app.use(router)
app.use(repositories)
app.use(helper)

app.mount('#app')
