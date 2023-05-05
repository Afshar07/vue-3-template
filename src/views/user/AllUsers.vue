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
      <div class="col-span-12 md:col-span-6 mb-5 flex justify-start md:justify-end items-center">
        <span class="text-md ml-1"> تعداد در هر صفحه :</span>
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
         :items="user.users"
         :fields="userFields"
         emptyText="Nothing Found"
         >
           <template #userId="data">
             <span >{{ data.items.userId }}</span>
           </template>
           <template #actions="data">
             <div class="flex justify-center items-center">
              <TrashIcon class="fill-red-500 cursor-pointer"></TrashIcon>
              <EditIcon class="dark:fill-white fill-sky-500 cursor-pointer"></EditIcon>
             </div>
           </template>
         </Table>
        </div>
      </div>
      <div v-if="totalPages.value?.length > 1"  class="col-span-12 flex flex-row justify-center items-center">
        <Pagination :activePage="selectedPageId" :totalPages="totalPages.value" @PageChanged="changePage($event)"></Pagination>
      </div>
    </div>
  </div>
</template>

<script setup>
import SideBar from "@/components/main/sideBar.vue";
import Header from "@/components/main/Header.vue";
import {inject, onMounted, reactive, ref ,watch} from "vue";
import {useAppStore} from "@/stores/app";
import Pagination from "../../components/utilities/Pagination.vue";
import Table from "@/components/utilities/Table.vue";
import TrashIcon from "@/components/icons/TrashIcon.vue";
import EditIcon from "@/components/icons/EditIcon.vue";
import VInput from "@/components/utilities/VInput.vue";
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
    key:'actions',
    label: 'عملیات'
  },
])
let selectedPageId = ref(1)
let totalPages = reactive([])

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
</script>

<style scoped>

</style>
