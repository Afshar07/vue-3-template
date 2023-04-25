import {useToastStore} from "@/stores/toast";
export default {

    install: (app) => {
        let toastStore = useToastStore()
        const toast = {
            success({ content = "" }) {
                toastStore.success({ content})

            },
            error({ content = ""}) {
                toastStore.error({ content})
            }
        }
        app.provide('toast', toast)
    }
}
