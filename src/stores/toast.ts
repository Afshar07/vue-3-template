import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type {toastModel} from "@/models/toastModel";
export const useToastStore = defineStore('toast', {
    persist:true,
    state:()=>({
        showToast:false,
        text:'',
        toastData:{} as toastModel
    }),
    getters:{

        getToast ():Boolean {
            return this.showToast
        }
    }
})
