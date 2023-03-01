<script setup lang="ts">
import { imshow, Mat } from "@techstark/opencv-js";
import { ref } from "vue";
import { detectFace } from "@/services/FaceDetection";
import VideoStream from "@/video-stream/VideoStream.vue";

const emits = defineEmits<{
  (event: "new-face", face: Mat): void;
}>();

const faceCanvas = ref<HTMLCanvasElement>();
const blurredBackground = ref<HTMLCanvasElement>();

const streamCallback = (cvFrame: Mat) => {
  blurredBackground.value && imshow(blurredBackground.value, cvFrame)
  if (faceCanvas.value) {
    const face = detectFace(cvFrame);
    imshow(faceCanvas.value, face.original);
    face.roi && emits("new-face", face.roi);
  }
};
</script>
<template>
  <VideoStream @new-frame="streamCallback" />
  <canvas ref="faceCanvas" class="aspect-square w-full h-auto rounded-[32px]" :style="{transform: 'scaleX(-1)'}" />
</template>
