<template>
  <div class="min-h-screen grid grid-cols-12">
    <component
      :is="componentInstance"
      @changeActiveSlug="changeActiveComponent"
    ></component>

    <div
      class="md:col-span-7 xl:col-span-8 hidden md:flex justify-center items-center"
    >
      <login-pic2></login-pic2>
    </div>
  </div>
</template>

<script setup lang="ts">
import SignIn from "@/components/main/SignIn.vue";

import { computed, inject, onMounted, ref } from "vue";
import LoginPic2 from "@/components/icons/loginPic2.vue";
const components: any = {
  SignIn,
};
const helper: any = inject("helper");
const selectedComponent = ref("SignIn");
const componentInstance = computed(() => {
  return components[selectedComponent.value];
});
const appName = helper.appName;
function changeActiveComponent(slug: string): void {
  selectedComponent.value = slug;
}
</script>

<style scoped></style>
