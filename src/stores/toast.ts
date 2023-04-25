import { ref, computed } from 'vue'
import { defineStore} from 'pinia'
import type {toastModel} from "@/models/toastModel";
export const useToastStore = defineStore('toast', {
    state:()=>({
        toastData:{} as toastModel
    }),

    actions:{
        success(dataObj:any){
            this.toastData.content = dataObj.content
        },
        error(dataObj:any){
            this.toastData.content = dataObj.content

            console.log(dataObj)
        },
        clearToastData(){
            this.toastData = {} as toastModel
        }
    }
})
