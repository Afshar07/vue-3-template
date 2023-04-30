<template>
  <div class="main-card grid grid-cols-12">
    <!--    Create Crypto Account-->
    <input type="checkbox" id="createApiKey" ref="changeOrderStatus" class="modal-toggle"/>
    <div class="modal ">
      <label for="" style="direction: ltr!important;" class="modal-box bg-white dark:bg-dark-muted">
        <div class="w-full  ">
          <strong class="font-bold text-lg text-black dark:text-white ">Create New Api Key</strong>
          <div class="grid grid-cols-12 gap-3 mt-3">
            <div class="col-span-6 ">
              <VInput :dataType="`text`" v-model="cryptoAccount.name" :placeHolder="`name`" class="my-1"></VInput>
              <small class="text-black dark:text-white text-xs">This Field Is Required</small>

            </div>
            <div class="col-span-6 ">
              <v-select :options="exchanges" v-model="cryptoAccount.exchange" label="name"
                        :reduce="(name) => name.value"></v-select>
              <small class="text-black dark:text-white text-xs">This Field Is Required</small>

            </div>
            <div class="col-span-12 ">
              <VInput :dataType="`text`" v-model="cryptoAccount.apiKey" :placeHolder="`api Key`" class="my-1"></VInput>
              <small class="text-black dark:text-white text-xs">This Field Is Required</small>

            </div>
            <div class="col-span-12 ">
              <VInput :dataType="`text`" v-model="cryptoAccount.secretKey" :placeHolder="`secret Key`"
                      class="my-1"></VInput>
              <small class="text-black dark:text-white text-xs">This Field Is Required</small>

            </div>
            <div class=" col-span-12 ">
              <VInput :dataType="`text`" v-model="cryptoAccount.passPhrase" :placeHolder="`Pass Phrase`"
                      class="my-1"></VInput>
              <small v-if="cryptoAccount?.exchange===1" class="text-black dark:text-white text-xs">This Field Is
                Required</small>

            </div>
          </div>
        </div>
        <div class="modal-action !justify-start">
          <label for="createApiKey" class="btn bg-green-500 text-white" @click="createCryptoAccount">Create</label>
          <label for="createApiKey" class="btn bg-gray-400 text-white">close</label>
        </div>
      </label>
    </div>
    <!--    Update Crypto Account-->
    <input type="checkbox" id="updateApikey" ref="changeOrderStatus" class="modal-toggle"/>
    <div class="modal ">
      <label for="" style="direction: ltr!important;" class="modal-box bg-white dark:bg-dark-muted">
        <div class="w-full  ">
          <strong class="font-bold text-lg text-black dark:text-white ">Update Api Key</strong>
          <div v-if="selectedCryptoAccount" class="grid grid-cols-12 gap-3 mt-3">
            <div class="col-span-6 ">
              <VInput :dataType="`text`" v-model="selectedCryptoAccount.name" :placeHolder="`name`"
                      class="my-1"></VInput>
              <small class="text-black dark:text-white text-xs">This Field Is Required</small>

            </div>
            <div class="col-span-6 ">
              <v-select :options="exchanges" v-model="selectedCryptoAccount.exchange" label="name"
                        :reduce="(name) => name.value"></v-select>
              <small class="text-black dark:text-white text-xs">This Field Is Required</small>

            </div>
            <div class="col-span-12 ">
              <VInput :dataType="`text`" v-model="selectedCryptoAccount.apiKey" :placeHolder="`api Key`"
                      class="my-1"></VInput>
              <small class="text-black dark:text-white text-xs">This Field Is Required</small>

            </div>
            <div class="col-span-12 ">
              <VInput :dataType="`text`" v-model="selectedCryptoAccount.secretKey" :placeHolder="`secret Key`"
                      class="my-1"></VInput>
              <small class="text-black dark:text-white text-xs">This Field Is Required</small>

            </div>
            <div class=" col-span-12 ">
              <VInput :dataType="`text`" v-model="selectedCryptoAccount.passPhrase" :placeHolder="`Pass Phrase`"
                      class="my-1"></VInput>
              <small v-if="selectedCryptoAccount?.exchange===1" class="text-black dark:text-white text-xs">This Field Is
                Required</small>

            </div>
          </div>
        </div>
        <div class="modal-action !justify-start">
          <label for="updateApikey" class="btn bg-green-500 text-white" @click="updateCryptoAccount">Update</label>
          <label for="updateApikey" class="btn bg-gray-400 text-white">close</label>
        </div>
      </label>
    </div>
    <!--    Delete Crypto Account-->
    <input type="checkbox" id="deleteApiKey" ref="changeOrderStatus" class="modal-toggle"/>
    <div class="modal ">
      <label for="" style="direction: ltr!important;" class="modal-box bg-white dark:bg-dark-muted">
        <div class="w-full  ">
          <strong class="font-bold text-lg text-black dark:text-white ">Delete Api Key</strong>
          <div class="w-full  mt-3">
            <span class="text-black dark:text-white">Are You Sure You Want To Delete This Api Key ?</span>

          </div>
        </div>
        <div class="modal-action !justify-start">
          <label for="deleteApiKey" class="btn bg-green-500 text-white" @click="deleteCryptoAccount">yes</label>
          <label for="deleteApiKey" class="btn bg-gray-400 text-white">close</label>
        </div>
      </label>
    </div>
    <div class="col-span-12 z-[1]">
      <div class="overflow-x-auto w-full col-span-12">
        <div class="col-span-12 my-3">

        </div>
        <div class="col-span-12 grid grid-cols-12 flex items-end mb-4 gap-2">
          <label for="createApiKey" class="btn md:col-span-2 h-full col-span-6 btn-sm bg-primary border-none text-white">
            Create Api Key
          </label>
          <div class="md:col-span-2 col-span-12 md:my-0 my-3 flex flex-col justify-center">
            <small class="text-black dark:text-white">Exchange</small>
            <v-select :options="exchanges" v-model="filters.exchange" label="name"
                      :reduce="(name) => name.value"></v-select>
          </div>
        </div>
        <div class="bg-white dark:bg-dark-muted overflow-x-auto w-full rounded-xl shadow     p-5 ">
          <table class="table table-compact  w-full">
            <!-- head -->
            <thead>
            <tr>
              <th>#</th>
              <th>name</th>
              <th>apiKey</th>
              <th>secretKey</th>
              <th>passPhrase</th>
              <th>exchange</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,idx) in cryptoAccounts.myCryptoAccounts" :key="idx">
              <td>
                <span>{{ item['cryptoAccountId'] }}</span>
              </td>
              <td>
                <small>{{ item['name'] }}</small>
              </td>
              <td>
                <small class="line-clamp">{{
                    item['apiKey'].length > 10 ? item['apiKey'].substr(0, 10) + '...' : item['apiKey']
                  }}</small>
              </td>
              <td>
                <small class="line-clamp">{{
                    item['secretKey'].length > 10 ? item['secretKey'].substr(0, 10) + '...' : item['secretKey']
                  }}</small>
              </td>
              <td>
                <small class="line-clamp">{{
                    item['passPhrase'].length > 10 ? item['passPhrase'].substr(0, 10) + '...' : item['passPhrase']
                  }}</small>
              </td>
              <td>
                <CoinexIcon v-if="item['exchange'] === 2" class="w-5 h-5"></CoinexIcon>
                <KuCoinIcon v-if="item['exchange'] === 1" class="w-8 h-8"></KuCoinIcon>
              </td>
              <td>
                <div @click="selectedCryptoAccount = item" class="flex items-center gap-2">
                  <label for="deleteApiKey">
                    <TrashIcon class="fill-red-500 cursor-pointer w-5 h-5"></TrashIcon>
                  </label>
                  <label for="updateApikey">
                    <EditIcon class="fill-primary cursor-pointer w-5 h-5"></EditIcon>
                  </label>
                </div>
              </td>

            </tr>
            </tbody>
          </table>
        </div>
        <div v-if="totalPages.length>1" class="col-span-12 mt-3">
          <Pagination :activePage="selectedPageId" :totalPages="totalPages"
                      @PageChanged="changePage($event)"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SideBar from "../../components/main/sideBar.vue";
