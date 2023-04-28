import {useToastStore} from "@/stores/toast";
import {SignErrors} from "@/models/signErrors";
const toastStore = useToastStore();
export default (errorCode:number)=>{
    toastStore.error({content:SignErrors[errorCode]});
}
