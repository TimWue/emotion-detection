import { defineStore } from "pinia";
import type { Mat } from "@techstark/opencv-js";
import { ref } from "vue";

export const useFaceStore = defineStore("face", {
  state: () => ({ isNew: false }),
});
