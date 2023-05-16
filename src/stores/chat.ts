import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
export const useChatStore = defineStore("chat", {
    state: () => ({
        SocketUserId: 0,
    }),
    getters: {
        getSocketId():number {
            return this.SocketUserId;
        },
    },
    actions: {
        setDefaultSocketId() {
            this.SocketUserId = 0;
        },
        sendMessage(resultId:number) {
            this.SocketUserId = resultId;

        },
    },
});
