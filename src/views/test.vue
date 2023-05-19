<template>
  <div class="main-card">
<!--    <div  class="chat   " style="" :class="`chat-${props.chatDirection}`">-->
<!--      <div class="chat-header">-->
<!--        <time class="text-xs opacity-80">{{-->
<!--            helper.detailedParsedDate(props.createDate)-->
<!--          }}</time>-->
<!--      </div>-->
<!--      <div class="chat-bubble text-sm">{{ props.chatMessage }}</div>-->
<!--      <div-->
<!--          v-if="props.chatDirection != 'start'"-->
<!--          class="chat-footer opacity-50 flex items-center relative mt-1"-->
<!--      >-->
<!--        <svg-->
<!--            xmlns="http://www.w3.org/2000/svg"-->
<!--            viewBox="0 0 20 20"-->
<!--            fill="currentColor"-->
<!--            class="w-4 h-4"-->
<!--            :class="props.isRead ? 'text-blue-700' : ''"-->
<!--        >-->
<!--          <path-->
<!--              fill-rule="evenodd"-->
<!--              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"-->
<!--              clip-rule="evenodd"-->
<!--          />-->
<!--        </svg>-->
<!--        <svg-->
<!--            v-if="props.isDelivered"-->
<!--            xmlns="http://www.w3.org/2000/svg"-->
<!--            viewBox="0 0 20 20"-->
<!--            fill="currentColor"-->
<!--            class="w-4 h-4 absolute left-[0.3rem]"-->
<!--            :class="props.isRead ? 'text-blue-700' : ''"-->
<!--        >-->
<!--          <path-->
<!--              fill-rule="evenodd"-->
<!--              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"-->
<!--              clip-rule="evenodd"-->
<!--          />-->
<!--        </svg>-->
<!--      </div>-->
<!--    </div>-->
<Chat></Chat>
  </div>
</template>

<script setup>
import Chat from '@/components/main/Chat.vue'
import {useToastStore} from "@/stores/toast";
import {inject} from "vue";
const toast = inject('toast');
const toastStore = useToastStore();

function showToast(){
  toast.success({content:'hello world'});
}
</script>

<style scoped>

</style>




<!--<script>-->
<!--export default {-->
<!--  emits: ["getAudioBlob", "getMediaRecorderState"],-->
<!--  data() {-->
<!--    return {-->
<!--      audioPermission: {audio: true},-->
<!--      isRecording: false,-->
<!--      isPlaying: false,-->
<!--      audioChunks: [],-->
<!--      audioBlob: null,-->
<!--      mainStream: null,-->
<!--      base64Data: null,-->
<!--      mediaRecorderState: null,-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    async startRecording() {-->
<!--      try {-->
<!--        this.mainStream = await navigator.mediaDevices.getUserMedia(-->
<!--            this.audioPermission-->
<!--        );-->
<!--        this.audioChunks = [];-->
<!--        this.handleRecording();-->
<!--      } catch (error) {-->
<!--        console.log(error);-->
<!--        if (-->
<!--            error.name === "NotFoundError" ||-->
<!--            error.name === "DevicesNotFoundError"-->
<!--        ) {-->
<!--          this.$toast.show({content: `هیچ میکروفونی روی دستگاه شما یافت نشد`, Title: 'عملیات ناموفق', Icon: 'alert'})-->

<!--        } else if (-->
<!--            error.name === "NotAllowedError" ||-->
<!--            error.name === "PermissionDeniedError"-->
<!--        ) {-->
<!--          this.$toast.show({content: `دسترسی میکروفون خود را فعال کنید`, Title: 'عملیات ناموفق', Icon: 'alert'})-->

<!--        }-->
<!--      }-->
<!--    },-->
<!--    handleRecording() {-->
<!--      this.mediaRecorder = new MediaRecorder(this.mainStream);-->
<!--      this.mediaRecorder.start();-->
<!--      this.mediaRecorder.addEventListener("dataavailable", (event) => {-->
<!--        this.audioChunks.push(event.data);-->
<!--      });-->
<!--      this.$emit("getMediaRecorderState", this.mediaRecorder.state);-->
<!--    },-->
<!--    async stopRecording() {-->
<!--      await this.mediaRecorder.addEventListener("stop", () => {-->
<!--        this.audioBlob = new Blob(this.audioChunks, {-->
<!--          type: this.mediaRecorder.mimeType,-->
<!--        });-->

<!--        this.$emit("getAudioBlob", this.audioBlob);-->
<!--      });-->
<!--      if (this.mediaRecorder.state !== "inactive") {-->
<!--        this.mainStream.getTracks()[0].stop();-->
<!--        this.mediaRecorder.stop();-->
<!--      }-->
<!--      this.isPlaying = true;-->
<!--      this.$emit("getMediaRecorderState", this.mediaRecorder.state);-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->