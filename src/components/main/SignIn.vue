<template>
  <div class="col-span-12 md:col-span-5 xl:col-span-3 bg-dark-muted p-10 space-y-8 flex flex-col justify-center">

    <!--  Forgot pass Modal region  -->
    <input type="checkbox" id="optionsModal" ref="optionsModal" class="modal-toggle"/>
    <div class="modal">
      <label for="" style="direction: ltr!important;" class="modal-box bg-white dark:bg-dark-muted">
        <div class="w-full">
          <div>
            <label for="email-address" class=" text-black dark:text-white">Enter Your Account Email Address</label>
            <VInput v-model="loginData.mail" :dataType="'text'"
                    :error="emailNotValid"
                    :errorMessage="'Email is not valid'"
                    :placeHolder="'example@example.com'"></VInput>
          </div>
        </div>
        <div class="modal-action !justify-start">
          <label @click="forgetPassword" for="optionsModal" class="btn bg-green-500 text-white">send</label>
          <label  for="optionsModal" class="btn bg-gray-400 text-white">close</label>
        </div>
      </label>
    </div>
    <!--  Forgot pass Modal region End -->

    <h1 class="text-white text-[2rem] sm:text-[3rem] mb-3">
      Welcome to {{ appName }} 👋
    </h1>
    <form class="mt-8 space-y-6" action="/" @submit.prevent method="POST">
      <input type="hidden" name="remember" value="true">
      <div class="space-y-4 rounded-md shadow-sm">
        <div>
          <VInput v-model="loginData.mail" :dataType="'text'"
                  :error="emailNotValid"
                  :errorMessage="'Email Not Valid'"
                  :placeHolder="'Email'"></VInput>
        </div>
        <div>
          <VInput v-model="loginData.password"  :placeHolder="'Password'" :dataType="'password'"></VInput>
        </div>
      </div>
<!--      <div class="flex items-center justify-center">-->
<!--        <div class="text-sm">-->
<!--          <span class=" text-center dark:text-white text-xs  font-bold tracking-tight cursor-pointer ">New To Trader ?</span>-->
<!--          <span @click="changeActiveComponent" class=" text-center dark:text-white  text-xs font-bold tracking-tight cursor-pointer !text-primary">Register</span>-->
<!--        </div>-->
<!--      </div>-->
      <div class="flex items-center justify-center">
        <div class="text-sm">
          <span class=" text-center dark:text-white text-xs  font-bold tracking-tight cursor-pointer ">You have lost your password ?</span>

          <label for="optionsModal"
                 class="font-medium cursor-pointer text-xs text-indigo-600 dark:text-white transition-all  hover:!text-primary">
            Forget Password
          </label>
        </div>
      </div>

      <div>
        <button @click="login" type="submit"
                class="group bg-violet relative flex w-full justify-center rounded-md  py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <LockIcon v-if="emailNotValid !==false" class="fill-white"></LockIcon>
          </span>
          Login
        </button>
      </div>
    </form>
  </div>

</template>

<script setup lang="ts">
import type {signDto} from "@/models/signModel";
import {computed, defineEmits, inject, onMounted, reactive, ref} from "vue";
import LockIcon from "@/components/icons/LockIcon.vue";
import VInput from "@/components/utilities/VInput.vue";
import {useAppStore} from "@/stores/app";
import {useToastStore} from "@/stores/toast";
import {useAuthStore} from "@/stores/auth";
import {useRouter} from "vue-router";
import errorHandler from "@/plugins/errorHandler";

const appStore = useAppStore()
const toastStore = useToastStore()
const authStore:any = useAuthStore()
const router = useRouter()
const api: any = inject('repositories')

const helper:any = inject('helper')
const appName = helper.appName

let loginData = reactive<signDto>({
  mobile: '',
  mail: "",
  firstName: "",
  lastName: "",
  password: '',
  verifyCode: '',
  encryptedMail: "string",
  type: 2,
  userName: ''
})
const emailNotValid: any = computed(() => {
  let resolve = null
  if (loginData.mail === '') {
    resolve = null
  } else if (loginData.mail.includes('@')) {
    resolve = false
  } else if (!loginData.mail.includes('@')) {
    resolve = true
  }
  return resolve
})

async function forgetPassword() {
  if (emailNotValid.value === false) {
    try {
      appStore.showOverlay = true
      const res = await api.forgetPassword.setParams({
        type:2,
        PhoneOrEmail:loginData.mail
      })
      if(res.data.data.status===7){
      toastStore.showToast = true
      toastStore.toastData = {
        title: 'Succeed',
        content: 'Your Password Has Been Sent To Your Email',
        icon: 'check'
      }
      }else{
        errorHandler(res.data.data.status)
      }
      loginData.mail = ''
    } catch (e) {
      console.log(e)
    }finally {
      appStore.showOverlay = false

    }
  }else{
    toastStore.showToast = true
    toastStore.toastData = {
      title: 'Failed',
      content: 'Email is not valid',
      icon: 'Alert'
    }
  }
}

async function login() {
  if (emailNotValid.value === false) {
    try {
      appStore.showOverlay = true
      const res = await api.signIn.setPayload(loginData)
      if (res.data.data.data === "") {
        errorHandler(res.data.data.status)
      } else {
        console.log(res.data)
        authStore.setUser(res.data.data)
        await router.push('/dashBoard')
      }
    } catch (e) {
      console.log(e)
    } finally {
      appStore.showOverlay = false
    }
  } else {
    toastStore.showToast = true
    toastStore.toastData = {
      title: 'Failed',
      content: 'Email  is not valid',
      icon: 'Alert'
    }
  }
  appStore.showOverlay = false

}

const emits = defineEmits(['changeActiveSlug'])

function changeActiveComponent() {
  emits('changeActiveSlug', 'SignUp')
}
</script>

<style scoped>

</style>
