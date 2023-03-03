import cv, { Mat } from "@techstark/opencv-js";

export function preprocess(image: Mat) {
  const gray = makeGray(image);
  image.delete();
  return resizeImg(gray);
}
function makeGray(image: Mat) {
  const gray = new cv.Mat();
  cv.cvtColor(image, gray, cv.COLOR_RGBA2GRAY, 0);
  return gray;
}
function resizeImg(image: Mat) {
  const imageSize = 48;
  let dst = new cv.Mat();
  let dsize = new cv.Size(imageSize, imageSize);
  cv.resize(image, dst, dsize, 0, 0, cv.INTER_AREA);
  image.delete();
  return dst;
}
