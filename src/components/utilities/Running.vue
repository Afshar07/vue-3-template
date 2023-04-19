<template>
  <div class="lds-dual-ring"></div>
</template>

<script>
export default {
  name: "Running"
}
</script>

<style scoped>
.lds-dual-ring {
  display: inline-block;
  width: 32px;
  height: 32px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 24px;
  height: 24px;
  margin: 4px;
  border-radius: 50%;
  border: 6px solid #22c55e;
  border-color: #22C55EFF transparent #22C55EFF transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>