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

export function predict(src: Mat) {
  const img = tensor(src.data, [-1, src.rows, src.cols]).expandDims(); //.expandDims(); ?
  // const resizedImgElement = document.querySelector("#canvasOutput");
  //const img = browser.fromPixels(resizedImgElement).expandDims();
  const predictionTensor = classifier.predict(img) as Tensor<Rank>;
  return tensor2Array(predictionTensor);
}

function tensor2Array(tensor: Tensor<Rank>) {
  const values = tensor.dataSync();
  return Array.from(values);
}
