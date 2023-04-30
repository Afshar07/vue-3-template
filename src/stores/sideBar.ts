import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSideBarStore = defineStore('sideBar', {
    persist:true,
    state:()=>({
            showSideBar:true
    }),
    getters:{

        getSidebar ():Boolean {
            return this.showSideBar
        }
    },

})
