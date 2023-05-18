<template>
  <div class="md:main-card grid gap-2 grid-cols-12">
    <div class="col-span-12 md:col-span-6">
      <div class="stat bg-white rounded shadow">
        <div class="stat-figure text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-8 h-8 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
        </div>
        <div class="stat-title">Total Likes</div>
        <div class="stat-value text-primary">25.6K</div>
        <div class="stat-desc">21% more than last month</div>
      </div>
    </div>
    <div class="col-span-12 md:col-span-6">
      <div class="stat bg-white rounded shadow">
        <div class="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-8 h-8 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
        </div>
        <div class="stat-title">Page Views</div>
        <div class="stat-value text-secondary">2.6M</div>
        <div class="stat-desc">21% more than last month</div>
      </div>
    </div>
    <div class="col-span-12 md:col-span-12">
      <div class="stat bg-white rounded shadow">
        <div class="stat-figure text-secondary">
          <div class="avatar online">
            <div class="w-16 rounded-full">
              <!--              <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg"/>-->
            </div>
          </div>
        </div>
        <div class="stat-value">86%</div>
        <div class="stat-title">Tasks done</div>
        <div class="stat-desc text-secondary">31 tasks remaining</div>
      </div>
    </div>

    <div
      v-for="i in 6"
      class="md:col-span-3 col-span-4 h-28 flex flex-col justify-between"
    >
      <div
        class="h-2/3 flex items-center justify-center rounded-t shadow bg-white dark:bg-dark"
      >
        <CloseIcon></CloseIcon>
      </div>
      <div
        class="w-full bg-primary flex dark:bg-dark-muted rounded-b shadow text-white items-center justify-center h-1/3"
      >
        <small>کارت ها</small>
      </div>
    </div>
  </div>
</template>

<script setup>
import Chart from "@/components/main/Chart.vue";
import { inject } from "vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";

const helper = inject("helper");
const appName = helper.appName;
</script>

<style scoped></style>
