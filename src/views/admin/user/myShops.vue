<template>
  <div class="main-card grid grid-cols-12">
    <div class="col-span-12 z-[1] grid grid-cols-12">
      <div class="col-span-12 mb-5">
        <h1 class="text-gray-800 dark:text-white font-extrabold text-2xl">لیست فروشگاه های من</h1>
      </div>
      <div class="col-span-12 mb-5">
        <label for="createShop" class="btn bg-violet border-none text-white" type="button">ایجاد فروشگاه جدید</label>
      </div>
      <div class="col-span-12 md:col-span-6 mb-5">
        <VInput class="col-span-12" v-model="searchCommand" :dataType="'text'"
                :placeHolder="'جستجو...'"></VInput>
      </div>
      <div class="col-span-12 md:col-span-6 mb-5 flex justify-start md:justify-end items-center">
        <span class="text-md dark:text-white ml-1"> تعداد در هر صفحه :</span>
        <v-select
            class="md:w-1/3 min-w-[8rem]"
            :options="pageCountItems"
            v-model="pageCount"
            label="name"
            :reduce="(name) => name.value"
            :clearable="false">
        </v-select>
      </div>
      <div class="grid grid-cols-12 col-span-12 rounded-xl border border-gray-200 dark:border-gray-500 gap-3 mb-5">
        <div class="overflow-x-auto w-full rounded-xl col-span-12">
          <Table
              :items="shop.shops"
              :fields="fields"
              emptyText="Nothing Found"
          >
            <template #userId="data">
              <span>{{ data.items.userId }}</span>
            </template>
            <template #actions="data">
              <div class="flex justify-center items-center">

                <router-link :to="{ name: 'conversation', params: { username: data.items.userId } }">
                  <i title="ویرایش" class="ri-chat-1-line dark:text-white text-violet cursor-pointer text-xl"></i>
                </router-link>
              </div>
            </template>
          </Table>
        </div>
      </div>
      <div v-if="totalPages.value?.length > 1" class="col-span-12 flex flex-row justify-center items-center">
        <Pagination :activePage="selectedPageId" :totalPages="totalPages.value"
                    @PageChanged="changePage($event)"></Pagination>
      </div>
    </div>
    <!--  createShopModal  -->
    <Modal :id="'createShop'" @ok="create" :closeModalTitle="'بستن'" :okModalTitle="'ثبت'"
           title="ایجاد فروشگاه جدید">
      <template #modalBody>
        <div class="w-full dark:text-white grid grid-cols-1 p-3">
          <div class="flex my-1 flex-col">
            <small class="mb-1">نام فروشگاه</small>
            <VInput
                v-model="newShop.shopName"
                :dataType="'text'"
                :placeHolder="'کد ملی'"
            ></VInput>
          </div>
          <div class="flex my-1 flex-col">
            <small class="mb-1">نام فروشگاه</small>
            <VInput
                v-model="newShop.nationalId"
                :dataType="'text'"
                :placeHolder="'کد ملی'"
            ></VInput>
          </div>
          <div class="flex my-1 flex-col">
            <small class="mb-1">واحد مالیاتی</small>
            <VInput
                v-model="newShop.taxUnit"
                :dataType="'text'"
                :placeHolder="'واحد مالیاتی'"
            ></VInput>
          </div>
          <div class="flex my-1 flex-col">
            <small class="mb-1">شماره پرونده</small>
            <VInput
                v-model="newShop.fileNumber"
                :dataType="'text'"
                :placeHolder="'شماره پرونده'"
            ></VInput>
          </div>
          <div class="flex my-1 flex-col">
            <small class="mb-1">شماره ترمینال</small>
            <VInput
                v-model="newShop.terminalNumber"
                :dataType="'text'"
                :placeHolder="'شماره ترمینال'"
            ></VInput>
          </div>
          <div class="flex my-1 flex-col">
            <small for="">آدرس</small>
            <textarea class="border-gray-300 border rounded-xl" v-model="newShop.address"></textarea>
          </div>

        </div>
      </template>
    </Modal>

  </div>
</template>

<script setup lang="ts">
import {inject, onMounted, reactive, ref, watch} from "vue";
import {useAppStore} from "@/stores/app";
import Pagination from "../../../components/utilities/Pagination.vue";
import Table from "@/components/utilities/Table.vue";
import {shopEntity} from "@/models/shopModel";
import VInput from "@/components/utilities/VInput.vue";
import {useAuthStore} from "@/stores/auth";
import Modal from "@/components/utilities/Modal.vue";

let authStore: any = useAuthStore()
let appStore = useAppStore()
const helper = inject('helper')
let api = inject('repositories')
let shop = reactive({
  shops: null
})
let newShop = reactive<shopEntity>({
  userId: authStore.getUser.userId,
  nationalId: '',
  address: '',
  taxUnit: '',
  fileNumber: '',
  createDate: new Date(Date.now()),
  shopName: '',
  terminalNumber: '',
  companyStartDate: ''
})
let pageCountItems = reactive([
  {name: '10', value: 10}, {name: '20', value: 20}, {name: '30', value: 30}, {name: '40', value: 40}, {
    name: '50',
    value: 50
  }
])
let pageCount = ref(10);
let searchCommand = '';
let fields = ref([
  {
    key: 'shopId',
    label: 'شناسه'
  },
  {
    key: 'shopName',
    label: 'نام'
  },
  {
    key: 'taxUnit',
    label: 'واحد مالیاتی'
  },
  {
    key: 'createDate',
    label: 'تاریخ'
  },

  {
    key: 'actions',
    label: 'عملیات'
  },
])
let selectedPageId = ref(1)
let totalPages = reactive([])

watch(pageCount, async () => {
  await getShopsByUserId()
}, {deep: true})

onMounted(() => {
  getShopsByUserId()
})

async function create() {

}

function changePage(id) {
  selectedPageId.value = id
  getShopsByUserId()
}

async function getShopsByUserId() {
  try {
    appStore.showOverlay = true
    const res = await api.getShopsByUserId.setParams({
      pageNumber: selectedPageId.value,
      count: pageCount.value,
      searchCommand: searchCommand
    })
    totalPages.value = []
    const result = Math.ceil(res.data.count / pageCount.value)
    for (let i = 1; i <= result; i++) {
      totalPages.value.push(i);
    }
    shop.shops = res.data.shops
  } catch (e) {
    console.log(e)
  } finally {
    appStore.showOverlay = false
  }
}
</script>

<style scoped>

</style>
