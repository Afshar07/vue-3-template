<template>
  <div
      class="w-full flex items-center dark:bg-dark border-none dark:text-white flex-row-reverse justify-between p-4 focus:bg-primary/30 transition-colors"
      tabindex="0"
  >
    <div class="stat-figure text-secondary">
      <div
          class="avatar placeholder relative"
      >
        <div v-if="props.userItem['unReadCount']!==0"
             class=" absolute bottom-8 left-10 w-5 h-5 rounded-full flex items-center justify-center bg-green-500 text-white border-none">
          <small class="mt-0.5">
            {{ props.userItem['unReadCount'] }}
          </small>
        </div>
        <div v-if="props.userItem['userPhoto']!==' '" class="w-14 rounded-full">
          <img
              :src="helper.baseUrl + 'media/gallery/profile/' +props.userItem['userPhoto'] "
          />
        </div>
        <div
            v-else
            class="bg-neutral-focus text-neutral-content rounded-full w-14"
        >
          <span class="text-3xl">{{ props.userItem['userName'].substring(0, 1) }}</span>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-start justify-between h-full">
      <p class="font-semibold">{{ props.userItem['userName'] }}</p>
      <p class="text-sm text-gray-700 dark:text-white w-[10rem] max-w-[10rem] truncate">
        {{
          props.userItem['subject']
        }}
      </p>
    </div>
    <!-- <div class="stat-title text-gray-900 mb-1">کاربر شماره یک</div>
    <div class="stat-desc text-gray-800">آخرین پیام گفتگو</div> -->
  </div>
</template>
<script setup>
import {inject} from "vue";

const helper = inject('helper')
const props = defineProps({
  userItem: {
    type: Object,
    required: false
  },
  avatar: {
    type: Boolean,
    default: true,
  },
  online: {
    type: Boolean,
    default: false,
  },
});
</script>
