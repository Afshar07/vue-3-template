<template>
  <div
      style="direction: ltr!important"
      class=" w-full flex flex-wrap items-center  justify-start"
      v-if="props.totalPages && props.totalPages.length > 1"
  >

    <button
        :disabled="props.activePage === 1"
        @click="setNewPage(props.activePage - 1)"
        class="p-1 rounded-full dark:bg-slate-600 bg-stone-200"
    >
      <ChevronLeft class="stroke-black  w-6 h-6  dark:stroke-white"></ChevronLeft>
    </button>
    <button
        v-if="props.totalPages.length > 3 && props.activePage > 3"
        @click="setNewPage(1)"
        class="text-black border-none text-black rounded-full w-10 h-10 mx-2 "
        :class="
        props.activePage === 1
          ? 'bg-stone-400 text-black border-none text-black rounded-full w-10 h-10 mx-2'
          : 'bg-stone-200'
      "
    >
      {{ 1 }}
    </button>
    <span
        v-if="props.totalPages.length > 3 && props.activePage > 3"
        class="m-3  cursor-text"
    >
      ...
    </span>
    <button
        class="text-black border-none text-black rounded-full w-8 h-8 flex items-center justify-center mx-2"
        v-for="i in filteredPage.filter(e=> e !==0)"
        :key="i"
        :class="
        props.activePage === i
          ? 'bg-stone-400  p-2 rounded-full text-white cursor-pointer'
          : 'bg-stone-200'
      "
        @click="setNewPage(i)"
    >
      {{ i }}
    </button>
    <span
        v-if="props.totalPages.length > 3 && props.activePage < props.totalPages.length - 3"
        class="m-3 w-9 h-9 cursor-text"
    >
      ...
    </span>
    <button
        v-if="props.totalPages.length > 3"
        @click="setNewPage(props.totalPages.length)"
        class="text-black border-none text-black rounded-full w-8 h-8 mx-2"
        :class="
        props.activePage === props.totalPages.length
          ? 'bg-stone-400  p-2 rounded-full text-white cursor-pointer'
          : 'bg-stone-200 '
      "
    >
      {{ props.totalPages.length }}
    </button>
    <button
        :disabled="props.activePage === props.totalPages.length"
        @click="setNewPage(props.activePage + 1)"
        class="p-1 rounded-full dark:bg-slate-600 bg-stone-200"
    >
      <ChevronLeft class="transform stroke-black  w-6 h-6  dark:stroke-white rotate-180"></ChevronLeft>
    </button>
  </div>
</template>
<script setup>
import {computed} from "vue";
import ChevronLeft from "@/components/icons/ChevronLeft.vue";
const emits = defineEmits(['PageChanged'])
const props = defineProps(['totalPages','activePage'])

function GetClassName(i) {
  if (i === props.activePage) {
    return 'ActiveClass'
  } else {
    return ''
  }
}

function setNewPage(pageNumber) {
  emits("PageChanged", pageNumber);
}

const filteredPage = computed(() => {
  // Okay, idk what's happening here, but im proud of it
  // Half of credit goes to @amoowily
  if (props.totalPages && props.totalPages.length > 3) {
    let filteredPaginationArray = [];
    if (props.activePage < 3) {
      // Rendering first 8 pages
      for (let i = 1; i <= 3; i++) {
        filteredPaginationArray.push(i);
      }
    } else if (props.activePage < props.totalPages.length - 2) {
      // Rendering middle pages
      filteredPaginationArray = [];
      for (let i = props.activePage - 2; i <= props.activePage + 2; i++) {
        filteredPaginationArray.push(i);
      }
    } else {
      // Rendering last pages
      filteredPaginationArray = [];
      for (let i = props.activePage - 3; i <= props.totalPages.length - 1; i++) {
        filteredPaginationArray.push(i);
      }
    }
    return filteredPaginationArray;
  } else {
    return props.totalPages;
  }
})
</script>
<style>
.ActiveClass {
  color: white;
  background-color: #00adef;
}


</style>
