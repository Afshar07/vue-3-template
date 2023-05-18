<template>
  <div class="w-full min-h-full h-full bg-white relative">
    <header
      class="h-14 shadow-md w-full flex items-center justify-between p-4 fixed top-0 right-0 bg-white !z-10"
    >
      <div v-if="userData" class="avatar-name-section flex items-center">
        <div class="avatar placeholder">
          <div class="w-10 h-10 rounded-full">
            <img
              v-if="userData.profileImage"
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
      <span @click="routeBack">
        <ChevronLeft class="w-5 h-5"></ChevronLeft>
      </span>
    </header>
    <main
      ref="chatContainer"
      class="h-full overflow-scroll space-y-2 mt-1 pt-14 pb-10 md:pb-14 bg-[url('/chatbg.svg')] px-2 bg-[#f2f0f7] bg-repeat bg-[length:210px_210px] md:bg-full bg-fixed"
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
      class="fixed w-full bottom-0 h-14 shadow border-t p-2 flex items-center bg-white"
    >
      <div class="w-full flex items-center justify-between">
        <div
          class="w-auto flex items-center justify-around md:justify-start gap-x-3 md:gap-x-5 mx-2 md:mx-4"
        >
          <!-- Send Button -->
          <button @click="sendMessage" type="button">
            <SendIcon></SendIcon>
          </button>
          <!-- Mic Button -->
          <button type="button">
            <MicIcon></MicIcon>
          </button>
          <input
            type="file"
            ref="mediaInput"
            accept="image/png,image/jpeg"
            class="hidden"
            @input="handleFileUpload"
          />
          <!-- Attachment Button -->
          <label for="chatMediaModal" type="button">
            <label for="showChatMediaModal" ref="showChatMediaBtn"></label>
            <AttachmentIcon></AttachmentIcon>
          </label>
        </div>

        <input
          @keydown.enter="sendMessage"
          v-model.trim="newMessage.messageBody"
          type="text"
          placeholder="متن پیام را وارد کنید"
          class="input input-bordered input-sm w-full bg-gray-200 text-gray-800"
        />
      </div>
    </footer>
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
onMounted(async () => {
  await Promise.all([getUser(), readMessage(), getConversation(false)]);
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
    getConversation(false);
  }
  chatStore.setDefaultSocketId();
});
watch(isMessageReaded, async (val) => {
  if (val) {
    await readMessage();
    chatStore.messageReaded(false);
  }
});
watch(isMessageDelivered, async (val) => {
  if (val) {
    await deliverMessage();
    chatStore.isMessageDelivered(false);
  }
});

function checkObserverView(entries: any, observer: any) {
  entries.forEach(async ({ target, isIntersecting }: any) => {
    if (isIntersecting) {
      selectedMessageId.value = conversation.value[0].messageId;
      await getConversation(true);
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
  if (newMessage.messageBody || convertedMedia.base64) {
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
    } catch (e) {
      console.log(e);
    } finally {
    }
  }
}

async function handleFileUpload() {
  let media = await helper.fileToBase64(mediaInput.value.files[0]);
  convertedMedia.base64 = media.base64;
  convertedMedia.pictureUrl = media.pictureUrl;
}
</script>
