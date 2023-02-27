import { defineStore } from "pinia";

export const useFaceStore = defineStore("face", {
  state: () => ({ isNew: false }),
});
