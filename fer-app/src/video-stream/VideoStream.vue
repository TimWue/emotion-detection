<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { imread, imshow } from "@techstark/opencv-js";
import { detectFace } from "@/services/FaceDetection";

const video = ref<HTMLVideoElement>();
const hiddenCanvas = ref<HTMLCanvasElement>();
const faceCanvas = ref<HTMLCanvasElement>();
const stream = ref<MediaStream>();

const constraints = {
  audio: false,
  video: {
    width: { min: 1024, ideal: 1280, max: 1920 },
    height: { min: 576, ideal: 720, max: 1080 },
    facingMode: "user",
  },
};

const showFace = () => {
  if (video.value && hiddenCanvas.value && faceCanvas.value) {
    let ctx = hiddenCanvas.value.getContext("2d");
    ctx?.drawImage(
      video.value,
      0,
      0,
      hiddenCanvas.value.width,
      hiddenCanvas.value.height
    );

    let mat = imread(hiddenCanvas.value);
    try {
      const faceDetection = detectFace(mat);
      imshow(faceCanvas.value, faceDetection.original);
    } catch (reason) {
      console.error(reason);
    }
  }
  video.value?.requestVideoFrameCallback(showFace);
};

onMounted(async () => {
  stream.value = await navigator.mediaDevices.getUserMedia(constraints);
  video.value?.requestVideoFrameCallback(showFace);
});

onBeforeUnmount(() => {
  stream.value?.getTracks().forEach((track) => track.stop());
});
</script>
<template>
  <video
    :srcObject="stream"
    width="400"
    autoplay
    ref="video"
    class="hidden"
  ></video>
  <canvas class="hidden" ref="hiddenCanvas"></canvas>
  <canvas ref="faceCanvas"></canvas>
</template>
