<script setup lang="ts">
import { imshow, Mat } from "@techstark/opencv-js";
import { onMounted, ref, toRefs, watch } from "vue";
import { detectFace } from "@/services/FaceDetection";
import VideoStream from "@/video-stream/VideoStream.vue";
import { preprocess } from "@/services/PreprocessService";
import { predict } from "@/services/ClassifierService";

const faceCanvas = ref<HTMLCanvasElement>();

const streamCallback = (cvFrame: Mat) => {
  if (faceCanvas.value) {
    const face = detectFace(cvFrame);
    imshow(faceCanvas.value, face.original);
    try {
      const image = preprocess(face.roi);
      predict(image);
    } catch (e) {
      console.log(e);
    }
  }
};
</script>
<template>
  <VideoStream @new-frame="streamCallback" />
  <canvas ref="faceCanvas"></canvas>
</template>
