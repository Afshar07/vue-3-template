import {useToastStore} from "@/stores/toast";
import {SignErrors} from "@/models/signErrors";

export default (errorCode:number)=>{
const toastStore = useToastStore()
    toastStore.showToast = true
    toastStore.toastData ={
        title: 'Failed',
        content: SignErrors[errorCode],
        icon: 'alert'
    }

}
