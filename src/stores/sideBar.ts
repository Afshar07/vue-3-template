import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSideBarStore = defineStore('counter', {
    state:()=>({
            showSideBar:false
    }),
    getters:{

        getSidebar ():Boolean {
            return this.showSideBar
        }
    },

})
