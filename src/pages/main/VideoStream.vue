<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { imread, Mat } from "@techstark/opencv-js";

const video = ref<HTMLVideoElement>();
const hiddenCanvas = ref<HTMLCanvasElement>();
const stream = ref<MediaStream>();
const emits = defineEmits<{
  (event: "new-frame", frame: Mat): void;
}>();

// We want a squared image in order to facilitate displaying in different screen sizes
const height = 200;
const width = 200;
const constraints: MediaStreamConstraints = {
  audio: false,
  video: {
    facingMode: "user",
    width: { ideal: height },
    height: { ideal: width },
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
    autoplay
    ref="video"
    class="aspect-square absolute opacity-0 w-10 h-10"
    playsinline
  ></video>
  <canvas
    class="aspect-square hidden"
    ref="hiddenCanvas"
    :width="width"
    :height="height"
  ></canvas>
</template>
