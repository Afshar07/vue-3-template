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
import "remixicon/fonts/remixicon.css";
import repositories from './plugins/repositories.js'
import  './plugins/audioPolyfill'
import helper from "@/plugins/helper";
// @ts-ignore
import signalR from "@/plugins/vue-signalR.js";
// @ts-ignore
import { LMap, LTileLayer, LMarker } from "leaflet";
import Cookie from 'vue-cookies';
import "leaflet/dist/leaflet.css";
import toast from "@/plugins/toast";
const app = createApp(App)
app.component("l-map", LMap);
app.component("l-tile-layer", LTileLayer);
app.component("l-marker", LMarker);
app.component('v-select',VueSelect)
app.use(pinia)
app.use(router)
app.use(Cookie)
app.use(repositories)
app.use(signalR)
app.use(helper)
app.use(toast)

app.mount('#app')
