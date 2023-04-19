import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    persist:true,
    state:()=>({
        theme:'',
        showOverlay:false
    }),
    getters:{
        getSiteTheme ():string {
            return this.theme
        },
        getOverlayState():Boolean{
            return this.showOverlay
        }
    },

})
