<template>
  <div class="main-card grid grid-cols-12">
    <div class="col-span-12 z-[1] grid grid-cols-12">
      <div class="col-span-12 mb-5">
        <h1 class="text-gray-800 dark:text-white font-extrabold text-2xl">لیست کاربران</h1>
      </div>
      <div class="col-span-12 md:col-span-6 mb-5">
        <VInput class="col-span-12" v-model="searchCommand" :dataType="'text'"
                 :placeHolder="'جستجو...'"></VInput>
      </div>
      <div class="col-span-12 md:col-span-5 mb-5 flex justify-start md:justify-start items-center px-3">
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
      <div class="col-span-12 md:col-span-1 mb-5 flex justify-start md:justify-end items-center">
        <label for="createUserModal" class="btn bg-primary border-none w-full text-white">+ افزودن کاربر</label>
      </div>
      <div class="grid grid-cols-12 col-span-12 rounded-xl border border-gray-200 dark:border-gray-500 gap-3 mb-5">
        <div class="overflow-x-auto w-full rounded-xl col-span-12">
         <Table
         :items="user.users"
         :fields="userFields"
         emptyText="موردی یافت نشد"
         >
           <template #userId="data">
             <span>{{ data.items.userId }}</span>
           </template>
           <template #shops="data">
             <span v-if="data.items.shops.length > 0">{{ data.items.shops[0].shopName }}</span>
             <label v-else for="createShopModal" @click="newShop.userId = data.items.userId" class="btn bg-primary border-none text-white">ایجاد فروشگاه</label>
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
      <div v-if="totalPages.value?.length > 1"  class="col-span-12 flex flex-row justify-center items-center">
        <Pagination :activePage="selectedPageId" :totalPages="totalPages.value" @PageChanged="changePage($event)"></Pagination>
      </div>
    </div>

  <!--  Create User Modal  -->
    <Modal
        :id="'createUserModal'"
        @ok="createUser"
        :closeModalTitle="'بستن'"
        :okModalTitle="'ارسال'"
        :title="'افزودن کابر'"
    >
      <template #modalBody>
        <div class="w-full p-3">
          <div class="space-y-3">
            <VInput
                v-model="newUser.name"
                class="w-full"
                :dataType="'text'"
                :placeHolder="'نام'"
            ></VInput>
            <VInput
                v-model="newUser.familyName"
                class="w-full"
                :dataType="'text'"
                :placeHolder="'نام خانوادگی'"
            ></VInput>
            <VInput
                v-model="newUser.userName"
                class="w-full"
                :dataType="'text'"
                :placeHolder="'نام کاربری'"
            ></VInput>
            <VInput
                v-model="newUser.mobile"
                class="w-full"
                :dataType="'text'"
                :placeHolder="'موبایل'"
            ></VInput>
            <VInput
                v-model="newUser.email"
                class="w-full"
                :dataType="'text'"
                :placeHolder="'ایمیل'"
            ></VInput>
            <VInput
                v-model="newUser.password"
                class="w-full"
                :dataType="'text'"
                :placeHolder="'رمز عبور'"
            ></VInput>
          </div>
        </div>
      </template>
    </Modal>

    <!--  Create Shop Modal  -->
    <Modal
        :id="'createShopModal'"
        @ok="createShop"
        :closeModalTitle="'بستن'"
        :okModalTitle="'ارسال'"
        :title="'ایجاد فروشگاه'"
    >
      <template #modalBody>
        <div class="w-full p-3">
          <div class="space-y-3">
            <VInput
                v-model="newShop.shopName"
                class="w-full"
                :dataType="'text'"
                :placeHolder="'نام فروشگاه'"
            ></VInput>
            <VInput
                v-model="newShop.nationalId"
                class="w-full"
                :dataType="'text'"
                :placeHolder="'کد ملی'"
            ></VInput>
            <VInput
                v-model="newShop.taxUnit"
                class="w-full"
                :dataType="'text'"
                :placeHolder="'واحد مالیاتی'"
            ></VInput>
            <VInput
                v-model="newShop.fileNumber"
                class="w-full"
                :dataType="'text'"
                :placeHolder="'شماره پرونده'"
            ></VInput>
            <VInput
                v-model="newShop.terminalNumber"
                class="w-full"
                :dataType="'text'"
                :placeHolder="'شماره ترمینال'"
            ></VInput>
            <div class="flex my-1 flex-col">
              <small class="mb-1">: تاریخ تاسیس</small>
              <datePicker class="mt-3" v-model="newShop.companyStartDate" style="direction: rtl!important"></datePicker>
            </div>
            <div class="flex my-1 flex-col">
              <small class="mb-1">: آدرس</small>
              <textarea class="w-full bg-white border-gray-300 text-right border rounded-xl dark:text-gray-900" v-model="newShop.address"></textarea>
            </div>
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import SideBar from "@/components/main/sideBar.vue";
import Header from "@/components/main/Header.vue";
import {inject, onMounted, reactive, ref ,watch} from "vue";
import {useAppStore} from "@/stores/app";
import Pagination from "../../../components/utilities/Pagination.vue";
import Table from "@/components/utilities/Table.vue";
import TrashIcon from "@/components/icons/TrashIcon.vue";
import EditIcon from "@/components/icons/EditIcon.vue";
import VInput from "@/components/utilities/VInput.vue";
import Modal from "@/components/utilities/Modal.vue";
let appStore = useAppStore()
const helper = inject('helper')
let api = inject('repositories')
let user = reactive({
  users:null
})
let pageCountItems = reactive([
  {name: '10', value: 10} , {name: '20', value: 20} , {name: '30', value: 30} , {name: '40', value: 40} , {name: '50', value: 50}
])
let pageCount = ref(10);
let searchCommand = '';
let userFields = ref([
  {
    key:'userId',
    label: 'شناسه کاربر'
  },
  {
    key:'name',
    label: 'نام'
  },
  {
    key:'familyName',
    label: 'نام خانوادگی'
  },
  {
    key:'userName',
    label: 'نام کاربری'
  },
  {
    key:'mobile',
    label: 'موبایل'
  },
  {
    key:'email',
    label: 'ایمیل'
  },
  {
    key:'shops',
    label: 'فروشگاه'
  },
  {
    key:'actions',
    label: 'عملیات'
  },
])
let selectedPageId = ref(1);
let totalPages = reactive([]);
let newUser = ref({
  userId: 0,
  name: "",
  familyName: "",
  email: "",
  mobile: "",
  type: 1,
  status: 1,
  password: "",
  userName: "",
  createDate: new Date(Date.now()),
  updateDate: new Date(Date.now()),
  role: "",
  profileImage: null,
  currentPassword: "",
  shops:[],
  isDeleted: false
})
let newShop = ref({
  shopId: 0,
  userId: null,
  nationalId: "",
  address: "",
  taxUnit: "",
  fileNumber: "",
  createDate: new Date(Date.now()),
  shopName: "",
  terminalNumber: "",
  companyStartDate: "",
  isDeleted: false
})

