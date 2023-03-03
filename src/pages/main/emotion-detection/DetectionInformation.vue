<script setup lang="ts">
import { computed } from "vue";
import { emotionClasses } from "@/global/EmotionClasses";
import type { Emotion } from "@/domain/Emotion";

const props = defineProps<{
  lastEmotionOverThreshold: Emotion | undefined;
  currentEmotion: Emotion | undefined;
}>();

const currentEmotionName = computed(() =>
  props.currentEmotion
    ? emotionClasses[props.currentEmotion.class].toUpperCase()
    : undefined
);
const currentProbability = computed(() =>
  props.currentEmotion
    ? (props.currentEmotion?.probability * 100).toFixed(0) + "%"
    : undefined
);
const lastEmotionName = computed(() =>
  props.lastEmotionOverThreshold
    ? emotionClasses[props.lastEmotionOverThreshold.class].toUpperCase()
    : undefined
);
const lastProbability = computed(() =>
  props.lastEmotionOverThreshold
    ? (props.lastEmotionOverThreshold?.probability * 100).toFixed(0) + "%"
    : undefined
);
</script>
<template>
  <div
    class="grid grid-cols-3 p-2 bg-gray-800 bg-opacity-40 rounded-2xl font-normal gap-x-2 text-white items-center w-full"
  >
    <div class="text-sm text-gray-300 col-span-2">Current detection:</div>
    <div class="text-lg font-bold">{{ currentEmotionName }}</div>
    <div class="text-sm text-gray-300 col-span-2">Current probability:</div>
    <div class="text-lg font-bold">{{ currentProbability }}</div>
    <div class="text-sm text-gray-300 col-span-2">
      Last detection above threshold:
    </div>
    <div class="text-lg font-bold">{{ lastEmotionName }}</div>
  </div>
</template>
