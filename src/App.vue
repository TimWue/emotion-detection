<script setup lang="ts">
import { onMounted, ref } from "vue";
import { initCascadeClassifier } from "@/services/FaceDetection";
import { imshow, Mat } from "@techstark/opencv-js";
import FaceStream from "@/face-detection/FaceStream.vue";
import { initializeModel } from "@/services/ClassifierService";
import EmotionDetection from "@/emotion-detection/EmotionDetection.vue";
import { preprocess } from "@/services/PreprocessService";
import { useFaceStore } from "@/global/FaceStore";
import type { Emotion } from "@/emotion-detection/Emotion";
import Emoji from "@/emotion-detection/Emoji.vue";
import AboveThresholdDetectionInformation from "@/emotion-detection/AboveThresholdDetectionInformation.vue";
import CurrentDetectionInformation from "@/emotion-detection/CurrentDetectionInformation.vue";
import Header from "@/header/Header.vue";

const threshold = 0.5;
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
  if (emotion.probability > threshold) {
    lastEmotionAboveThreshold.value = emotion;
  }
  currentEmotion.value = emotion;
};

const handleDetectedFace = (face: Mat) => {
  try {
    imshow(emotionCanvasId, preprocess(face));
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
      class="md:w-[500px] w-full flex flex-col justify-center items-center px-10 py-6 gap-6 text-white"
    >
      <div class="relative w-full">
        <FaceStream
          v-if="cascadeClassifierLoaded && customModelLoaded"
          @new-face="handleDetectedFace"
        />
        <div class="text-lg text-center w-full" v-else>
          Loading Face- and Emotion-Detection ...
        </div>

        <Emoji
          v-if="lastEmotionAboveThreshold"
          :predicted-class="lastEmotionAboveThreshold.class"
          class="absolute bottom-3 right-3 text-4xl"
        />
      </div>

      <div class="flex flex-row gap-6 w-full justify-center">
        <AboveThresholdDetectionInformation
          :emotion="lastEmotionAboveThreshold"
        />
        <CurrentDetectionInformation :emotion="currentEmotion" class="" />
      </div>

      <EmotionDetection
        v-if="cascadeClassifierLoaded && customModelLoaded"
        :emotion-canvas-id="emotionCanvasId"
        @new-emotion="handleDetectedEmotion"
      />
    </main>
  </div>
</template>
