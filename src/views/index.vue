<template>
  <div class="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <h1 class="text-white text-[3rem] mb-3">
      Welcome to {{ appName }}
    </h1>
    <component :is="componentInstance" @changeActiveSlug="changeActiveComponent"></component>
  </div>
</template>

<script setup lang="ts">
import SignIn from "@/components/main/SignIn.vue";
import SignUp from "@/components/main/SignUp.vue";
import {computed, inject, onMounted, ref} from "vue";
const components:any = {
  SignUp,
  SignIn
}
const helper:any = inject('helper')
const selectedComponent = ref('SignIn')
const componentInstance = computed(() => {
  return components[selectedComponent.value]
})
const appName = helper.appName
function changeActiveComponent(slug: string): void {
selectedComponent.value = slug
}
</script>

<style scoped>

</style>
