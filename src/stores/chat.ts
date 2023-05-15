import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
export const userChatStore = defineStore("chat", {
    state: () => ({
        SocketUserId: 2,
    }),
    getters: {
        SocketId():number {
            return this.SocketUserId;
        },
    },
    actions: {
        SetDefaultSocketId() {
            this.SocketUserId = 0;
        },
        sendMessage(resultId:number) {
            this.SocketUserId = resultId;
        },
    },
});