import Header from "@/components/main/Header.vue";
import VInput from "../../components/utilities/VInput.vue";
import {inject, onMounted, reactive, ref, watch} from "vue";
import {useAuthStore} from "@/stores/auth";
import {useAppStore} from "@/stores/app";
import {useToastStore} from "@/stores/toast";
import {SignErrors} from "@/models/signErrors";
import Pagination from "@/components/utilities/Pagination.vue";
import CoinexIcon from "@/components/icons/CoinexIcon.vue";
import KuCoinIcon from "@/components/icons/KuCoinIcon.vue";
import TrashIcon from "@/components/icons/TrashIcon.vue";
import EditIcon from "@/components/icons/EditIcon.vue";

const toastStore = useToastStore()
const authStore = useAuthStore()
const appStore = useAppStore()
const api = inject('repositories')
const exchanges = reactive([
  {
    name: 'KuCoin',
    value: 1
  },
  {
    name: 'Coinex',
    value: 2
  },
])
let cryptoAccount = reactive({
  name: '',
  apiKey: '',
  secretKey: '',
  passPhrase: '',
  createDate: new Date(Date.now()),
  exchange: null,
  userId: authStore.getUser.userId
})
let selectedCryptoAccount = ref(null)
const selectedPageId = ref(1)
let totalPages = ref([])
let cryptoAccounts = reactive({
  myCryptoAccounts: null
})
const filters = reactive({
  exchange: null
})
onMounted(() => {
  getCryptoAccounts()
})

