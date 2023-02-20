<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { imread, imshow, Mat } from "@techstark/opencv-js";
import { detectFace } from "@/services/FaceDetection";

const video = ref<HTMLVideoElement>();
const hiddenCanvas = ref<HTMLCanvasElement>();
const stream = ref<MediaStream>();
const emits = defineEmits<{
  (event: "new-frame", frame: Mat): void;
}>();

const constraints = {
  audio: false,
  video: {
    width: { min: 1024, ideal: 1280, max: 1920 },
    height: { min: 576, ideal: 720, max: 1080 },
    facingMode: "user",
  },
};

const onFrame = () => {
  if (video.value && hiddenCanvas.value) {
    let ctx = hiddenCanvas.value.getContext("2d", { willReadFrequently: true });
    ctx?.drawImage(
      video.value,
      0,
      0,
      hiddenCanvas.value.width,
      hiddenCanvas.value.height
    );

    let frame = imread(hiddenCanvas.value);
    emits("new-frame", frame);
  }
  video.value?.requestVideoFrameCallback(onFrame);
};

onMounted(async () => {
  stream.value = await navigator.mediaDevices.getUserMedia(constraints);
  video.value?.requestVideoFrameCallback(onFrame);
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
</template>
