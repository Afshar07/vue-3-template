import {createApp} from 'vue'
import {createPinia} from 'pinia'
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
import './plugins/audioPolyfill'
import helper from "@/plugins/helper";
// @ts-ignore
import signalR from "@/plugins/vue-signalR.js";
import Vue3PersianDateTimePicker from 'vue3-persian-datetime-picker'
// @ts-ignore
import Cookie from 'vue-cookies';
import toast from "@/plugins/toast";

const app = createApp(App)
app.use(Vue3PersianDateTimePicker, {
    name: 'custom-date-picker',
    props: {
        format: "YYYY-MM-DD HH:mm",
        displayFormat: "jYYYY-jMM-jDD HH:mm",
        editable: false,
        inputClass: 'text-right bg-gray-50 ring-0 text-[14px] rounded-lg dark:text-gray-900 placeholder:text-[14px] !leading-10',
        placeholder: 'لطفا یک تاریخ انتخاب کنید',
        color: '#06b6d4',
        autoSubmit: false,
        clearable: true,
    }
});
app.component('v-select', VueSelect)
app.component('datePicker', Vue3PersianDateTimePicker)
app.use(pinia)
app.use(router)
app.use(Cookie)
app.use(repositories)
app.use(signalR)
app.use(helper)
app.use(toast)

app.mount('#app')
