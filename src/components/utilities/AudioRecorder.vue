<template>
  <div class="w-full flex items-center"></div>
</template>
<script setup>
import {inject, reactive, ref} from "vue";

let emits = defineEmits(['getAudioBlob', 'getMediaRecorderState','startTimer'])
defineExpose({
  stopRecording,
  handleRecording,
  startRecording
})
let audioPermission = reactive({
  audio: true
})
let isRecording = ref(false)
let isPlaying = ref(false)
let audioChunks = ref([])
let audioBlob = ref(null)
let mainStream = ref(null)
let base64Data = ref(null)
let mediaRecorderState = ref(null)
let mediaRecorder = ref(null)
let toast = inject('toast')
async function startRecording(){
  try {
    mainStream.value = await navigator.mediaDevices.getUserMedia(audioPermission);
    audioChunks.value = [];
    handleRecording();
    emits('startTimer',true)
  } catch (error) {
    console.log(error);
    if (
        error.name === "NotFoundError" ||
        error.name === "DevicesNotFoundError"
    ) {
       emits('startTimer',false)
      toast.error({content: `هیچ میکروفونی روی دستگاه شما یافت نشد`})

    } else if (
        error.name === "NotAllowedError" ||
        error.name === "PermissionDeniedError"
    ) {
       emits('startTimer',false)
      toast.error({content: `دسترسی میکروفون خود را فعال کنید`})
    }
  }
}
function handleRecording(){
  mediaRecorder = new MediaRecorder(mainStream.value);
  mediaRecorder.start();
  mediaRecorder.addEventListener("dataavailable", (event) => {
    audioChunks.value.push(event.data);
  });
  emits("getMediaRecorderState", mediaRecorder.state);
}
async function stopRecording() {

  await mediaRecorder.addEventListener("stop", () => {
    // audioBlob.value = new Blob(audioChunks[0], {
    //   type: mediaRecorder.mimeType,
    // });
    emits("getAudioBlob", audioChunks.value[0]);
  });
  if (mediaRecorder.state !== "inactive") {
    mainStream.value.getTracks()[0].stop();
    mediaRecorder.stop();
  }
  isPlaying.value = true;
  emits("getMediaRecorderState", mediaRecorder.state);
}
</script>

<style scoped></style>
