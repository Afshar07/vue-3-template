<template>
  <div class="w-full min-h-full bg-white relative">
    <header
      class="h-14 shadow-md w-full flex items-center justify-between p-4 sticky top-0 right-0 bg-white !z-10"
    >
      <div v-if="userData" class="avatar-name-section flex items-center">
        <div class="avatar placeholder">
          <div class="w-10 h-10 rounded-full">
            <img
              v-if="userData.profileImage"
              :src="helper.baseUrl +userData.profileImage "
              src="https://static.wikia.nocookie.net/starwars/images/6/6f/Anakin_Skywalker_RotS.png/"
            />
            <div
              v-else
              class="bg-neutral-focus flex items-center justify-center text-neutral-content rounded-full h-10 w-10"
            >
              <span class="text-3xl">{{
                userData["name"].substring(0, 1)
              }}</span>
            </div>
          </div>
        </div>
        <h2 class="mr-2 font-semibold">
          {{ userData["name"] + " " + userData["familyName"] }}
        </h2>
      </div>
      <span @click="routeBack" class="cursor-pointer">
        <ChevronLeft class="w-5 h-5"></ChevronLeft>
      </span>
    </header>
    <main
      ref="chatContainer"
      class="h-full min-h-[calc(100vh-28px)] overflow-scroll space-y-2 mt-1 pt-4 pb-10 bg-[url('../chatbg2.webp')] bg-cover bg-no-repeat px-2   md:bg-full bg-fixed"
      dir="ltr"
    >
      <chat-bubble
        @emitSelectedMedia="setSelectedMedia"
        v-for="(item, idx) in conversation"
        :ref="(el) => (chatItems[idx] = el)"
        :message="item"
        :id="`bubble${idx}`"
        :chatDirection="item.position"
        :chatMessage="item.message"
        :isRead="item.isRead"
        :isDelivered="item.isDelivered"
        :createDate="item.createDate"
      ></chat-bubble>
    </main>
    <footer
      class="fixed md:sticky w-full bottom-0 h-14 shadow border-t p-1 flex items-center bg-white"
    >
      <div class="w-full flex items-center justify-between">
        <div
          class="w-auto flex items-center justify-around md:justify-start gap-x-1 md:gap-x-5 mx-1 md:mx-4"
        >
          <!-- Send Button -->
          <button
            @click="sendMessage"
            type="button"
            class="sm:btn sm:btn-sm sm:bg-violet border-none"
          >
            <SendIcon class="md:w-5 md:h-5 w-6 h-6"></SendIcon>
          </button>
          <input
            type="file"
            ref="mediaInput"
            accept="image/png,image/jpeg"
            class="hidden"
            @input="handleFileUpload"
          />
          <!-- Attachment Button -->
          <label
            for="chatMediaModal"
            class="md:mx-0.5 mx-1 sm:btn sm:btn-sm sm:bg-primary border-none"
            type="button"
          >
            <label for="showChatMediaModal" ref="showChatMediaBtn"></label>
            <AttachmentIcon class="md:w-5 md:h-5 w-6 h-6"></AttachmentIcon>
          </label>
        </div>

        <input
          @keydown.enter="sendMessage"
          v-model.trim="newMessage.messageBody"
          type="text"
          placeholder="متن پیام را وارد کنید"
          class="input rounded-2xl input-sm w-full bg-gray-100 text-gray-800"
        />
        <!-- Mic Button -->
        <label
          for="voiceRecorder"
          class="mx-3 sm:btn sm:btn-sm sm:bg-secondary border-none"
          type="button"
        >
          <MicIcon class="md:w-5 md:h-5 w-6 h-6"></MicIcon>
        </label>
      </div>
    </footer>
    <Modal
      :id="'voiceRecorder'"
      @ok="sendMessage"
      :closeModalTitle="'بستن'"
      :okModalTitle="'ارسال'"
      :title="'افزودن صوت'"
    >
      <template #modalBody>
        <div class="w-full p-3">
          <AudioRecorder
              @startTimer="startTimer"
            @getAudioBlob="setAudioBlob"
            ref="recorder"
          ></AudioRecorder>
          <div
            class="w-full h-[10rem] flex flex-col items-center justify-center rounded-2xl"
          >
            <button
              v-if="!isRecording"
              type="button"
              @click.stop="startRecording"
            >
              <i class="ri-play-line text-2xl text-green-500"></i>
            </button>
            <div
              v-else
              @click="stopRecording"
              class="blob red cursor-pointer"
            ></div>
            <div
              class="flex items-center dark:text-white flex-row-reverse gap-3 my-2"
            >
              <small>{{ hours }}</small>
              :
              <small>{{ minutes }}</small>
              :
              <small>{{ seconds }}</small>
            </div>
            <audio
              v-if="voiceMedia !== ''"
              :src="generateAudioSrc"
              controls
            ></audio>
          </div>
        </div>
      </template>
    </Modal>

    <Modal
      :id="'chatMediaModal'"
      @ok="sendMessage"
      :closeModalTitle="'بستن'"
      :okModalTitle="'ارسال'"
      :title="'اپلود عکس'"
    >
      <template #modalBody>
        <div class="w-full p-3">
          <div
            v-if="convertedMedia.pictureUrl === ''"
            @click="mediaInput.click()"
            class="rounded-xl bg-gray-500 h-40 flex items-center justify-center"
          >
            <i class="ri-cloud-fill text-white text-5xl"></i>
          </div>
          <div
            v-if="convertedMedia.pictureUrl !== ''"
            @click="mediaInput.click()"
            class="rounded-xl h-40 flex items-center justify-center"
          >
            <img
              :src="convertedMedia.pictureUrl"
              class="w-full h-full object-contain"
              alt=""
            />
          </div>
        </div>
      </template>
    </Modal>

    <Modal :id="'showChatMediaModal'" :closeModalTitle="'بستن'">
      <template #modalBody>
        <div class="w-full overflow-scroll p-3">
          <img
            :src="helper.baseUrl + 'media/gallery/ChatMedia/' + selectedMedia"
            class="w-full h-full object-contain"
            alt=""
          />
        </div>
      </template>
    </Modal>
  </div>
