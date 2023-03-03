# Emotion Detection

This application uses the camera stream in order to detect faces and classify the shown emotion.
For this purpose a custom convolutional neural network was trained on the FER-2013 dataset (https://www.kaggle.com/datasets/msambare/fer2013)
and exported for the use in client-side code.
Face detection is done by using the Haar-cascade Detection of OpenCV (https://docs.opencv.org/3.4/db/d28/tutorial_cascade_classifier.html).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
