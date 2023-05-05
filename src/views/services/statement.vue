<template>
  <div class="md:main-card  grid gap-2 grid-cols-12">
    <Modal :id="'optionsModal'" @ok="forgetPassword" :closeModalTitle="'بستن'" :okModalTitle="'ارسال'"
           :title="'فراموشی رمز عبور'">
      <template #modalBody>
        <div class="w-full p-3">
          <div>
            <div class="mb-2 ">
              <label for="email-address" class=" text-black  dark:text-white ">آدرس ایمیل یا شماره تلفن خود را وارد کنید</label>
            </div>
            <VInput v-model="loginData.mail" class="" :dataType="'text'"
                    :error="emailNotValid"
                    :errorMessage="'ایمیل وارد شده معتبر نیست'"
                    :placeHolder="'example@example.com'"></VInput>
          </div>
        </div>
      </template>
    </Modal>
    <div  class=" md:col-span-3 col-span-6  h-28    flex flex-col  justify-between    ">
      <div class="h-2/3 flex items-center justify-center rounded-t shadow bg-white dark:bg-dark">
        <PaperIcon class="w-8 h-8"></PaperIcon>
      </div>
      <div to="/services/statement"
                   class="w-full  flex bg-[#f97316]  dark:bg-dark-muted rounded-b shadow text-white items-center justify-center h-1/3">
        <small>درخواست اظهار‌نامه</small>
      </div>
    </div>
    <div  class=" md:col-span-3 col-span-6  h-28    flex flex-col  justify-between    ">
      <div class="h-2/3 flex items-center justify-center rounded-t shadow bg-white dark:bg-dark">
        <PaperIcon class="w-8 h-8"></PaperIcon>
      </div>
      <router-link to="/services/statement"
                   class="w-full  flex bg-[#22c55e]  dark:bg-dark-muted rounded-b shadow text-white items-center justify-center h-1/3">
        <small>اظهارنامه ارزش افزوده</small>
      </router-link>
    </div>
    <div  class=" md:col-span-3 col-span-6  h-28    flex flex-col  justify-between    ">
      <div class="h-2/3 flex items-center justify-center rounded-t shadow bg-white dark:bg-dark">
        <PaperIcon class="w-8 h-8"></PaperIcon>
      </div>
      <router-link to="/services/statement"
                   class="w-full  flex bg-[#8b5cf6]  dark:bg-dark-muted rounded-b shadow text-white items-center justify-center h-1/3">
        <small>اظهارنامه سالیانه</small>
      </router-link>
    </div>
    <div  class=" md:col-span-3 col-span-6  h-28    flex flex-col  justify-between    ">
      <div class="h-2/3 flex items-center justify-center rounded-t shadow bg-white dark:bg-dark">
        <PaperIcon class="w-8 h-8"></PaperIcon>
      </div>
      <router-link to="/services/statement"
                   class="w-full  flex bg-[#ec4899]  dark:bg-dark-muted rounded-b shadow text-white items-center justify-center h-1/3">
        <small>اظهارنامه عملکرد</small>
      </router-link>
    </div>
  </div>
</template>

<script setup>

import PaperIcon from "@/components/icons/PaperIcon.vue";
import Modal from "@/components/utilities/Modal.vue";
</script>

<style scoped>

</style>