</template>
<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import { computed, inject, onMounted, reactive, ref, watch } from "vue";
import ChevronLeft from "@/components/icons/ChevronLeft.vue";
import ChatBubble from "@/components/utilities/chat/mini/ChatBubble.vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import AttachmentIcon from "@/components/icons/AttachmentIcon.vue";
import MicIcon from "@/components/icons/MicIcon.vue";
import SendIcon from "@/components/icons/SendIcon.vue";
import { messageModel } from "@/models/messageModel";
import { useChatStore } from "@/stores/chat";
import Modal from "@/components/utilities/Modal.vue";
import AudioRecorder from "@/components/utilities/AudioRecorder.vue";
const toast:any = inject('toast')
const chatStore: any = useChatStore();
const repositories: any = inject("repositories");
const helper: any = inject("helper");
const authStore: any = useAuthStore();
const route: any = useRoute();
const router: any = useRouter();
let conversation = ref<any>([]);
let chatItems = ref<any>([]);
let selectedMessageId = ref(0);
let newMessage = reactive<messageModel>({
  subject: "",
  userId: authStore.getUser.userId,
  messageBody: "",
  createDate: new Date(Date.now()).toISOString(),
  parentMessageId: 0,
  isForwarded: false,
  recipientUserId: parseInt(route.params.username),
  recipientGroupId: 0,
  fileData: null,
});
let selectedMedia = ref("");
let showChatMediaBtn: any = ref(null);
let chatContainer: any = ref(null);
let convertedMedia = reactive({
  pictureUrl: "",
  base64: "",
});
let mediaInput = ref<any>(null);
let userData = ref(null);
let observer: any = ref(null);
let isRecording = ref<boolean>(false);
let recorder: any = ref(null);
let audioStopWatch = ref<any>(null);
let seconds = ref<number>(0);
let minutes = ref<number>(0);
let hours = ref<number>(0);
let voiceMedia = ref("");

let generateAudioSrc = computed(() => {
  if (voiceMedia.value !== "") {
    //@ts-ignore
    return URL.createObjectURL(voiceMedia.value);
  }
});

onMounted(async () => {
  await Promise.all([getUser(),deliverMessage(), readMessage(), getConversation(false)]);
  scrollBottom();
  observer.value = new IntersectionObserver(checkObserverView, {
    threshold: 1.0,
  });
  observerElementSelector();
});

let getSocketId = computed(() => {
  return chatStore.SocketUserId;
});
let isMessageReaded = computed(() => {
  return chatStore.isMessageReaded;
});
let isMessageDelivered = computed(() => {
  return chatStore.isMessageDelivered;
});

