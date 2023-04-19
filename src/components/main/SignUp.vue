<template>
  <div class="w-full bg-slate-600 p-10 rounded-3xl max-w-md space-y-8">
    <div>
      <h2 class=" text-center dark:text-white  text-3xl font-bold tracking-tight text-gray-900">Register</h2>

    </div>
    <form class="mt-8 space-y-6" action="/" @submit.prevent method="POST">
      <input type="hidden" name="remember" value="true">
      <div class="space-y-4 grid grid-cols-2 gap-3 rounded-md shadow-sm">
        <div class="md:col-span-1 col-span-2 m-1">
          <VInput v-model="signUpData.firstName" :dataType="'text'"
                  :placeHolder="'Name'"></VInput>
        </div>
        <div class="md:col-span-1 col-span-2 !m-1 ">
          <VInput v-model="signUpData.lastName" :dataType="'text'"
                  :placeHolder="'Family Name'"></VInput>
        </div>
        <div class=" col-span-2 !m-1 ">
          <VInput v-model="signUpData.userName" :dataType="'text'"
                  :placeHolder="'Username'"></VInput>
        </div>
        <div class="col-span-2 !m-1">
          <VInput v-model="signUpData.mail" :dataType="'text'"
                  :error="emailNotValid"
                  :errorMessage="'Email Not Valid'"
                  :placeHolder="'Email'"></VInput>
        </div>
        <div class="col-span-2 !m-1">
          <VInput v-model="signUpData.password" :dataType="'password'" :placeHolder="'Password'"></VInput>
          <div class="flex flex-col justify-center gap-1 my-3">
            <small class="text-black dark:text-white text-xs">Contains At Least 8 Characters 1 Number And One Special
              Character </small>
          </div>
        </div>
        <div v-if="codeSent" class="col-span-2 !m-1">
          <VInput v-model="signUpData.verifyCode" :dataType="'text'" :placeHolder="'Confirmation Code'"></VInput>
        </div>
        <Counter v-if="codeSent" :Minute="1"></Counter>
      </div>
      <div>
        <button v-if="!codeSent" @click="sendCode" type="submit"
                class="group bg-primary relative flex w-full justify-center rounded-md  py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <LockIcon v-if="emailNotValid !==false" class="fill-white"></LockIcon>
          </span>
          Send Confirmation Code
        </button>
        <button v-if="codeSent" @click="signUp" type="submit"
                class="group bg-primary relative flex w-full justify-center rounded-md  py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          sign up
        </button>
      </div>
      <div class="flex items-center justify-center">
        <div class="text-sm">
          <span class=" text-center dark:text-white text-xs  font-bold tracking-tight cursor-pointer ">Already Have An Account? </span>
          <span @click="changeActiveComponent" class=" text-center dark:text-white  text-xs font-bold tracking-tight cursor-pointer !text-primary">Login</span>
        </div>

      </div>

    </form>
  </div>

</template>

<script setup lang="ts">
import {computed, defineEmits, inject, onMounted, reactive, ref} from "vue";
import LockIcon from "@/components/icons/LockIcon.vue";
import VInput from "@/components/utilities/VInput.vue";
import {useToastStore} from "@/stores/toast";
import {useAppStore} from "@/stores/app";
import Counter from "@/components/utilities/Counter.vue";
import {useAuthStore} from "@/stores/auth";
import {useRouter} from "vue-router";
import {signDto} from "@/models/signModel";
import errorHandler from "@/plugins/errorHandler";

const api: any = inject('repositories')
const emits = defineEmits(['changeActiveSlug'])
let toastStore = useToastStore()
let appStore = useAppStore()
let authStore = useAuthStore()
const router = useRouter()

function changeActiveComponent() {
  emits('changeActiveSlug', 'SignIn')
}

const codeSent = ref(false)
let signUpData = reactive<signDto>({

  mobile: '',
  mail: "",
  firstName: "",
  lastName: "",
  password: '',
  verifyCode: '',
  encryptedMail: "string",
  type: 2,
  userName:''
})
const emailNotValid: any = computed(() => {
  let resolve = null
  if (signUpData.mail === '') {
    resolve = null
  } else if (signUpData.mail.includes('@')) {
    resolve = false
  } else if (!signUpData.mail.includes('@')) {
    resolve = true
  }
  return resolve
})

async function sendCode() {
  authStore.setUser({title: 'kir'})
  if (emailNotValid.value === false) {
    try {
      appStore.showOverlay = true
      const res = await api.sendConfirmationCode.setParams({
        Email: signUpData.mail
      })
      if (res.data.data.hasUser === 0) {
        toastStore.showToast = true
        toastStore.toastData = {
          title: 'Succeed',
          content: res.data.data.message,
          icon: 'check'
        }
        codeSent.value = true
      } else {
        toastStore.showToast = true
        toastStore.toastData = {
          title: 'Failed',
          content: 'user Exist',
          icon: 'alert'
        }
      }
    } catch (e) {
      console.log(e)
    } finally {
      appStore.showOverlay = false

    }
  } else if (emailNotValid.value === null || emailNotValid.value === true) {
    toastStore.showToast = true
    toastStore.toastData = {
      title: 'Failed',
      content: 'Email Not Valid',
      icon: 'Alert'
    }
  }
}

async function signUp() {
  if (emailNotValid.value === false && signUpData.password !== '' && signUpData.verifyCode !== '' && signUpData.userName!=='') {
    try {
      appStore.showOverlay = true
      const res = await api.signUp.setPayload(signUpData)
        if (typeof res.data.data !== 'number') {
          authStore.setUser(res.data.data)
          await router.push('/dashBoard')
          toastStore.showToast = true
          toastStore.toastData = {
            title: 'Succeed',
            content: 'Account Created',
            icon: 'check'
          }
        }else{
          errorHandler(res.data.data)
        }
    } catch (e) {
      console.log(e)
    } finally {
      appStore.showOverlay = false
    }
  }else{
    toastStore.showToast = true
    toastStore.toastData = {
      title: 'Failed',
      content: 'Please Fill In the Required Fields ',
      icon: 'Alert'
    }
  }
}
</script>

<style scoped>

</style>