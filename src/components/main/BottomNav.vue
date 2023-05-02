<template>
  <div
      class="w-full flex items-center justify-around   h-16 bg-white dark:bg-dark-muted shadow-xl border-t border-t-gray-200 dark:border-t-gray-800  ">

    <div class="dropdown dropdown-top">
      <label tabindex="0" class=" p-2  flex flex-col items-center justify-center">
        <BankAccountIcon style="width: 30px;height: 30px"></BankAccountIcon>

        <small>حساب ها</small>

      </label>
      <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Item 1</a></li>
        <li><a>Item 2</a></li>
      </ul>
    </div>

    <div class="p-2  flex flex-col items-center justify-center">
      <BankCardIcon style="width: 30px;height: 30px"></BankCardIcon>

      <small>کارت ها</small>


    </div>

    <div class="p-2  flex flex-col items-center justify-center">
      <LayoutIcon style="width: 32px;height: 32px"></LayoutIcon>

      <small> خدمات</small>

    </div>

    <div class="p-2  gap-1 flex flex-col items-center justify-center">
      <UserIcon style="width: 30px;height: 30px"></UserIcon>

      <small> حساب کاربری</small>


    </div>

  </div>
</template>

<script setup>
import UserIcon from "@/components/icons/UserIcon.vue";
import LayoutIcon from "@/components/icons/LayoutIcon.vue";
import BankCardIcon from "@/components/icons/BankCardIcon.vue";
import BankAccountIcon from "@/components/icons/BankAccountIcon.vue";


</script>

<style scoped>

</style>
