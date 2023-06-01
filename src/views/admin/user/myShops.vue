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
            <template #createDate="data">
              <span>{{ new Date(data.items.createDate).toLocaleDateString('fa-IR') }}</span>
            </template>
            <template #actions="data">
              <div class="flex justify-center items-center">
                <label @click="setSelectedShop(data.items)" for="deleteShop">
                  <i title="حذف" class="ri-delete-bin-line  text-red-500 cursor-pointer text-xl"></i>
                </label>
                <label @click="setSelectedShop(data.items)" for="editShop">
                  <i title="ویرایش" class="ri-edit-2-line  text-primary cursor-pointer text-xl"></i>
                </label>
                <label @click="setSelectedShop(data.items)" for="viewShop">
                  <i title="مشاهده" class="ri-eye-line  text-violet cursor-pointer text-xl"></i>
                </label>
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
    <Modal :id="'createShop'" @ok="validateShop(newShop,1)" :closeModalTitle="'بستن'" :okModalTitle="'ثبت'"
           title="ایجاد فروشگاه جدید">
      <template #modalBody>
        <div class="w-full dark:text-white grid grid-cols-1 p-3">
          <div class="flex my-1 flex-col">
            <small class="mb-1">کد ملی</small>
            <VInput
                :isRequired="true"

                v-model="newShop.nationalId"
                :dataType="'text'"
                :placeHolder="'کد ملی'"
            ></VInput>
          </div>
          <div class="flex my-1 flex-col">
            <small class="mb-1">نام فروشگاه</small>
            <VInput
                :isRequired="true"

                v-model="newShop.shopName"
                :dataType="'text'"
                :placeHolder="'نام فروشگاه'"
            ></VInput>
          </div>
          <div class="flex my-1 flex-col">
            <small class="mb-1">واحد مالیاتی</small>
            <VInput
                :isRequired="true"

                v-model="newShop.taxUnit"
                :dataType="'text'"
                :placeHolder="'واحد مالیاتی'"
            ></VInput>
          </div>
          <div class="flex my-1 flex-col">
            <small class="mb-1">شماره پرونده</small>
            <VInput
                :isRequired="true"

                v-model="newShop.fileNumber"
                :dataType="'text'"
                :placeHolder="'شماره پرونده'"
            ></VInput>
          </div>
          <div class="flex my-1 flex-col">
            <small class="mb-1">شماره ترمینال</small>
            <VInput
                :isRequired="true"
                v-model="newShop.terminalNumber"
                :dataType="'text'"
                :placeHolder="'شماره ترمینال'"
            ></VInput>
          </div>
          <div class="flex my-1 flex-col">
            <small class="mb-1">تاریخ تاسیس</small>
            <datePicker v-model="newShop.companyStartDate" style="direction: rtl!important"></datePicker>
          </div>
          <div class="flex my-1 flex-col">
            <small for="">آدرس</small>
            <textarea class="border-gray-300 text-right border rounded-xl dark:text-gray-900" v-model="newShop.address"></textarea>
          </div>

        </div>
      </template>
    </Modal>
    <!--  editShopModal  -->
    <Modal :id="'editShop'" @ok="validateShop(selectedShop,2)" :closeModalTitle="'بستن'" :okModalTitle="'بروزرسانی'"
           title="بروزرسانی فروشگاه">
      <template #modalBody>
        <div v-if="selectedShop" class="w-full dark:text-white grid grid-cols-1 p-3">
          <div class="flex my-1 flex-col">
            <small class="mb-1">کد ملی</small>
            <VInput
                :isRequired="true"

                v-model="selectedShop.nationalId"
                :dataType="'text'"
                :placeHolder="'کد ملی'"
            ></VInput>
          </div>
          <div class="flex my-1 flex-col">
            <small class="mb-1">نام فروشگاه</small>
            <VInput
                :isRequired="true"

                v-model="selectedShop.shopName"
                :dataType="'text'"
                :placeHolder="'نام فروشگاه'"
            ></VInput>
          </div>
          <div class="flex my-1 flex-col">
            <small class="mb-1">واحد مالیاتی</small>
            <VInput
                :isRequired="true"

                v-model="selectedShop.taxUnit"
                :dataType="'text'"
                :placeHolder="'واحد مالیاتی'"
            ></VInput>
          </div>
          <div class="flex my-1 flex-col">
            <small class="mb-1">شماره پرونده</small>
            <VInput
                :isRequired="true"

                v-model="selectedShop.fileNumber"
                :dataType="'text'"
                :placeHolder="'شماره پرونده'"
            ></VInput>
          </div>
          <div class="flex my-1 flex-col">
            <small class="mb-1">شماره ترمینال</small>
            <VInput
                :isRequired="true"
                v-model="selectedShop.terminalNumber"
                :dataType="'text'"
                :placeHolder="'شماره ترمینال'"
            ></VInput>
          </div>
          <div class="flex my-1 flex-col">
            <small class="mb-1">تاریخ تاسیس</small>
            <datePicker v-model="selectedShop.companyStartDate" style="direction: rtl!important"></datePicker>
          </div>
          <div class="flex my-1 flex-col">
            <small for="">آدرس</small>
            <textarea class="border-gray-300 text-right border rounded-xl dark:text-gray-900" v-model="selectedShop.address"></textarea>
          </div>

        </div>
      </template>
    </Modal>
    <!--  viewShopModal  -->
    <Modal :id="'viewShop'" :closeModalTitle="'بستن'"
           title="جزئیات فروشگاه">
      <template #modalBody>
        <div v-if="selectedShop" class="w-full dark:text-white grid grid-cols-1 p-3">
          <div class="flex my-1 items-center justify-between">
           <small>{{selectedShop.nationalId}}</small>
            <small class="mb-1 text-gray-400">کد ملی</small>
          </div>
          <div class="flex my-1 items-center justify-between">
            <small>{{selectedShop.shopName}}</small>
            <small class="mb-1 text-gray-400">نام فروشگاه</small>
          </div>
          <div class="flex my-1 items-center justify-between">
            <small>{{selectedShop.taxUnit}}</small>
            <small class="mb-1 text-gray-400">واحد مالیاتی</small>
          </div>
          <div class="flex my-1 items-center justify-between">
            <small>{{selectedShop.fileNumber}}</small>
            <small class="mb-1 text-gray-400">شماره پرونده</small>
          </div>
          <div class="flex my-1 items-center justify-between">
            <small>{{selectedShop.terminalNumber}}</small>
            <small class="mb-1 text-gray-400">شماره ترمینال</small>
          </div>

          <div class="flex my-1 items-center justify-between">
            <small class="mb-1 ">{{new Date(selectedShop.companyStartDate).toLocaleDateString('fa-IR')}}</small>
            <small class="mb-1 text-gray-400">تاریخ تاسیس</small>
          </div>
          <div class="flex my-1 flex-col">
            <small class="text-gray-400">آدرس</small>
            <p style="overflow-wrap: anywhere">{{selectedShop.address}}</p>
          </div>

        </div>
      </template>
    </Modal>
    <!--  deleteShopModal  -->
    <Modal
        :id="'deleteShop'"
        @ok="deleteShop"
        :closeModalTitle="'خیر'"
        :okModalTitle="'بله'"
        :has-body="false"
        :title="'آیا از حذف این فروشگاه اطمینان دارید ؟'"
    ></Modal>
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

