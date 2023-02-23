<script setup lang="ts">
import { imshow, Mat } from "@techstark/opencv-js";
import { onMounted, ref, toRefs, watch } from "vue";
import { detectFace } from "@/services/FaceDetection";
import VideoStream from "@/video-stream/VideoStream.vue";
import { preprocess } from "@/services/PreprocessService";
import { predict } from "@/services/ClassifierService";
import { useFaceStore } from "@/global/FaceStore";
import { faceCanvasId } from "@/global/CanvasIds";

const faceStore = useFaceStore();

const faceCanvas = ref<HTMLCanvasElement>();

const streamCallback = (cvFrame: Mat) => {
  if (faceCanvas.value) {
    const face = detectFace(cvFrame);
    imshow(faceCanvas.value, face.original);
    try {
      imshow(faceCanvasId, preprocess(face.roi));
      faceStore.isNew = !faceStore.isNew; // update store in order to be able to predict emotion when new face
    } catch (e) {
      console.log("error");
    }
    // faceStore.face = face.roi;
    // face.roi.delete();
    // face.original.delete();
    // try {
    //   const image = preprocess(face.roi);
    //   predict(image);
    // } catch (e) {
    //   console.log(e);
    // }
  }
};
</script>
<template>
  <VideoStream @new-frame="streamCallback" />
  <canvas ref="faceCanvas"></canvas>
</template>
