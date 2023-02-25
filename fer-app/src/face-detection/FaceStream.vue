<script setup lang="ts">
import { imshow, Mat } from "@techstark/opencv-js";
import { ref } from "vue";
import { detectFace } from "@/services/FaceDetection";
import VideoStream from "@/video-stream/VideoStream.vue";

const emits = defineEmits<{
  (event: "new-face", face: Mat): void;
}>();

const faceCanvas = ref<HTMLCanvasElement>();

const streamCallback = (cvFrame: Mat) => {
  if (faceCanvas.value) {
    const face = detectFace(cvFrame);
    imshow(faceCanvas.value, face.original);
    emits("new-face", face.roi);
  }
};
</script>
<template>
  <VideoStream @new-frame="streamCallback" />
  <canvas ref="faceCanvas"></canvas>
</template>
