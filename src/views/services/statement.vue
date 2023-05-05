<template>
  <div class="md:main-card  grid gap-2 grid-cols-12">
    <Modal :id="'statement'" @ok="submitStatementForm" :closeModalTitle="'بستن'" :okModalTitle="'ارسال'"
           :title="'درخواست اظهار‌نامه مالیاتی'">
      <template #modalBody>
        <div class="w-full grid grid-cols-2 p-3">
            <div class="col-span-2">
              <small for="">مثال</small>
              <VInput  v-model="statementData.name" :dataType="'text'"
                      :errorMessage="'ایمیل وارد شده معتبر نیست'"
                      :placeHolder="'مثال'"></VInput>
            </div>
        </div>
      </template>
    </Modal>
    <div  class=" md:col-span-3 col-span-6  h-28    flex flex-col  justify-between    ">
      <div class="h-2/3 flex items-center justify-center rounded-t shadow bg-white dark:bg-dark-muted">
        <PaperIcon class="w-8 h-8 dark:fill-white"></PaperIcon>
      </div>
      <label for="statement"
                   class="w-full  flex bg-[#f97316]  rounded-b shadow text-white items-center justify-center h-1/3">
        <small>درخواست اظهار‌نامه</small>
      </label>
    </div>
    <div  class=" md:col-span-3 col-span-6  h-28    flex flex-col  justify-between    ">
      <div class="h-2/3 flex items-center justify-center rounded-t shadow bg-white dark:bg-dark-muted">
        <PaperIcon class="w-8 h-8 dark:fill-white"></PaperIcon>
      </div>
      <router-link to="/services/statement"
                   class="w-full  flex bg-[#22c55e]   rounded-b shadow text-white items-center justify-center h-1/3">
        <small>اظهارنامه ارزش افزوده</small>
      </router-link>
    </div>
    <div  class=" md:col-span-3 col-span-6  h-28    flex flex-col  justify-between    ">
      <div class="h-2/3 flex items-center justify-center rounded-t shadow bg-white dark:bg-dark-muted">
        <PaperIcon class="w-8 h-8 dark:fill-white"></PaperIcon>
      </div>
      <router-link to="/services/statement"
                   class="w-full  flex bg-[#8b5cf6]  rounded-b shadow text-white items-center justify-center h-1/3">
        <small>اظهارنامه سالیانه</small>
      </router-link>
    </div>
    <div  class=" md:col-span-3 col-span-6  h-28    flex flex-col  justify-between    ">
      <div class="h-2/3 flex items-center justify-center rounded-t shadow bg-white dark:bg-dark-muted">
        <PaperIcon class="w-8 h-8 dark:fill-white"></PaperIcon>
      </div>
      <router-link to="/services/statement"
                   class="w-full  flex bg-[#ec4899]  rounded-b shadow text-white items-center justify-center h-1/3">
        <small>اظهارنامه عملکرد</small>
      </router-link>
    </div>
  </div>
</template>

<script setup>

import PaperIcon from "@/components/icons/PaperIcon.vue";
import Modal from "@/components/utilities/Modal.vue";
import {reactive} from "vue";
import VInput from "@/components/utilities/VInput.vue";
let statementData = reactive({
  name:''
})
 function submitStatementForm(){

 }
</script>

<style scoped>

</style>