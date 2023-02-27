import {
  browser,
  GraphModel,
  loadGraphModel,
  Rank,
  tensor,
  Tensor,
} from "@tensorflow/tfjs";
import type { Mat } from "@techstark/opencv-js";

let classifier: GraphModel;
export async function initializeModel() {
  classifier = await loadGraphModel("/src/assets/model.json");
  console.log("Custom model loaded");
}

export function predict(canvas: HTMLCanvasElement) {
  const img = browser.fromPixels(canvas).expandDims();
  const predictionTensor = classifier.predict(img.cast("float32"));
  return tensor2Array(predictionTensor as Tensor<Rank>);
}

function tensor2Array(tensor: Tensor<Rank>) {
  const values = tensor.dataSync();
  return Array.from(values);
}
