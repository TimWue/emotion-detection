<script setup lang="ts">
import { computed } from "vue";
import type { Emotion } from "@/emotion-detection/Emotion";
import { labels } from "@/assets/Labels";

const props = defineProps<{
  emotion: Emotion | undefined;
}>();

const emotionName = computed(() =>
  props.emotion ? labels[props.emotion.class].toUpperCase() : undefined
);
const probability = computed(() =>
  props.emotion
    ? (props.emotion?.probability * 100).toFixed(0) + "%"
    : undefined
);
</script>
<template>
  <div
    class="grid xs:grid-cols-1 sm:grid-cols-2 p-3 bg-gray-800 bg-opacity-50 justify-center items-center rounded-2xl font-normal border gap-2 text-white text-center"
  >
    <div class="text-sm text-gray-300">Current detection</div>
    <div class="text-lg font-bold">{{ emotionName }}</div>
    <div class="text-sm text-gray-300">Current probability</div>
    <div class="text-lg font-bold">{{ probability }}</div>
  </div>
</template>
