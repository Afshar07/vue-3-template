<template>
  <div class="chat chat-start  " :class="{'!chat-end':props.message['creatorUserId']===authStore.getUser.userId}">
    <div class="chat-header">

      <time class="text-xs opacity-50">
        {{ helper.detailedParsedDate(props.message['createDate']) }}
      </time>
    </div>
    <div class="chat-bubble  "
         :class="{'!bg-primary !rounded-xl':props.message['creatorUserId']===authStore.getUser.userId}">
      <img @click="emitSelectedMedia(props.message['chatMedia'])" v-if="props.message['chatMedia']" class="w-full h-40" :src="helper.baseUrl+ 'media/gallery/ChatMedia/'+props.message['chatMedia']" alt="">
      {{ message['messageBody'] }}
    </div>
    <div v-if="props.message['creatorUserId']===authStore.getUser.userId" class="chat-footer  opacity-50">
      <i v-if="props.message.isDelivered" class="ri-check-fill relative left-2.5"></i>
      <i v-if="props.message.isRead" class="ri-check-fill "></i>

    </div>
  </div>

</template>
<script setup>
import {inject} from "vue";
import CheckIcon from "@/components/icons/CheckIcon.vue";
import {useAuthStore} from "@/stores/auth";
const emits = defineEmits(['emitSelectedMedia'])
const helper = inject("helper");
const authStore = useAuthStore()
function  emitSelectedMedia(media){
  emits('emitSelectedMedia',media)
}
const props = defineProps({
  chatDirection: {
    type: String,
    required: true,
    validator(value) {
      return ["start", "end"].includes(value);
    },
  },
  message: {
    type: Object,
  },
  chatMessage: {
    type: String,
  },
  isDelivered: {
    type: Boolean,
  },
  isRead: {
    type: Boolean,
  },
  createDate: {
    type: Date,
  },
});
</script>
