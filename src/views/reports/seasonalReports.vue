<template>
  <div class="md:main-card  grid gap-2 grid-cols-12">
    <Modal :id="'viewStatement'"  :closeModalTitle="'بستن'"
           :title="'اظهار‌نامه مالیاتی'">
      <template #modalBody>
        <div class="w-full grid grid-cols-2 p-3">

        </div>
      </template>
    </Modal>

    <ReportCard></ReportCard>

  </div>
</template>

<script setup>
import ListIcon from "@/components/icons/listIcon.vue";
import EyeIcon from "@/components/icons/EyeIcon.vue";
import Modal from "@/components/utilities/Modal.vue";
import ReportCard from "@/components/main/ReportCard.vue";


</script>

<style scoped>

</style>