watch(pageCount, async () => {
  await getAllUsers()
}, {deep: true})

onMounted(()=>{
  getAllUsers()
})
function changePage(id){
  selectedPageId.value = id
  getAllUsers()
}
async function getAllUsers(){
  try {
    appStore.showOverlay = true
    const res = await api.getAllUsers.setParams({
      pageNumber:selectedPageId.value,
      count:pageCount.value,
      searchCommand:searchCommand
    })
    totalPages.value = []
    const result = Math.ceil(res.data.usersCount / pageCount.value)
    for (let i = 1; i <= result; i++) {
      totalPages.value.push(i);
    }
    user.users = res.data.users
  }catch (e) {
    console.log(e)
  }finally {
    appStore.showOverlay = false
  }
}
async function createUser(){
  try {
    appStore.showOverlay = true
    const res = await api.createUser.setPayload(newUser.value);
    await getAllUsers()
  }catch (e) {
    console.log(e)
  }finally {
    appStore.showOverlay = false
  }
}
async function createShop(){
  try {
    appStore.showOverlay = true
    const res = await api.createShop.setPayload(newShop.value);
    await getAllUsers();
    newShop = {
      shopId: 0,
      userId: null,
      nationalId: "",
      address: "",
      taxUnit: "",
      fileNumber: "",
      createDate: new Date(Date.now()),
      shopName: "",
      terminalNumber: "",
      companyStartDate: "",
      isDeleted: false
    }
  }catch (e) {
    console.log(e)
  }finally {
    appStore.showOverlay = false
  }
}
</script>

<style scoped>

</style>
