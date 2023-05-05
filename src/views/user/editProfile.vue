<template>
  <div class="main-card w-full">
    <div v-if="userInfo" class="grid grid-cols-12 gap-3 p-5">
      <div class="w-full col-span-12 flex flex-row justify-center md:justify-start mb-5">
        <input @input="handleImage" type="file" ref="fileInput" class="hidden">
        <div class="relative">
          <div @click="openFileHandler" class="p-1  bg-primary rounded-full absolute bottom-0 ">
            <PlusIcon class="fill-white cursor-pointer"></PlusIcon>
          </div>
          <img :src="computedProfileImage" class="rounded-full object-contain shadow-xl w-40 h-40" alt="">
        </div>
      </div>
      <div class="md:col-span-4 col-span-12 ">
        <small class="text-gray-500 dark:text-white">نام</small>
        <VInput :dataType="`text`" v-model="userInfo.name" :placeHolder="`example@gmail.com`" class="my-1"></VInput>
      </div>
      <div class="md:col-span-4 col-span-12 ">
        <small class="text-gray-500 dark:text-white">نام خانوادگی</small>
        <VInput :dataType="`text`" v-model="userInfo.familyName" :placeHolder="`example`" class="my-1"></VInput>
      </div>
      <div class="md:col-span-4 col-span-12 ">
        <small class="text-gray-500 dark:text-white">ایمیل</small>
        <VInput :dataType="`text`" v-model="userInfo.email" :placeHolder="`example`" class="my-1"></VInput>
      </div>
      <div class="md:col-span-4 col-span-12 ">
        <small class="text-gray-500 dark:text-white">شناسه tax.gov</small>
        <VInput :dataType="`text`" v-model="userInfo.userName" :placeHolder="`example`" class="my-1"></VInput>
      </div>
      <div class="col-span-12 grid grid-cols-12">
        <div class="col-span-12 md:col-span-1">
          <button @click="updateUser" type="button" class="btn w-full border-none bg-primary my-3 text-white">ثبت</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PlusIcon from "../../components/icons/PlusIcon.vue";
import VInput from "../../components/utilities/VInput.vue";
import {computed, inject, onMounted, reactive, ref} from "vue";
import {useAppStore} from "@/stores/app";
import {SignErrors} from "@/models/signErrors";
import {useAuthStore} from "@/stores/auth";
import {useRoute} from "vue-router";
const toast = inject('toast');

const api = inject("repositories")
const appStore = useAppStore()
const fileInput = ref(null)
const authStore = useAuthStore()
const helper = inject('helper')
const route = useRoute();
const userId = route.params.id;
onMounted(() => {
  getUserById()
})

let computedProfileImage = computed(() => {
  if (userInfo?.value?.selfieFileData?.includes('blob')) {
    return userInfo?.value?.selfieFileData
  } else {
    return helper.baseUrl + userInfo?.value?.selfieFileData
  }
})

async function getUserById() {
  try {
    appStore.showOverlay = true
    const res = await api.getUserById.setParams({
      id: userId
    })
    userInfo.value = res.data
  } catch (e) {
    console.log(e)
  } finally {
    appStore.showOverlay = false
  }
}

let userInfo = ref(null)
let base64Image = ref('')

function openFileHandler() {
  fileInput.value.click()
}

async function handleImage() {
  userInfo.value.selfieFileData = URL.createObjectURL(fileInput.value.files[0])
  base64Image.value = await helper.fileToBase64(fileInput.value.files[0])
}

async function updateUser() {
  try {
    appStore.showOverlay = true
    userInfo.value.selfieFileData = base64Image.value
    const res = await api.updateUser.setPayload(userInfo.value)
    toast.success({content:'عملیات انجام شد'});
    await getUserById()
  } catch (e) {
    console.log(e)
  } finally {
    appStore.showOverlay = false
  }
}
</script>

<style scoped>

</style>
