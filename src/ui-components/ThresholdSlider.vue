<script setup lang="ts">
defineProps({
  modelValue: { type: Number, default: 50 },
});
const emits = defineEmits<{
  (event: "update:modelValue", value: number): void;
}>();

const emitEvent = (inputEvent: Event) => {
  const element = inputEvent.currentTarget as HTMLInputElement;
  const inputValue = element.value;
  if (inputValue) {
    const newValue = parseInt(inputValue);
    emits("update:modelValue", newValue);
  }
};
</script>
<template>
  <div
    class="w-full flex flex-col p-2 bg-gray-800 bg-opacity-40 rounded-2xl gap-2"
  >
    <div>Select Threshold:</div>
    <div class="flex flex-row items-center justify-center gap-x-2 w-full">
      <div>0%</div>
      <input
        class="flex-grow"
        :value="modelValue"
        @input="emitEvent"
        type="range"
        min="0"
        max="100"
      />
      <div>100%</div>
    </div>
    <div class="text-center">{{ modelValue }}%</div>
  </div>
</template>
