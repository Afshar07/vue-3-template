<template>
  <div>
    <div class="md:main-card grid gap-y-7 gap-x-6 md:gap-4 grid-cols-12">
      <div
          class="col-span-12 p-3 bg-white flex flex-col items-start rounded-xl shadow"
      >
        <strong>خرید اشتراک VIP</strong>
        <small class="my-3 border-b pb-3"
        >با خرید اشتراک VIP از مزایای زیر بهره مند شوید</small
        >
        <p class="flex-wrap dark:text-white text-gray-500">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفادهلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده ازلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
          با استفاده از از
        </p>
      </div>
      <div
          v-for="(price, index) in priceList"
          :key="index"
          class="col-span-12 sm:col-span-6 xl:col-span-4 bg-white py-6 flex flex-col items-center px-3 rounded-md border-t-4 shadow h-full"
          :class="price.borderClass"
      >
        <div
            class="px-10 shadow-md py-2 rounded-full text-white gap-2"
            :class="price.badgeClass"
        >
          <strong>{{ price.title }}</strong>
        </div>
        <hr class="w-full my-6" />
        <ul class="list-disc text-sm">
          <li>لورم ایپسوم متن ساختگی با</li>
          <li>تولید سادگی نامفهوم از صنعت چاپ</li>
          <li>و با استفاده از طراحان گرافیک است</li>
          <li>چاپگرها و متون بلکه روزنامه و مجله</li>
        </ul>
        <hr class="w-full my-6" />
        <p class="mb-6 font-bold">
          {{ Intl.NumberFormat("en-US").format(+price.amount) }} تومان
        </p>
        <button
            class="btn bg-green-600 border-none mt-auto"
            @click="sendPaymentRequest"
        >
          پرداخت
        </button>
      </div>
    </div>
    <!--Utility Modal Start -->
    <div
        class="modal modal-open modal-bottom sm:modal-middle"
        v-if="isRenderingUtilityModal"
        @click="closeUtilityModal"
    >
      <div class="modal-box" @click.stop>
        <div
            class="flex items-center justify-center pb-2 border-b dark:border-gray-400 border-gray-200"
        >
          <strong class="dark:text-white text-gray-700 text-sm md:text-lg">
            تکمیل درخواست VIP
          </strong>
        </div>
        <div class="py-4">
          <p>انتخاب فروشگاه</p>
          <v-select
              v-if="userShops.shops"
              :options="userShops.shops"
              v-model="utilityRequest.shopId"
              label="shopName"
              :reduce="(shop:any) => shop.shopId"
              :clearable="false"
          >
          </v-select>
        </div>
        <div class="modal-action flex items-center justify-start gap-x-5">
          <button type="button" @click="closeUtilityModal" class="btn">
            بستن
          </button>
          <button
              :disabled="!utilityRequest.shopId"
              @click="verifyPaymentRequest"
              type="button"
              class="btn bg-violet border-none text-white"
          >
            ثبت
          </button>
        </div>
      </div>
    </div>
    <!--Utility Modal End -->
  </div>

</template>

<script setup lang="ts">
import { inject, reactive, ref, computed } from "vue";
import { utilityRequest } from "@/models/utilityRequest";
import { useAuthStore } from "@/stores/auth";
import { UtilityTypes } from "@/models/enums/utilityTypes";
import { useAppStore } from "@/stores/app";

// Interfaces
interface PriceObject {
  title: string;
  amount: string | number;
  borderClass?: string;
  badgeClass?: string;
}

// Variables
const authStore: any = useAuthStore();
const appStore = useAppStore();
const api: any = inject("repositories");
const toast: any = inject("toast");
const isRenderingUtilityModal = ref(false);

let utilityRequest = reactive<utilityRequest>({
  userId: authStore.getUser.userId,
  shopId: null,
  createDate: new Date(Date.now()),
  type: UtilityTypes.VIPRequest,
  description: "درخواست VIP",
});

const priceList: Array<PriceObject> = reactive([
  {
    title: "1 ماهه",
    amount: 30000,
    borderClass: "border-orange-400",
    badgeClass: "bg-orange-400 border-orange-500",
  },
  {
    title: "6 ماهه",
    amount: 50000,
    borderClass: "border-cyan-500",
    badgeClass: "bg-cyan-500 border-cyan-600",
  },
  {
    title: "1 ساله",
    amount: 100000,
    borderClass: "border-emerald-600",
    badgeClass: "bg-emerald-600 border-emerald-700",
  },
]);

let userShops = reactive({ shops: null });

// Functions
async function sendPaymentRequest() {
  isRenderingUtilityModal.value = true;
  getUserShops();
}

function closeUtilityModal() {
  isRenderingUtilityModal.value = false;
}

async function verifyPaymentRequest() {
  createUtilityRequest();
}

async function getUserShops() {
  try {
    appStore.showOverlay = true;
    const res = await api.getShopsByUserId.setParams({
      pageNumber: 0,
      count: 0,
      searchCommand: null,
    });
    userShops.shops = reactive(res.data.shops);
    console.log(userShops);
  } catch (e) {
    console.error(e);
  } finally {
    appStore.showOverlay = false;
  }
}

async function createUtilityRequest() {
  try {
    appStore.showOverlay = true;
    const res = await api.createUtilityRequest.setPayload(utilityRequest);
    if (res.data != 0) {
      closeUtilityModal();
      toast.success({ content: "پرداخت با موفقیت انجام شد." });
      utilityRequest = {
        userId: authStore.getUser.userId,
        shopId: null,
        createDate: new Date(Date.now()),
        type: UtilityTypes.VIPRequest,
        description: "درخواست VIP",
      };
    } else {
      toast.error({ content: "خطایی رخ داده است" });
    }
  } catch (error) {
    console.error(error);
  } finally {
    appStore.showOverlay = false;
  }
}

// Computed
const utilityDescription = computed({
  set(value: string) {
    utilityRequest.description = value;
  },
  get(): string {
    return utilityRequest.description!;
  },
});
</script>

<style scoped></style>