watch(getSocketId, async (val) => {
  if (val !== undefined && val != 0) {
    await deliverMessage();
    await readMessage();
   await getConversation(false);
  }
  chatStore.setDefaultSocketId();
});
watch(isMessageReaded, async (val) => {
  if (val) {
    await readMessage();
    await getConversation(false)
  }
    chatStore.messageReaded(false);
});
watch(isMessageDelivered, async (val) => {
  if (val) {
    await deliverMessage();
    await getConversation(false)
  }
    chatStore.messageDelivered(false);
});
function setAudioBlob(blob: any) {
  voiceMedia.value = blob;
  const reader = new FileReader();
  reader.onload = (function (theFile) {
    return function () {
      const binaryData: any = reader.result;
      newMessage.fileData = {
        base64: window.btoa(binaryData),
        priority: 2,
      };
    };
  })(blob);
  reader.readAsBinaryString(blob);
}
function startRecording() {
    recorder.value.startRecording();
}
function startTimer(isMicPermissionGranted:boolean){
  if(isMicPermissionGranted){
    isRecording.value = true;
  audioStopWatch.value = setInterval(() => {
    seconds.value++;
    if (seconds.value === 59) {
      seconds.value = 0;
      minutes.value++;
      if (minutes.value === 59) {
        hours.value++;
      }
    }
  }, 1000);
  }
}
function stopRecording() {
  clearInterval(audioStopWatch.value);
  isRecording.value = false;
  seconds.value = 0;
  minutes.value = 0;
  hours.value = 0;
  recorder.value.stopRecording();
}
function checkObserverView(entries: any, observer: any) {
  entries.forEach(async ({ target, isIntersecting }: any) => {
    if (isIntersecting) {
      selectedMessageId.value = conversation.value[0].messageId;
      await getConversation(true);
      selectedMessageId.value = 0;
    }
  });
}

function observerElementSelector() {
  observer.value.observe(chatItems.value[0].$el);
}

function setSelectedMedia(media: any) {
  selectedMedia.value = media;
  showChatMediaBtn.value.click();
}

function routeBack() {
  if (authStore.getUser.role === "Subscriber") {
    router.replace("/services");
  } else {
    router.replace("/chat");
  }
}

async function getUser() {
  try {
    const res = await repositories.getUserById.setParams({
      id: route.params.username,
    });
    userData.value = res.data;
  } catch (e) {
    console.log(e);
  }
}

function scrollBottom() {
  let lastItem: any = document.getElementById(
    `bubble${conversation.value.length - 1}`
  );
  lastItem?.scrollIntoView();
}

async function deliverMessage() {
  try {
    const res = await repositories.deliverMessage.setTag();
  } catch (e) {
    console.log(e);
  }
}

async function getConversation(loadingHistory: boolean) {
  try {
    const res = await repositories.getConversation.setParams({
      userId: route.params.username,
      messageId: selectedMessageId.value,
      count: 20,
    });
    res.data.forEach((item: any) => {
      const idx = conversation.value.findIndex(
        (e: { messageId: any }) => e.messageId === item.messageId
      );
      if (idx > -1) {
        conversation.value[idx] = item;
      } else {
        conversation?.value?.push(item);
      }
    });

    conversation.value.sort(function (a: any, b: any) {
      const key1 = a.createDate;
      const key2 = b.createDate;

      if (key1 < key2) {
        return -1;
      } else if (key1 === key2) {
        return 0;
      } else {
        return 1;
      }
    });
  } catch (e) {
    console.log(e);
  }
  if (loadingHistory) {
    return;
  } else {
    setTimeout(() => {
      scrollBottom();
    }, 100);
  }
}

async function readMessage() {
  try {
    const res = await repositories.readMessage.setParams({
      userId: route.params.username,
    });
  } catch (e) {
    console.log(e);
  } finally {
  }
}

async function sendMessage() {
  if (
    newMessage.messageBody ||
    convertedMedia.base64 ||
    voiceMedia.value !== ""
  ) {
    if (convertedMedia.base64 !== "") {
      newMessage.fileData = {
        base64: convertedMedia.base64,
        priority: 1,
      };
    }
    try {
      const res = await repositories.sendMessage.setPayload(newMessage);
      newMessage.messageBody = "";
      newMessage.fileData = null;
      voiceMedia.value = "";
      convertedMedia.base64 = "";
      convertedMedia.pictureUrl = "";
    } catch (e) {
      console.log(e);
    } finally {
    }
  }
}

async function handleFileUpload() {
  if(mediaInput.value.files[0].size<2000000){
  let media = await helper.fileToBase64(mediaInput.value.files[0]);
  convertedMedia.base64 = media.base64;
  convertedMedia.pictureUrl = media.pictureUrl;
  }else{
    toast.error({content:'اندازه فایل نمیتواند بیشتر از 2 مگابایت باشد'})
  }
}
</script>

<style>
.blob {
  background: #ff5252b2;
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
  margin: 10px;
  height: 20px;
  width: 20px;
  transform: scale(1);
  animation: pulse-red 2s infinite;
}

@keyframes pulse-red {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(255, 82, 82, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
  }
}
</style>
