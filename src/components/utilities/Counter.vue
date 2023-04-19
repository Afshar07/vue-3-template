<template>
  <div class="flex items-center justify-end !m-0 text-white gap-2 " style="direction: rtl!important;">
    <small>{{Seconds}}</small>
    <small>:</small>
    <small>{{Minutes}}</small>

  </div>
</template>

<script>
export default {
  name: "Counter",
  props:{

    Minute:{
      type:Number,
      required:true
    },

  },
  mounted(){
    this.Minutes = this.Minute
      this.TimeOut = setInterval(()=>{
        if(this.Minutes>0){

          this.Seconds--
        if(this.Seconds===1){
          this.Minutes--
          this.Seconds = 59
        }
      }
      },1000)
    if(this.Minutes===0){
      clearInterval(this.TimeOut)
    }

  },
  data(){
    return{
      TimeOut:null,
      Minutes:0,
      Seconds:59,
    }
  }
}
</script>

<style scoped>

</style>
