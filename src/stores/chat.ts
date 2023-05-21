import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
export const useChatStore = defineStore("chat", {
  state: () => ({
    SocketUserId: 0,
    readMessage: false,
    deliverMessage: false,
  }),
  getters: {
    getSocketId(): number {
      return this.SocketUserId;
    },
    isMessageReaded(): boolean {
      return this.readMessage;
    },
    isMessageDelivered(): boolean {
      return this.deliverMessage;
    },
  },
  actions: {
    setDefaultSocketId() {
      this.SocketUserId = 0;
    },
    sendMessage(resultId: number) {
      this.SocketUserId = resultId;
    },
    messageReaded(bool: boolean) {
      this.readMessage = bool;
    },
    messageDelivered(bool: boolean) {
      this.deliverMessage = bool;
    },
  },
});
