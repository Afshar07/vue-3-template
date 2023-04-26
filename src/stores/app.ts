import {ref, computed} from 'vue'
import {defineStore} from 'pinia'

export const useAppStore = defineStore('app', {
    persist: true,
    state: () => ({
        theme: false,
        showOverlay: false,
        isRTL:false,
    }),
    getters: {
        getSiteTheme(): Boolean {
            return this.theme
        },
        getOverlayState(): Boolean {
            return this.showOverlay
        }
    },
    actions: {
        toggleSiteTheme() {
            const body:any = document.querySelector('body')
            if (this.theme) {
                this.theme = false
                body.classList.toggle('dark')
            } else {
                this.theme = true
                body.classList.toggle('dark')
            }
        },
    }

})
