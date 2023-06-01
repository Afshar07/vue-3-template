<template>
  <div class="md:main-card grid gap-y-7 md:gap-2 grid-cols-12">
    <div
      class="col-span-12 p-3 bg-white flex flex-col items-start rounded-xl shadow"
    >
      <strong>خرید اشتراک vip</strong>
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
      class="col-span-12 md:col-span-4 bg-white py-6 flex flex-col items-center px-3 rounded-md border-t-4 shadow h-full"
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
      <button class="btn bg-green-500 border-none mt-auto">پرداخت</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

interface PriceObject {
  title: string;
  amount: string | number;
  borderClass?: string;
  badgeClass?: string;
}

// Variables
const priceList: Array<PriceObject> = reactive([
  {
    title: "1 ماهه",
    amount: 30000,
    borderClass: "border-red-600",
    badgeClass: "bg-red-600 border-red-700",
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
    borderClass: "border-green-500",
    badgeClass: "bg-green-500 border-green-600",
  },
]);
</script>

<style scoped></style>
