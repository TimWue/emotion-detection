<script setup lang="ts">
import { ref } from "vue";
import { useFaceStore } from "@/global/FaceStore";
import { predict } from "@/services/ClassifierService";
import type { Emotion } from "@/emotion-detection/Emotion";

defineProps<{
  emotionCanvasId: string;
}>();

const emits = defineEmits<{
  (event: "new-emotion", emotion: Emotion): void;
}>();

const canvas = ref<HTMLCanvasElement>();
const faceStore = useFaceStore();

faceStore.$subscribe(() => {
  if (canvas.value) {
    const predictions = predict(canvas.value);
    const maxValue = Math.max(...predictions);
    const predictedClass = predictions.indexOf(maxValue);
    emits("new-emotion", { class: predictedClass, probability: maxValue });
  }
});
</script>
<template>
  <div class="w-full">
    <canvas ref="canvas" :id="emotionCanvasId" class="hidden"></canvas>
  </div>
</template>
