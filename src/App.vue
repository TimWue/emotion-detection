<script setup lang="ts">
import { onMounted, ref } from "vue";
import { initCascadeClassifier } from "@/services/FaceDetection";
import { imshow, Mat } from "@techstark/opencv-js";
import FaceStream from "@/face-detection/FaceStream.vue";
import { initializeModel } from "@/services/ClassifierService";
import EmotionDetection from "@/emotion-detection/EmotionDetection.vue";
import { preprocess } from "@/services/PreprocessService";
import { useFaceStore } from "@/global/FaceStore";

const faceStore = useFaceStore();
const cascadeClassifierLoaded = ref(false);
const customModelLoaded = ref(false);
const emotionCanvasId = "emotionCanvasId";

onMounted(async () => {
  await initCascadeClassifier();
  cascadeClassifierLoaded.value = true;
  await initializeModel();
  customModelLoaded.value = true;
});

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
    <header>
      <h1>Facial Expression Recognition</h1>
    </header>
    <main class="md:w-[500px] w-full flex flex-col justify-center items-center">
      <FaceStream
        v-if="cascadeClassifierLoaded && customModelLoaded"
        @new-face="handleDetectedFace"
      />
      <EmotionDetection
        v-if="cascadeClassifierLoaded && customModelLoaded"
        :emotion-canvas-id="emotionCanvasId"
      />
      <div v-else>Loading</div>
    </main>
  </div>
</template>
