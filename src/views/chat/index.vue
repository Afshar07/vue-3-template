<template>
  <div class="main-card w-full">
    <header>
      <h1 class="dark:text-white">گفتگو های من</h1>
    </header>
    <main>
      <div class="col-span-12 md:col-span-6 mt-3">
        <VInput
            class="col-span-12"
            v-model="debouncedSearch"
            :dataType="'text'"
            :placeHolder="'جستجو...'"
        ></VInput>
      </div>
      <div class="stats stats-vertical !w-full shadow-md mt-3">
        <router-link v-for="(item,idx) in chats" :key="idx" :to="`/chat/${item['userId']}`">
          <ConversationCard :userItem="item" :avatar="false" :online="true"></ConversationCard>
        </router-link>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import ConversationCard from "@/components/utilities/chat/ConversationCard.vue";
import {computed, inject, onMounted, ref, watch} from "vue";
import {useAppStore} from "@/stores/app";
import VInput from "@/components/utilities/VInput.vue";
import {useChatStore} from "@/stores/chat";

const repositories: any = inject("repositories");
const appStore = useAppStore();
const chatStore: any = useChatStore();
onMounted(async () => {
  await Promise.all([
      deliverMessage(),
      getMenu()]);
});
let chats = ref(null)

async function getMenu() {
  try {
    appStore.showOverlay = true;
    const res = await repositories.getMenu.setParams({
      searchCommand: search.value,
    });
    chats.value = res.data
  } catch (e) {
    console.log(e);
  } finally {
    appStore.showOverlay = false;
  }
}

async function deliverMessage() {
  try {
    const res = await repositories.deliverMessage.setTag()

  } catch (e) {
    console.log(e)
  }
}

let search = ref<string>("");
let timeout = ref<any>(null);
watch(search, async (val) => {
  getMenu();
});

watch(chatStore.getSocketId, async (val) => {
  if (val) {
    await deliverMessage();
    await getMenu()
    chatStore.setDefaultSocketId();
  }
},{immediate:true})
let debouncedSearch = computed({
  get() {
    return search.value;
  },
  // setter
  set(val: string) {
    if (timeout.value) {
      clearTimeout(timeout.value);
    }
    timeout.value = setTimeout(() => {
      search.value = val;
    }, 600);
  },
});
</script>

<style scoped></style>
