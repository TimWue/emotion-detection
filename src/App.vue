<script setup lang="ts">
import { onMounted, ref } from "vue";
import { initCascadeClassifier } from "@/utils/FaceDetection";
import { imshow, Mat } from "@techstark/opencv-js";
import { initializeModel } from "@/utils/EmotionClassification";
import { preprocess } from "@/utils/Preprocessing";
import { useFaceStore } from "@/global/FaceStore";
import FaceStream from "@/pages/main/FaceStream.vue";
import Emoji from "@/pages/main/emotion-detection/Emoji.vue";
import DetectionInformation from "@/pages/main/emotion-detection/DetectionInformation.vue";
import ThresholdSlider from "@/ui-components/ThresholdSlider.vue";
import EmotionDetection from "@/pages/main/emotion-detection/EmotionDetection.vue";
import Loading from "@/ui-components/Loading.vue";
import type { Emotion } from "@/domain/Emotion";
import Header from "@/pages/header/Header.vue";

const threshold = ref(50);
const faceStore = useFaceStore();
const cascadeClassifierLoaded = ref(false);
const customModelLoaded = ref(false);
const emotionCanvasId = "emotionCanvasId";
const currentEmotion = ref<Emotion>();
const lastEmotionAboveThreshold = ref<Emotion>();

onMounted(async () => {
  await initCascadeClassifier();
  cascadeClassifierLoaded.value = true;
  await initializeModel();
  customModelLoaded.value = true;
});

const handleDetectedEmotion = (emotion: Emotion) => {
  if (emotion.probability * 100 > threshold.value) {
    lastEmotionAboveThreshold.value = emotion;
  }
  currentEmotion.value = emotion;
};

const handleDetectedFace = (face: Mat) => {
  try {
    const preprocessed = preprocess(face);
    imshow(emotionCanvasId, preprocessed);
    preprocessed.delete();
    faceStore.isNew = !faceStore.isNew; // update store in order to be able to predict emotion when new face
  } catch (e) {
    console.log("Error: ", e);
  }
};
</script>

<template>
  <div class="w-screen h-screen flex flex-col items-center">
    <Header />
    <main
      class="md:w-[500px] w-full flex flex-col justify-center items-center p-4 gap-4 text-white"
      v-if="cascadeClassifierLoaded && customModelLoaded"
    >
      <div class="relative w-full">
        <FaceStream @new-face="handleDetectedFace" />
        <Emoji
          v-if="lastEmotionAboveThreshold"
          :predicted-class="lastEmotionAboveThreshold.class"
          class="absolute bottom-3 right-3 text-4xl"
        />
      </div>

      <div class="flex flex-row w-full">
        <DetectionInformation
          :last-emotion-over-threshold="lastEmotionAboveThreshold"
          :current-emotion="currentEmotion"
        />
      </div>

      <ThresholdSlider v-model="threshold" class="w-full" />
      <EmotionDetection
        :emotion-canvas-id="emotionCanvasId"
        @new-emotion="handleDetectedEmotion"
      />
    </main>
    <Loading v-else class="mt-48 p-8" />
  </div>
</template>