function changePage(id) {
  selectedPageId.value = id
  getCryptoAccounts()
}

watch(filters, async () => {
  getCryptoAccounts()
}, {deep: true})

async function getCryptoAccounts() {
  try {
    appStore.showOverlay = true
    const res = await api.getCryptoAccountsByUserId.setParams({
      pageNumber: selectedPageId.value,
      count: 10,
      exchange: filters.exchange
    })
    totalPages.value = []
    const result = Math.ceil(res.data.accountsCount / 10)
    for (let i = 1; i <= result; i++) {
      totalPages.value.push(i);
    }
    cryptoAccounts.myCryptoAccounts = res.data.accounts
  } catch (e) {
    console.log(e)
  } finally {
    appStore.showOverlay = false
  }
}

async function createCryptoAccount() {
  if (cryptoAccount.name !== '' &&
      cryptoAccount.exchange !== 0 &&
      cryptoAccount.apiKey !== '' &&
      cryptoAccount.secretKey !== '' &&
      cryptoAccount.passPhrase !== ''
  ) {

    try {
      appStore.showOverlay = true
      const res = await api.createCryptoAccount.setPayload(cryptoAccount)
      cryptoAccount = {
        name: '',
        apiKey: '',
        secretKey: '',
        passPhrase: '',
        createDate: new Date(Date.now()),
        exchange: 0,
        userId: authStore.getUser.userId
      }
      getCryptoAccounts()
      toastStore.showToast = true
      toastStore.toastData = {
        title: 'Succeed',
        content: 'Crypto Account Created',
        icon: 'check'
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
      content: 'Please Fill In All The Fields',
      icon: 'alert'
    }
  }

}

async function updateCryptoAccount() {
  try {
    appStore.showOverlay = true
    const res = await api.updateCryptoAccount.setPayload(selectedCryptoAccount.value)
    selectedCryptoAccount.value = null
    getCryptoAccounts()
    toastStore.showToast = true
    toastStore.toastData = {
      title: 'Succeed',
      content: 'Crypto Account Updated',
      icon: 'check'
    }
  } catch (e) {
    console.log(e)
  } finally {
    appStore.showOverlay = false
  }
}

async function deleteCryptoAccount() {
  try {
    appStore.showOverlay = true
    const res = await api.deleteCryptoAccount.setParams({
      id: selectedCryptoAccount.value.cryptoAccountId
    })
    selectedCryptoAccount.value = null
    getCryptoAccounts()
    toastStore.showToast = true
    toastStore.toastData = {
      title: 'Succeed',
      content: 'Crypto Account Deleted',
      icon: 'check'
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
