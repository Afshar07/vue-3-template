<template>
  <table class="table   table-compact  w-full">
    <!-- head -->
    <thead>
    <tr>
      <th v-for="(item,idx) in props.fields" :key="idx">{{ item['label'] }}</th>
    </tr>
    </thead>
    <tbody>
    <!-- row 1 -->
    <tr v-for="(row,idx) in props.items" :key="idx">
      <td v-for="(td,idx) in props.fields" :key="idx">
        <slot :items="row" :name="td.key">
          <span>{{ row[td.key] }}</span>
        </slot>
      </td>
      <!--      <td >-->
      <!--        <div class="flex items-center gap-2">-->
      <!--          <img v-if="item['selfieFileData']!== ''" :src="helper.baseUrl + item['selfieFileData']" class="object-cover w-8 h-8 rounded-full" alt="">-->
      <!--          <img v-else src="../../assets/image/no_image.png" class="object-cover w-8 h-8 rounded-full" alt="">-->
      <!--          <small>{{item.name}}</small>-->
      <!--        </div>-->
      <!--      </td>-->
      <!--      <td>-->
      <!--        <small>{{item.familyName}}</small>-->
      <!--      </td>-->
      <!--      <td>-->
      <!--        <small>{{ item.userName }}</small>-->
      <!--      </td>-->
      <!--      <td>-->
      <!--        <small>{{ item.email }}</small>-->
      <!--      </td>-->

    </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import helper from "@/plugins/helper";

const props = defineProps({
  items: String,
  fields: Number,
  emptyText: String
})
</script>
<style scoped>
.table {
  vertical-align: center;
  horiz-align: center;
}
.table td {
  line-height: 3rem!important;
}
.table thead th {
  @apply dark:bg-dark-muted;
  @apply dark:text-white;
}

.table tbody td {
  @apply dark:bg-slate-600;
  @apply dark:text-white;
}
</style>
