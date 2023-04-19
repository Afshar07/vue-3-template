<template>
  <div class="flex min-h-full   items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <component :is="componentInstance" @changeActiveSlug="changeActiveComponent"></component>

  </div>
</template>

<script setup lang="ts">
import SignIn from "@/components/main/SignIn.vue";
import SignUp from "@/components/main/SignUp.vue";
import {computed, onMounted, ref} from "vue";
onMounted(()=>{
  const body:any = document.querySelector('body')
    body.classList.add('dark')

})
const components:any = {
  SignUp,
  SignIn
}
const selectedComponent = ref('SignIn')
const componentInstance = computed(() => {
  return components[selectedComponent.value]
})


function changeActiveComponent(slug: string): void {
selectedComponent.value = slug
}


</script>

<style scoped>

</style>
