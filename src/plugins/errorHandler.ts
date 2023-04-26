import {useToastStore} from "@/stores/toast";
import {SignErrors} from "@/models/signErrors";
import {inject} from "vue";
const toast:any = inject('toast')
export default (errorCode:number)=>{
    toast.error({content:SignErrors[errorCode]});

}
