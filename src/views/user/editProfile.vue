<template>
  <div class=" min-h-full w-full   grid grid-cols-12">
    <div class="md:col-span-2 col-span-12">
      <side-bar></side-bar>
    </div>
    <div class="md:col-span-10  p-5 col-span-12 z-[1]">
      <Header></Header>
      <div v-if="userInfo" class="bg-white dark:bg-dark-muted rounded-xl shadow grid grid-cols-12  gap-3 p-5 ">
        <div class="w-full col-span-12 mb-5">
          <input @input="handleImage" type="file" ref="fileInput" class="hidden">
          <div class="relative">
            <div @click="openFileHandler" class="p-1  bg-primary rounded-full absolute bottom-0 ">
              <PlusIcon class="fill-white cursor-pointer"></PlusIcon>
            </div>

            <img :src="computedProfileImage" class="rounded-full object-contain shadow-xl w-40 h-40" alt="">
          </div>
        </div>
        <div class="md:col-span-6 col-span-12 ">
          <small class="text-gray-500 dark:text-white">first Name</small>
          <VInput :dataType="`text`" v-model="userInfo.name" :placeHolder="`example@gmail.com`" class="my-1"></VInput>
        </div>
        <div class="md:col-span-6 col-span-12 ">
          <small class="text-gray-500 dark:text-white">last Name</small>
          <VInput :dataType="`text`" v-model="userInfo.familyName" :placeHolder="`example`" class="my-1"></VInput>
        </div>
        <div class="md:col-span-6 col-span-12 ">
          <small class="text-gray-500 dark:text-white">Email Address</small>
          <VInput :dataType="`text`" v-model="userInfo.email" :placeHolder="`example`" class="my-1"></VInput>
        </div>
        <div class="md:col-span-4 col-span-12 ">
          <small class="text-gray-500 dark:text-white">userName</small>
          <VInput :dataType="`text`" v-model="userInfo.userName" :placeHolder="`example`" class="my-1"></VInput>
        </div>

      </div>
<!--      <div v-if="userInfo" class="bg-white dark:bg-dark-muted rounded-xl shadow grid grid-cols-12  gap-3 p-5 my-3">-->
<!--        <div class="col-span-12 flex items-center gap-3 mb-3">-->
<!--          <KuCoinIcon></KuCoinIcon>-->
<!--          <strong class="text-xl text-black dark:text-white mt-1">KuCoin </strong>-->
<!--        </div>-->
<!--        <div class="md:col-span-6 col-span-12">-->
<!--          <small class="text-gray-500 dark:text-white">api Key</small>-->
<!--          <VInput :dataType="`text`" v-model="userInfo.kucoinApiKey" :placeHolder="`example`" class="my-1"></VInput>-->
<!--        </div>-->
<!--        <div class="md:col-span-6 col-span-12">-->
<!--          <small class="text-gray-500 dark:text-white">secret Key</small>-->
<!--          <VInput :dataType="`text`" v-model="userInfo.kucoinSecretKey" :placeHolder="`example`" class="my-1"></VInput>-->
<!--        </div>-->
<!--        <div class=" col-span-12">-->
<!--          <small class="text-gray-500 dark:text-white">Pass Phrase</small>-->
<!--          <VInput :dataType="`password`" v-model="userInfo.kucoinPassPhrase" :placeHolder="`example`"-->
<!--                  class="my-1"></VInput>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div v-if="userInfo" class="bg-white dark:bg-dark-muted rounded-xl shadow grid grid-cols-12  gap-3 p-5 my-3">-->
<!--        <div class="col-span-12 flex items-center gap-3 mb-3">-->
<!--          <CoinexIcon></CoinexIcon>-->
<!--          <strong class="text-xl text-black dark:text-white mt-1">Coinex </strong>-->
<!--        </div>-->
<!--        <div class="col-span-6">-->
<!--          <small class="text-gray-500 dark:text-white">Access Id</small>-->
<!--          <VInput :dataType="`text`" v-model="userInfo.coinexAccessId" :placeHolder="`example`" class="my-1"></VInput>-->
<!--        </div>-->
<!--        <div class="col-span-6">-->
<!--          <small class="text-gray-500 dark:text-white">secret Key</small>-->
<!--          <VInput :dataType="`text`" v-model="userInfo.coinexSecretKey" :placeHolder="`example`" class="my-1"></VInput>-->
<!--        </div>-->
<!--      </div>-->
      <button @click="updateUser" type="button" class="btn bg-primary my-3 text-white">submit</button>
    </div>
  </div>
</template>

<script setup>
import SideBar from "../../components/main/sideBar.vue";
import PlusIcon from "../../components/icons/PlusIcon.vue";
import VInput from "../../components/utilities/VInput.vue";
import {computed, inject, onMounted, reactive, ref} from "vue";
import Header from "../../components/main/Header.vue";
import KuCoinIcon from "../../components/icons/KuCoinIcon.vue";
import CoinexIcon from "../../components/icons/CoinexIcon.vue";
import {useAppStore} from "../../stores/app";
import {useToastStore} from "../../stores/toast";
import {SignErrors} from "../../models/signErrors";
import {useAuthStore} from "@/stores/auth";

const api = inject("repositories")
const appStore = useAppStore()
const toastStore = useToastStore()
const fileInput = ref(null)
const authStore = useAuthStore()
const helper = inject('helper')
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
      id:authStore.user.userId
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
  toastStore.showToast = true
  toastStore.toastData = {
    content: 'Information Has Been Updated',
    variant:'success',
  }

  // try {
  //   appStore.showOverlay = true
  //   userInfo.value.selfieFileData = base64Image.value
  //   const res = await api.updateUser.setPayload(userInfo.value)
  //   toastStore.showToast = true
  //   toastStore.toastData = {
  //     title: 'Succeed',
  //     content: 'Information Has Been Updated',
  //     icon: 'check'
  //   }
  //   await getUserById()
  // } catch (e) {
  //   console.log(e)
  // } finally {
  //   appStore.showOverlay = false
  //
  // }
}
</script>

<style scoped>

</style>
