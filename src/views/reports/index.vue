<template>
  <div class="md:main-card grid gap-2 grid-cols-12">
    <div
      v-for="(type, index) in myReportOjects"
      :key="index"
      class="md:col-span-3 col-span-4 h-40 flex flex-col justify-between"
    >
      <div
        class="h-3/4 flex items-center justify-center rounded-t-lg border-t-4 shadow bg-white dark:bg-dark-muted"
        :class="type.borderColor"
      >
        <DynamicIcon :icon="type.icon"></DynamicIcon>
        <!-- <CoinIcon class="w-8 h-8 dark:fill-white"></CoinIcon> -->
      </div>
      <router-link
        :to="`/reports/${type.slug}`"
        class="w-full text-center flex rounded-b-lg shadow text-white items-center justify-center h-1/4 font-bold"
        :class="type.bgColor"
      >
        <small>{{ type.title }}</small>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import CoinIcon from "@/components/icons/CoinIcon.vue";
import ReportsIcon from "@/components/icons/ReportsIcon.vue";
import { reportTypes } from "@/models/enums/reportTypes";
import { onMounted } from "vue";
import DynamicIcon from "@/components/main/DynamicIcon.vue";

onMounted(() => {
  console.log(reportTypes["Protest"]);
});

const myReportOjects = [
  {
    title: "اعتراض",
    type: reportTypes.Protest,
    slug: "protest",
    bgColor: "bg-[#14b8a6]",
    borderColor: "border-t-[#14b8a6]",
    icon: "ProtestIcon",
  },
  {
    title: "گزارش فصلی",
    type: reportTypes.SeasonReport,
    slug: "seasonal-report",
    bgColor: "bg-yellow-500",
    borderColor: "border-t-yellow-500",
    icon: "CoinIcon",
  },
  {
    title: "ابلاغیه ها",
    type: reportTypes.SeasonReport,
    slug: "announcement",
    bgColor: "bg-red-500",
    borderColor: "border-t-red-500",
    icon: "MailIcon",
  },
  {
    title: "اظهارنامه ارزش افزوده",
    type: reportTypes.AddedValueStatement,
    slug: "added-value-statement",
    bgColor: "bg-cyan-500",
    borderColor: "border-t-cyan-500",
    icon: "FolderPlusIcon",
  },
  {
    title: "اظهارنامه عملکرد",
    type: reportTypes.FunctionStatement,
    slug: "performance-statement",
    bgColor: "bg-orange-500",
    borderColor: "border-t-orange-500",
    icon: "FlashIcon",
  },
  {
    title: "مدارک سامانه مالیاتی",
    type: reportTypes.TaxSystemDocument,
    slug: "tax-system-document",
    bgColor: "bg-lime-600",
    borderColor: "border-t-lime-600",
    icon: "PaperIcon",
  },
  {
    title: "پرداخت قبض",
    type: reportTypes.PayBill,
    slug: "pay-bill",
    bgColor: "bg-fuchsia-700",
    borderColor: "border-t-fuschia-700",
  },
];
</script>

<style scoped></style>
