<template>
  <div class="chat  " :class="`chat-${props.chatDirection}`">
    <div class="chat-header">
      <time class="text-xs opacity-80">{{
        helper.detailedParsedDate(props.createDate)
      }}</time>
    </div>
    <div class="chat-bubble text-sm">{{ props.chatMessage }}</div>
    <div
      v-if="props.chatDirection != 'start'"
      class="chat-footer opacity-50 flex items-center relative mt-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-4 h-4"
        :class="props.isRead ? 'text-blue-700' : ''"
      >
        <path
          fill-rule="evenodd"
          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
          clip-rule="evenodd"
        />
      </svg>
      <svg
        v-if="props.isDelivered"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-4 h-4 absolute left-[0.3rem]"
        :class="props.isRead ? 'text-blue-700' : ''"
      >
        <path
          fill-rule="evenodd"
          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </div>
</template>
<script setup>
import { inject } from "vue";
const helper = inject("helper");
const props = defineProps({
  chatDirection: {
    type: String,
    required: true,
    validator(value) {
      return ["start", "end"].includes(value);
    },
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
