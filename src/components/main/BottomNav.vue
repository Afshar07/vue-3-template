<template>
<div class="w-full flex items-center justify-around   h-16 bg-white dark:bg-dark-muted shadow-xl border-t border-t-gray-200 dark:border-t-gray-800  ">
<div class="p-2  flex flex-col items-center justify-center">
  <CloseIcon></CloseIcon>
  <small>کارت ها</small>

  </div>
  <div class="p-2  flex flex-col items-center justify-center">
    <CloseIcon></CloseIcon>

    <small>حساب ها</small>


  </div>

  <div class="p-2  flex flex-col items-center justify-center">
    <CloseIcon></CloseIcon>

    <small>دکتر ها</small>

  </div>

  <div class="p-2  flex flex-col items-center justify-center">
    <CloseIcon></CloseIcon>

    <small>دایی ها</small>


  </div>

</div>
</template>

<script>
import CloseIcon from "@/components/icons/CloseIcon.vue";

export default {
  name: "BottomNav",
  components: {CloseIcon}
}
</script>

<style scoped>

</style>
