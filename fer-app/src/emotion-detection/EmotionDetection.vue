<script setup lang="ts">
import { ref, watch } from "vue";
import { faceCanvasId } from "@/global/CanvasIds";
import { useFaceStore } from "@/global/FaceStore";
import { predict } from "@/services/ClassifierService";
import { emojis, labels } from "@/assets/Labels";
const threshold = 0.5;
const canvas = ref<HTMLCanvasElement>();
const label = ref<string>();
const emojy = ref<string>();
const percent = ref<string>();

const faceStore = useFaceStore();
faceStore.$subscribe((mutation, state) => {
  if (canvas.value) {
    const predictions = predict(canvas.value);
    const maxValue = Math.max(...predictions);
    const predictedClass = predictions.indexOf(maxValue);

    percent.value = maxValue.toFixed(2);
    label.value = labels[predictedClass];
    if (maxValue > threshold) {
      emojy.value = String.fromCodePoint(emojis[predictedClass]);
    }
  }
});
</script>
<template>
  <canvas ref="canvas" :id="faceCanvasId"></canvas>
  <div>{{ label }}</div>
  <div>{{ percent }}</div>
  <div class="text-9xl">{{ emojy }}</div>
</template>
