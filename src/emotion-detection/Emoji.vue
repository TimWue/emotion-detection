<script setup lang="ts">
import { computed } from "vue";
import { emojis } from "@/assets/Labels";

const props = defineProps({
  predictedClass: {
    type: Number,
    required: true,
  },
});

const emoji = computed(() => {
  return String.fromCodePoint(emojis[props.predictedClass]);
});
</script>
<template>
  <div :key="predictedClass" class="animate-spin">
    {{ emoji }}
  </div>
</template>
