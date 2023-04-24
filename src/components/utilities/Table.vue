<template>
    <table class="w-full">
      <!-- head -->
      <thead class="bg-gray-200 h-[3.5rem] ">
      <tr >
        <th v-for="(item,idx) in props.fields" :key="idx">{{ item['label'] }}</th>
      </tr>
      </thead>
      <tbody>
      <!-- row 1 -->
      <tr   v-for="(row,idx) in props.items" :key="idx" :class="computedColors(+idx)">
        <td v-for="(td,idx) in props.fields" :key="idx">
          <slot :items="row" :name="td?.key">
            <span>{{ row[td?.key] }}</span>
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
import {computed} from "vue";
const props = defineProps({
  items: Object,
  fields: Object,
  emptyText: String
})

function  computedColors(idx:number){
  if(idx%2===0){
    return '!bg-white  dark:!bg-gray-800 '
  }else{
    return '!bg-gray-100 dark:!bg-gray-700  '
  }

}



</script>
<style scoped>
table {
  vertical-align: center;
  text-align: center;
}
table td {
  line-height: 3rem!important;
}
table thead th {
  @apply dark:bg-dark-muted;
  @apply dark:text-white;
}

table tbody td {
  line-height: 3.5rem!important;
  vertical-align: center!important;
  horiz-align: center!important;

  @apply dark:text-white;
}

</style>
