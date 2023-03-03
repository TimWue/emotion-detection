<script setup lang="ts">
import { ref } from "vue";
import { useFaceStore } from "@/global/FaceStore";
import { predict } from "@/utils/EmotionClassification";
import type { Emotion } from "@/domain/Emotion";

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
