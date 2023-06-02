<template>
  <div class="main-card grid grid-cols-12">
    <div class="col-span-12 z-[1] grid grid-cols-12">
      <div class="col-span-12 mb-5">
        <h1 class="text-gray-800 dark:text-white font-extrabold text-2xl">لیست درخواست‌های خدمات</h1>
      </div>
      <!--      <div class="col-span-12 md:col-span-6 mb-5">-->
      <!--        <VInput class="col-span-12" v-model="searchCommand" :dataType="'text'"-->
      <!--                :placeHolder="'جستجو...'"></VInput>-->
      <!--      </div>-->
      <div class="col-span-12 md:col-span-4 mb-5 flex justify-start items-center">
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
      <div class="col-span-12 md:col-span-4 mb-5 flex justify-start items-center">
        <span class="text-md dark:text-white ml-1"> بر اساس وضعیت درخواست :</span>
        <v-select
            class="md:w-1/3 min-w-[8rem]"
            :options="statusItems"
            v-model="status"
            label="name"
            :reduce="(name) => name.value"
            :clearable="false">
        </v-select>
      </div>
      <div class="col-span-12 md:col-span-4 mb-5 flex justify-start items-center">
        <span class="text-md dark:text-white ml-1"> بر اساس نوع درخواست :</span>
        <v-select
            class="md:w-1/3 min-w-[8rem]"
            :options="typeItems"
            v-model="type"
            label="name"
            :reduce="(name) => name.value"
            :clearable="false">
        </v-select>
      </div>
      <div class="grid grid-cols-12 col-span-12 rounded-xl border border-gray-200 dark:border-gray-500 gap-3 mb-5">
        <div class="overflow-x-auto w-full rounded-xl col-span-12">
          <Table
              :items="requests"
              :fields="requestFields"
              emptyText="موردی یافت نشد"
              class="text-gray-700 dark:text-gray-300"
          >
            <template #createDate="data">
              <span>
              {{
                  new Date(data.items.createDate).toLocaleTimeString('fa-IR', {
                    hour: "2-digit",
                    minute: "2-digit"
                  })
                }}
              -
              {{ createJalaliDate(data.items.createDate.slice(0, 10)) }}
              </span>
            </template>
            <template #type="data">
              <span v-if="data.items.type === 1" class="">اظهارنامه</span>
              <span v-if="data.items.type === 2" class="">اظهارنامه ارزش افزوده</span>
              <span v-if="data.items.type === 3" class="">درخواست وکالت</span>
              <span v-if="data.items.type === 4" class="">درخواست VIP</span>
            </template>
            <template #status="data">
              <span v-if="data.items.status === 1" class="">در انتظار پاسخ</span>
              <span v-if="data.items.status === 2" class="">درحال بررسی</span>
              <span v-if="data.items.status === 3" class="text-green-500">انجام شده</span>
            </template>
            <template #actions="data">
              <div class="flex justify-center items-center">
                <label @click="selectedToDelete = data.items.utilityId" for="deleteRequest">
                  <i title="حذف" class="ri-delete-bin-line text-xl text-red-500 cursor-pointer"></i>
                </label>
                <label @click="selectedToChangeStatus = data.items.utilityId ; statusToChange = data.items.status"
                       for="showRequest">
                  <i title="ویرایش وضعیت"
                     class="ri-settings-3-line dark:text-white text-orange-400 cursor-pointer text-xl mr-2"></i>
                </label>
                <label @click="newReport.shopId = data.items.shopId ; newReport.userId = data.items.userId"
                       for="setReport">
                  <i title="ثبت گزارش"
                     class="ri-file-list-3-line dark:text-white text-sky-500 cursor-pointer text-xl mr-2"></i>
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

    <!--  Delete Modal  -->
    <Modal :id="'deleteRequest'" @ok="deleteUtility" :closeModalTitle="'بستن'" :okModalTitle="'حذف'" :has-body="false"
           :title="'آیا از انجام این عملیات اطمینان دارید؟'"></Modal>

    <!--  Show Modal  -->
    <Modal :id="'showRequest'" @ok="changeUtilityStatus" :closeModalTitle="'بستن'" :okModalTitle="'ارسال'"
           :title="'ویرایش وضعیت درخواست'">
      <template #modalBody>
        <div class="w-full grid grid-cols-2 p-3">
          <div class="col-span-2">
            <label for="" class="text-gray-800 "> : وضعیت</label>
            <v-select
                class="w-full mt-2"
                :options="statusItems"
                v-model="statusToChange"
                label="name"
                :reduce="(name) => name.value"
                :clearable="false">
            </v-select>
          </div>
        </div>
      </template>
    </Modal>

    <!--  Set Report Modal  -->
    <Modal :id="'setReport'" @ok="createReport" :closeModalTitle="'بستن'" :okModalTitle="'ارسال'"
           :title="'ثبت گزارش'">
      <template #modalBody>
        <div class="space-y-3 px-2">
          <div class="col-span-2">
            <label for="" class="text-gray-800 mb-1"> : عنوان گزارش</label>
            <VInput
                v-model="newReport.title"
                class="w-full"
                :dataType="'text'"
                :placeHolder="'عنوان گزارش'"
            ></VInput>
          </div>
          <div class="col-span-2">
            <label for="" class="text-gray-800 mb-1"> : نوع گزارش</label>
            <v-select
                class="w-full mt-2"
                :options="reportTypesItems"
                v-model="newReport.type"
                label="name"
                :reduce="(name) => name.value"
                :clearable="false">
            </v-select>
          </div>
          <div class="col-span-2">
            <label for="" class="text-gray-800 mb-1"> : توضیحات</label>
            <textarea placeholder="توضیحات"
                      class="w-full bg-white border-gray-300 text-right border rounded-xl dark:text-gray-900 p-2"
                      v-model="newReport.description"></textarea>
          </div>
