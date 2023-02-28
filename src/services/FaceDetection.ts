import type { CascadeClassifier } from "@techstark/opencv-js";
import cv, { Mat } from "@techstark/opencv-js";

const MAX_TRIES = 10;
const INTERVAL_TIMEOUT = 2000;
const HAARCASCADE_FILE = "haarcascade_frontalface_default.xml";
let faceCascade: CascadeClassifier;

const loadDataFile = async (cvFilePath: string, url: string) => {
  // see https://docs.opencv.org/master/utils.js
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const data = new Uint8Array(buffer);
  cv.FS_createDataFile("/", cvFilePath, data, true, false, false);
};
export const initCascadeClassifier = async (): Promise<void> => {
  return loadDataFile(HAARCASCADE_FILE, "/models/" + HAARCASCADE_FILE)
    .then(
      () =>
        new Promise<void>((resolve, reject) => {
          let interval: NodeJS.Timer;
          let tries = 0;
          interval = setInterval(() => {
            // load pre-trained classifiers
            try {
              tries++;
              faceCascade = new cv.CascadeClassifier();
              faceCascade.load(HAARCASCADE_FILE);
              clearInterval(interval);
              resolve();
            } catch (e) {
              if (tries > MAX_TRIES) {
                clearInterval(interval);
                reject();
              }
              console.warn("Haar-cascade not yet loaded. Try " + tries);
            }
          }, INTERVAL_TIMEOUT);
        })
    )
    .then(() => {
      console.log("Haar-cascade loaded");
    })
    .catch((error) => {
      console.error(error);
    });
};

export type FaceDetection = {
  roi?: Mat;
  original: Mat;
};
export const detectFace = (img: Mat): FaceDetection => {
  if (!faceCascade) throw new Error("No classifier initialized");
  let face = undefined;
  const newImg = img;

  const minSize = new cv.Size(50, 50);
  const maxSize = new cv.Size(0, 0);
  const gray = new cv.Mat();
  cv.cvtColor(newImg, gray, cv.COLOR_RGBA2GRAY, 0);
  const faces = new cv.RectVector();
  faceCascade.detectMultiScale(gray, faces, 1.1, 10, 0, minSize, maxSize);

  if (faces.size() > 0) {
    // We want a square image
    let rect = undefined;
    const width = faces.get(0).width;
    const height = faces.get(0).height;
    const diff = Math.abs(width - height);
    try {
      if (width > height) {
        rect = new cv.Rect(
          faces.get(0).x,
          faces.get(0).y - Math.round(diff / 2),
          width,
          width
        );
      } else {
        rect = new cv.Rect(
          faces.get(0).x - Math.round(diff / 2),
          faces.get(0).y,
          height,
          height
        );
      }

      const point1 = new cv.Point(rect.x, rect.y);
      const point2 = new cv.Point(rect.x + rect.width, rect.y + rect.height);
      face = newImg.roi(rect);
      cv.rectangle(newImg, point1, point2, [255, 0, 0, 255]);
    } catch (e) {
      console.log("Face detection failed: " + e);
    }
  }

  gray.delete();
  faces.delete();

  return { roi: face, original: newImg };
};
