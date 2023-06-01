<template>
  <div class="md:main-card  grid gap-2 grid-cols-12">
    <utility-card v-for="(item,idx) in utilityCardsData.data" :key="idx" :data="item"
                  @setUtilityData="getUtilityData"></utility-card>
    <!--create utility request modal -->
    <Modal :id="'statement'" @ok="submitStatementForm" :closeModalTitle="'بستن'" :okModalTitle="'ارسال'"
           :title="selectedUtility?.title">
      <template #modalBody>
        <div class="w-full dark:text-white grid grid-cols-1 p-3">
          <div class="mb-2">
            <small for="">انتخاب فروشگاه</small>
            <v-select
                v-if="shop.shops"
                :options="shop.shops"
                v-model="utilityRequest.shopId"
                label="shopName"
                :reduce="(shopName) => shopName.shopId"
                :clearable="false">
            </v-select>
          </div>
          <div class="flex mt-3 flex-col">
            <small for="">توضیحات</small>
            <textarea class="border-gray-300 border rounded-xl" v-model="utilityRequest.description"></textarea>
          </div>
        </div>
      </template>
    </Modal>
  </div>

</template>

<script setup lang="ts">
import {inject, onMounted, reactive, ref} from "vue";
import Modal from "@/components/utilities/Modal.vue";
import {utilityRequest} from "@/models/utilityRequest";
import UtilityCard from "@/components/main/utilityCard.vue";
import {useAppStore} from "@/stores/app";
import {useAuthStore} from "@/stores/auth";

let toast: any = inject('toast')
let appStore = useAppStore()
let authStore: any = useAuthStore()
const helper: any = inject('helper')
let api: any = inject('repositories')
let utilityRequest = reactive<utilityRequest>({
  userId: authStore.getUser.userId,
  shopId: null,
  createDate: new Date(Date.now()),
  type: null,
  description: '',
})
let utilityCardsData = reactive({
  data: [
    {
      title: 'درخواست اظهارنامه',
      icon: 'PaperIcon',
      type: 1,
      openModal: 'statement',
      bgColor: 'bg-[#f97316]'
    },
    {
      title: 'درخواست اظهارنامه ارزش افزوده',
      icon: 'CoinIcon',
      type: 2,
      openModal: 'statement',
      bgColor: 'bg-[#8b5cf6]'
    },
    {
      title: 'درخواست وکیل',
      icon: 'CaseIcon',
      type: 3,
      openModal: 'statement',
      bgColor: 'bg-[#ec4899]'
    },
  ]
})
let selectedUtility = ref<any>(null)
let shop = reactive({
  shops: null
})

onMounted(() => {
  getUserShops()
})


async function getUserShops() {
  try {
    appStore.showOverlay = true
    const res = await api.getShopsByUserId.setParams({
      pageNumber: 0,
      count: 0,
      searchCommand: ''
    })
    shop.shops = res.data.shops
  } catch (e) {
    console.log(e)
  } finally {
    appStore.showOverlay = false
  }
}

function getUtilityData(data: Object): void {
  selectedUtility.value = data

}

async function submitStatementForm(): Promise<any> {
  if (!utilityRequest.shopId) {
    toast.error({content: 'لطفا فروشگاه خود را انتخاب کنید'})
  } else if (!utilityRequest.description) {
    toast.error({content: 'لطفا توضیحات درخواست خود را وارد کنید'})
  } else {
    await createUtility()
  }
}

async function createUtility() {
  try {
    utilityRequest.type = selectedUtility.value.type
    appStore.showOverlay = true
    const res = await api.createUtilityRequest.setPayload(utilityRequest)
    if(res.data!==0){
      toast.success({content:'درخواست شما با موفقیت ارسال شد'})
      utilityRequest = {
        userId: authStore.getUser.userId,
        shopId: null,
        createDate: new Date(Date.now()),
        type: null,
        description: '',
      }
    }else{
      toast.error({content:'خطایی رخ داده است'})

    }
  } catch (e) {
    console.log(e)
  } finally {
    appStore.showOverlay = false
  }
}
</script>

<style scoped>

</style>