<!--          <div class="col-span-2">-->
<!--            <label for="" class="text-gray-800 mb-1"> : پیوست فایل</label>-->
<!--            <input type="file" v-model="newReport.file.base64" class="w-full"/>-->
<!--          </div>-->
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import SideBar from "@/components/main/sideBar.vue";
import Header from "@/components/main/Header.vue";
import {inject, onMounted, reactive, ref, watch} from "vue";
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
let requests = reactive([])
let pageCountItems = reactive([
  {name: '10', value: 10}, {name: '20', value: 20}, {name: '30', value: 30}, {name: '40', value: 40}, {
    name: '50',
    value: 50
  }
])
let statusItems = reactive([
  {name: 'همه', value: null},
  {name: 'در انتظار پاسخ', value: 1},
  {name: 'در حال انجام', value: 2},
  {name: 'انجام شده', value: 3},
])
let typeItems = reactive([
  {name: 'همه', value: null},
  {name: 'اظهارنامه', value: 1},
  {name: 'اظهارنامه ارزش افزوده', value: 2},
  {name: 'درخواست وکالت', value: 3},
  {name: 'درخواست VIP', value: 4},
])
let reportTypesItems = reactive([
  {name: 'اعتراض', value: 1},
  {name: 'گزارش فصلی', value: 2},
  {name: 'ابلاغیه ها', value: 3},
  {name: 'اظهارنامه ارزش افزوده', value: 4},
  {name: 'اظهارنامه عملکرد', value: 5},
  {name: 'مدارک سامانه مالیاتی', value: 6},
  {name: 'پرداخت قبض', value: 7},
])
let toast = inject('toast')
let type = ref(null);
let status = ref(null);
let selectedToChangeStatus = ref(null);
let selectedToDelete = ref(null);
let statusToChange = ref(null);
let pageCount = ref(10);
let requestFields = ref([
  {
    key: 'utilityId',
    label: 'شناسه درخواست'
  },
  {
    key: 'type',
    label: 'نوع درخواست'
  },
  {
    key: 'status',
    label: 'وضعیت درخواست'
  },
  {
    key: 'createDate',
    label: 'تاریخ ثبت'
  },
  {
    key: 'description',
    label: 'توضیحات'
  },
  {
    key: 'actions',
    label: 'عملیات'
  },
])
let selectedPageId = ref(1)
let totalPages = reactive([]);
let newReport = reactive({
  reportId: 0,
  title: "",
  userId: 0,
  shopId: 0,
  description: "",
  type: 1,
  createDate: new Date(Date.now()),
  file: {
    base64: "",
    priority: 0
  },
  isDeleted: false
})

watch(pageCount, async () => {
  await getAllRequests()
}, {deep: true})

watch(status, async () => {
  await getAllRequests()
}, {deep: true})

watch(type, async () => {
  await getAllRequests()
}, {deep: true})

onMounted(() => {
  getAllRequests()
})

function changePage(id) {
  selectedPageId.value = id
  getAllRequests()
}

function createJalaliDate(param) {
  return new Date(param).toLocaleDateString("fa-IR",);
}

async function getAllRequests() {
  try {
    appStore.showOverlay = true
    const res = await api.getAllUtilityRequest.setParams({
      pageNumber: selectedPageId.value,
      count: pageCount.value,
      shopId: '',
      type: type.value,
      status: status.value
    })
    totalPages.value = []
    const result = Math.ceil(res.data.count / pageCount.value)
    for (let i = 1; i <= result; i++) {
      totalPages.value.push(i);
    }
    requests = res.data.utilities;
  } catch (e) {
    console.log(e)
  } finally {
    appStore.showOverlay = false
  }
}

async function deleteUtility() {
  try {
    appStore.showOverlay = true
    const res = await api.deleteUtilityRequest.setParams({
      id: selectedToDelete.value
    })
    toast.success({content: `درخواست مورد نظر حذف شد.`});
    selectedToDelete.value = null;
    getAllRequests();
  } catch (e) {
    console.log(e)
  } finally {
    appStore.showOverlay = false
  }
}

async function changeUtilityStatus() {
  try {
    appStore.showOverlay = true
    const res = await api.changeUtilityStatusRequest.setParams({
      utilityId: selectedToChangeStatus.value,
      status: statusToChange.value
    })
    toast.success({content: `ویرایش انجام شد.`});
    selectedToChangeStatus.value = null;
    statusToChange.value = null;
    getAllRequests();
  } catch (e) {
    console.log(e)
  } finally {
    appStore.showOverlay = false
  }
}

async function createReport() {
  try {
    appStore.showOverlay = true
    const res = await api.createReport.setPayload(newReport)
    toast.success({content: `ثبت گزارش انجام شد.`});
    newReport = {
      reportId: 0,
      title: "",
      userId: 0,
      shopId: 0,
      description: "",
      type: 1,
      createDate: new Date(Date.now()),
      file: {
        base64: "",
        priority: 0
      },
      isDeleted: false
    }
    getAllRequests();
  } catch (e) {
    console.log(e)
  } finally {
    appStore.showOverlay = false
  }
}
</script>

<style scoped>

</style>
