<template>
  <div class=" md:col-span-4 col-span-12 dark:text-white  p-3 rounded-xl dark:bg-dark-muted bg-white shadow ">
    <div class="w-full flex border-b pb-3 items-center justify-between">
      <strong>اظهار نامه سالیانه</strong>
      <div class="flex items-center justify-center gap-2">
<!--        <button class=" btn-sm border-none p-2 !h-full btn bg-primary text-white fill-white rounded-xl shadow">-->
<!--          <label for="viewStatement">-->
<!--            <EyeIcon class="w-6 h-6"></EyeIcon>-->
<!--          </label>-->
<!--        </button>-->
        <span class="p-2 border border-green-500 text-green-500 rounded-xl shadow">پرداخت شده</span>
      </div>
    </div>
    <div class="w-full flex h-40 bg-gray-50 shadow items-center justify-center">
      <i class="ri-file-pdf-line text-5xl"></i>
    </div>
    <div class="w-full flex pt-3 flex-col items-start">
      <p class="flex-wrap dark:text-white text-gray-500">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از

        اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</p>
    </div>
    <div class="w-full border-b pb-3 flex items-center justify-end">
      <small class="text-gray-400 ">{{new Date(Date.now()).toLocaleDateString('fa-IR',{})}}</small>
    </div>
    <div class="w-full pt-3 flex flex-col items-start">
      <div class="flex w-full items-center justify-between">
        <span class="text-gray-400">مبلغ محاسبه شده</span>
        <strong>120,000 تومان</strong>
      </div>
      <div class="w-full mt-3  flex flex-col gap-1">
        <button class="w-full btn bg-violet border-none">دانلود</button>

        <button class="w-full btn bg-green-500 border-none">پرداخت</button>
      </div>
    </div>
  </div>
</template>

<script setup>

import EyeIcon from "@/components/icons/EyeIcon.vue";
</script>

<style scoped>

</style>