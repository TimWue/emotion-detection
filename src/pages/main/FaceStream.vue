<script setup lang="ts">
import { imshow, Mat } from "@techstark/opencv-js";
import { ref } from "vue";
import { detectFace } from "@/utils/FaceDetection";
import VideoStream from "@/pages/main/VideoStream.vue";

const emits = defineEmits<{
  (event: "new-face", face: Mat): void;
}>();

const faceCanvas = ref<HTMLCanvasElement>();
const blurredBackground = ref<HTMLCanvasElement>();

const streamCallback = (cvFrame: Mat) => {
  blurredBackground.value && imshow(blurredBackground.value, cvFrame);
  if (faceCanvas.value) {
    const face = detectFace(cvFrame);
    imshow(faceCanvas.value, face.original);
    face.original.delete();
    face.roi && emits("new-face", face.roi);
  }
};
</script>
<template>
  <VideoStream @new-frame="streamCallback" />
  <canvas
    ref="faceCanvas"
    class="aspect-square w-full h-auto rounded-2xl"
    :style="{ transform: 'scaleX(-1)' }"
  />
</template>
