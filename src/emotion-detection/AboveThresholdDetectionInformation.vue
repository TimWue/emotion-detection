<script setup lang="ts">
import { computed } from "vue";
import type { Emotion } from "@/emotion-detection/Emotion";
import { labels } from "@/assets/Labels";

const props = defineProps<{
  emotion: Emotion | undefined;
}>();

const emotionName = computed(() =>
  props.emotion ? labels[props.emotion?.class].toUpperCase() : undefined
);
</script>
<template>
  <div
    class="flex flex-col p-3 bg-gray-800 bg-opacity-50 justify-center items-center rounded-2xl font-normal border gap-y-2 text-white text-center"
  >
    <div class="text-sm text-gray-300">Last detection above threshold</div>
    <div class="text-lg font-bold">{{ emotionName }}</div>
  </div>
</template>
