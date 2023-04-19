<template>
  <div class=" min-h-full w-full grid grid-cols-12">
    <div class="md:col-span-2 col-span-12">
      <side-bar></side-bar>
    </div>
    <div class="md:col-span-10 p-5 col-span-12 z-[1]">
      <Header></Header>
      <div class="bg-white dark:bg-dark-muted rounded-xl shadow grid grid-cols-12  gap-3 p-5 ">
        <div class="overflow-x-auto w-full col-span-12">
         <Table
         :items="user.users"
         :fields="userFields"
         emptyText="Nothing Found"
         >
           <template #userId="data">
             <span >{{ data.items.userId }}</span>
           </template>
           <template #actions="data">
              <TrashIcon></TrashIcon>
           </template>
         </Table>
        </div>
        <div v-if="totalPages.length>1"  class="col-span-12 mt-3">
          <Pagination :activePage="selectedPageId" :totalPages="totalPages" @PageChanged="changePage($event)"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SideBar from "@/components/main/sideBar.vue";
import Header from "@/components/main/Header.vue";
import {inject, onMounted, reactive, ref} from "vue";
import {useAppStore} from "@/stores/app";
import Pagination from "../../components/utilities/Pagination.vue";
import Table from "@/components/utilities/Table.vue";
import TrashIcon from "@/components/icons/TrashIcon.vue";
let appStore = useAppStore()
const helper = inject('helper')
let api = inject('repositories')
let user = reactive({
  users:null
})
let userFields = ref([
  {
    key:'userId',
    label: 'user Id'
  },
  {
    key:'name',
    label: 'name'
  },
  {
    key:'familyName',
    label: 'family Name'
  },
  {
    key:'userName',
    label: 'username'
  },
  {
    key:'email',
    label: 'Email'
  },
  {
    key:'actions',
    label: 'operations'
  },
])
let selectedPageId = ref(1)
let totalPages = reactive([])
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
      count:10
    })
    totalPages.value = []
    const result = Math.ceil(res.data.usersCount / 10)
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