let toast: any = inject('toast')
let authStore: any = useAuthStore()
let appStore = useAppStore()
const helper = inject('helper')
let api: any = inject('repositories')
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
let totalPages = reactive<any>([])
let selectedShop = ref<any>(null)
watch(pageCount, async () => {
  await getShopsByUserId()
}, {deep: true})

onMounted(() => {
  getShopsByUserId()
})

function setSelectedShop(shop: object) {
  selectedShop.value = shop
}

function validateShop(data: any, actionType: number) {
  if (data.shopName !== '' &&
      data.companyStartDate !== '' &&
      data.terminalNumber !== '' &&
      data.fileNumber !== '' &&
      data.taxUnit !== '' &&
      data.nationalId !== '') {
    if (actionType === 1) {
      create()
    } else if (actionType === 2) {
      update()
    }
  } else {
    toast.error({content: 'لطفا همه فیلد های اجباری را پر کنید'})
  }
}
async function deleteShop(){
  try {
    appStore.showOverlay = true
    const res = await api.deleteShop.setParams({
      id:selectedShop.value.shopId
    })
    if (res.data !== 0) {
      toast.success({content: 'فروشگاه با موفقیت حذف شد'})
      getShopsByUserId()
    }
  } catch (e) {
    console.log(e)
  } finally {
    appStore.showOverlay = false
  }
}
async function update() {
  try {
    appStore.showOverlay = true
    const res = await api.updateShop.setPayload(selectedShop.value)
    if (res.data !== 0) {
      toast.success({content: 'فروشگاه با موفقیت بروزرسانی شد'})
      getShopsByUserId()
    }
  } catch (e) {
    console.log(e)
  } finally {
    appStore.showOverlay = false
  }
}

async function create() {
  try {
    appStore.showOverlay = true
    const res = await api.createShop.setPayload(newShop)
    if (res.data !== 0) {
      toast.success({content: 'فروشگاه با موفقیت ساخته شد'})
      getShopsByUserId()
    }
  } catch (e) {
    console.log(e)
  } finally {
    appStore.showOverlay = false
  }
}

function changePage(id: number) {
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
