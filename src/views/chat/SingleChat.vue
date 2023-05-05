<template>
  <div class="w-full min-h-full h-full bg-white relative">
    <header class="h-14 shadow-md flex items-center justify-between p-4">
      <div class="avatar-name-section flex items-center">
        <div class="avatar placeholder online">
          <div class="w-10 rounded-full">
            <img
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
        <h2 class="mr-2 font-semibold">کاربر</h2>
      </div>
      <router-link to="/chat">
        <ChevronLeft class="w-5 h-5"></ChevronLeft>
      </router-link>
    </header>
    <main class="min-h-[calc(100vh - 80px)]"></main>
    <footer class="sticky w-full bottom-0">test</footer>
  </div>
</template>
<script>
import ChevronLeft from "@/components/icons/ChevronLeft.vue";
export default {
  name: "conversation",
  components: { ChevronLeft },
};
</script>
