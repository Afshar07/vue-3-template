<script setup lang="ts">
import { routeToReportType } from "@/models/enums/reportTypes";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

onMounted(() => {
  // @ts-ignore-next-line
  console.log(routeToReportType[route.params.slug]);
});
</script>
<template></template>
